import { NextResponse } from "next/server";
import { Polar } from "@polar-sh/sdk";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const polar = new Polar({
      ...(process.env.POLAR_SANDBOX === "true" && { server: "sandbox" }),
      accessToken: process.env.POLAR_ACCESS_TOKEN ?? "",
    });

    // Find customer by external ID (Supabase user ID)
    const customer = await polar.customers.getExternal({
      externalId: user.id,
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    // Create customer session for portal access
    const session = await polar.customerSessions.create({
      customerId: customer.id,
    });

    return NextResponse.json({
      portalUrl: session.customerPortalUrl,
    });
  } catch (error) {
    console.error("Customer portal error:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
