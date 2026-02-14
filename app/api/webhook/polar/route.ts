import { NextRequest, NextResponse } from "next/server";
import {
  validateEvent,
  WebhookVerificationError,
} from "@polar-sh/sdk/webhooks";
import { createClient } from "@supabase/supabase-js";

// Use service role client to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PRO_PRODUCT_ID = process.env.POLAR_PRO_PRODUCT_ID!;
const ULTRA_PRODUCT_ID = process.env.POLAR_ULTRA_PRODUCT_ID!;

// Helper: determine plan from product ID
function getPlanFromProductId(productId: string): "pro" | "ultra" | null {
  if (productId === PRO_PRODUCT_ID) return "pro";
  if (productId === ULTRA_PRODUCT_ID) return "ultra";
  return null;
}

// Helper: credits for each plan
function getCreditsForPlan(plan: "pro" | "ultra"): number {
  return plan === "pro" ? 100 : 300;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headers = {
      "webhook-id": request.headers.get("webhook-id") ?? "",
      "webhook-timestamp": request.headers.get("webhook-timestamp") ?? "",
      "webhook-signature": request.headers.get("webhook-signature") ?? "",
    };

    // Check if event type is one we handle before validating
    const HANDLED_EVENTS = [
      "order.paid",
      "subscription.active",
      "subscription.canceled",
      "subscription.revoked",
      "subscription.uncanceled",
      "subscription.updated",
    ];

    const parsed = JSON.parse(body);
    if (!HANDLED_EVENTS.includes(parsed.type)) {
      console.log(`[Polar Webhook] Ignoring event: ${parsed.type}`);
      return NextResponse.json({ received: true });
    }

    // Verify webhook signature
    const event = validateEvent(
      body,
      headers,
      process.env.POLAR_WEBHOOK_SECRET!
    );

    console.log(`[Polar Webhook] Received event: ${event.type}`);

    switch (event.type) {
      // 1. 결제 완료 → payments 기록 + credits 충전
      case "order.paid": {
        const order = event.data;
        const externalId = order.customer?.externalId;
        if (!externalId) {
          console.error("[Polar Webhook] No external customer ID in order");
          break;
        }

        const productId = order.product?.id;
        if (!productId) {
          console.error("[Polar Webhook] No product ID in order");
          break;
        }
        const plan = getPlanFromProductId(productId);
        if (!plan) {
          console.error("[Polar Webhook] Unknown product ID:", productId);
          break;
        }

        const credits = getCreditsForPlan(plan);

        // Insert payment record
        await supabase.from("payments").insert({
          user_id: externalId,
          plan,
          amount: order.netAmount ?? 0,
          credits,
          polar_checkout_id: order.checkoutId ?? null,
          status: "completed",
        });

        // Add credits to user
        const { data: user } = await supabase
          .from("users")
          .select("credits")
          .eq("id", externalId)
          .single();

        await supabase
          .from("users")
          .update({ credits: (user?.credits ?? 0) + credits })
          .eq("id", externalId);

        console.log(
          `[Polar Webhook] order.paid: user=${externalId}, plan=${plan}, credits +${credits}`
        );
        break;
      }

      // 2. 구독 활성화 → plan 업데이트
      case "subscription.active": {
        const sub = event.data;
        const externalId = sub.customer?.externalId;
        if (!externalId) break;

        const productId = sub.product.id;
        const plan = getPlanFromProductId(productId);
        if (!plan) break;

        await supabase
          .from("users")
          .update({ plan, subscription_status: "active" })
          .eq("id", externalId);

        console.log(
          `[Polar Webhook] subscription.active: user=${externalId}, plan=${plan}`
        );
        break;
      }

      // 2. 구독 취소 → plan을 free로
      case "subscription.canceled": {
        const sub = event.data;
        const externalId = sub.customer?.externalId;
        if (!externalId) break;

        await supabase
          .from("users")
          .update({ subscription_status: "canceled" })
          .eq("id", externalId);

        console.log(
          `[Polar Webhook] subscription.canceled: user=${externalId}`
        );
        break;
      }

      // 2. 구독 완전 해지 → plan을 free로
      case "subscription.revoked": {
        const sub = event.data;
        const externalId = sub.customer?.externalId;
        if (!externalId) break;

        await supabase
          .from("users")
          .update({ plan: "free", subscription_status: "inactive" })
          .eq("id", externalId);

        console.log(
          `[Polar Webhook] subscription.revoked: user=${externalId}, plan=free`
        );
        break;
      }

      // 2. 구독 재개
      case "subscription.uncanceled": {
        const sub = event.data;
        const externalId = sub.customer?.externalId;
        if (!externalId) break;

        const productId = sub.product.id;
        const plan = getPlanFromProductId(productId);
        if (!plan) break;

        await supabase
          .from("users")
          .update({ plan, subscription_status: "active" })
          .eq("id", externalId);

        console.log(
          `[Polar Webhook] subscription.uncanceled: user=${externalId}, plan=${plan}`
        );
        break;
      }

      // 3. 구독 변경 (업그레이드/다운그레이드)
      case "subscription.updated": {
        const sub = event.data;
        const externalId = sub.customer?.externalId;
        if (!externalId) break;

        const productId = sub.product.id;
        const newPlan = getPlanFromProductId(productId);
        if (!newPlan) break;

        // Get current user plan
        const { data: currentUser } = await supabase
          .from("users")
          .select("plan, credits")
          .eq("id", externalId)
          .single();

        const oldPlan = currentUser?.plan as string;

        console.log(
          `[Polar Webhook] subscription.updated: user=${externalId}, oldPlan=${oldPlan}, newPlan=${newPlan}`
        );

        // Plan didn't change (e.g. renewal or other update)
        if (oldPlan === newPlan) {
          console.log(`[Polar Webhook] subscription.updated: same plan, skipping`);
          break;
        }

        // Determine if upgrade (cheaper → more expensive)
        const planRank = { free: 0, pro: 1, ultra: 2 };
        const isUpgrade = (planRank[newPlan] ?? 0) > (planRank[oldPlan as keyof typeof planRank] ?? 0);

        if (isUpgrade && oldPlan === "pro" && newPlan === "ultra") {
          // Upgrade: pro → ultra → +200 credits
          await supabase
            .from("users")
            .update({
              plan: newPlan,
              credits: (currentUser?.credits ?? 0) + 200,
            })
            .eq("id", externalId);

          // Record upgrade payment
          await supabase.from("payments").insert({
            user_id: externalId,
            plan: newPlan,
            amount: 2500, // $25 difference (ultra $45 - pro $20)
            credits: 200,
            polar_checkout_id: sub.id,
            status: "completed",
          });

          console.log(
            `[Polar Webhook] UPGRADE: pro→ultra, credits +200, payment recorded`
          );
        } else {
          // Downgrade or other plan change: just update plan, keep credits
          await supabase
            .from("users")
            .update({ plan: newPlan })
            .eq("id", externalId);

          // Record plan change payment
          await supabase.from("payments").insert({
            user_id: externalId,
            plan: newPlan,
            amount: 0,
            credits: 0,
            polar_checkout_id: sub.id,
            status: "completed",
          });

          console.log(
            `[Polar Webhook] Plan changed: ${oldPlan}→${newPlan}, credits unchanged, payment recorded`
          );
        }
        break;
      }

      default:
        console.log(`[Polar Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      console.error("[Polar Webhook] Signature verification failed");
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 403 }
      );
    }

    console.error("[Polar Webhook] Error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
