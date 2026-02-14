"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { PricingModal } from "@/components/pricing/pricing-modal";

export const DashboardNavbar = () => {
  const { user, signOut } = useAuth();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [userPlan, setUserPlan] = useState<string>("free");
  const popoverRef = useRef<HTMLDivElement>(null);

  // Fetch user plan from Supabase
  useEffect(() => {
    const fetchPlan = async () => {
      if (!user) return;
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data } = await supabase
        .from("users")
        .select("plan")
        .eq("id", user.id)
        .single();
      if (data?.plan) setUserPlan(data.plan);
    };
    fetchPlan();
  }, [user]);

  const handleManageSubscription = async () => {
    try {
      const res = await fetch("/api/customer-portal", { method: "POST" });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      window.location.href = data.portalUrl;
    } catch (error) {
      console.error("Portal error:", error);
    }
  };

  // Close popover on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 lg:pl-[336px]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo - Floating Button */}
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-lg"
        >
          <Image
            src="/thumb.png"
            alt="thumbAI Logo"
            width={28}
            height={28}
            className="w-7 h-7"
          />
          <span className="text-lg font-bold text-white">thumbAI</span>
        </Link>

        {/* Profile Popover - Floating Button */}
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => setPopoverOpen(!popoverOpen)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all shadow-lg"
          >
            {user?.user_metadata?.avatar_url ? (
              <Image
                src={user.user_metadata.avatar_url}
                alt="Profile"
                width={28}
                height={28}
                className="w-7 h-7 rounded-full"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <span className="text-cyan-400 text-sm font-semibold">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </button>

          {/* Popover Dropdown */}
          {popoverOpen && (
            <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
              {/* User Info */}
              <div className="p-4 border-b border-white/10 flex items-center gap-3">
                {user?.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <span className="text-cyan-400 text-lg font-semibold">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.user_metadata?.full_name || "User"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Upgrade / Manage Subscription */}
              <div className="px-4 py-2 space-y-2">
                {userPlan === "free" ? (
                  <button
                    onClick={() => {
                      setPricingModalOpen(true);
                      setPopoverOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-gray-900 text-sm font-normal transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-4 h-4"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                    Upgrade
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleManageSubscription();
                      setPopoverOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-normal transition-colors border border-white/10"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-4 h-4"
                    >
                      <path
                        d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Manage Subscription
                  </button>
                )}
              </div>

              {/* Sign Out */}
              <button
                onClick={() => {
                  signOut();
                  setPopoverOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-red-400 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-4 h-4"
                >
                  <path
                    d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6M10.6667 11.3333L14 8M14 8L10.6667 4.66667M14 8H6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
      />
    </nav>
  );
};
