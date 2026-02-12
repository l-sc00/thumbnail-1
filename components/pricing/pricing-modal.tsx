"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { BorderBeam } from "@/components/ui/border-beam";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingCard = ({
  name,
  price,
  credits,
  onSelect,
}: {
  name: string;
  price: number;
  credits: number;
  onSelect: () => void;
}) => {
  return (
    <div className="relative group h-full">
      <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col">
        <BorderBeam size={150} duration={10} color="#06b6d4" />

        <div className="text-center space-y-4 md:space-y-6 flex-1 flex flex-col justify-between">
          <h3 className="text-xl md:text-2xl font-bold text-white">{name}</h3>

          <div className="space-y-2">
            <p className="text-4xl md:text-5xl font-bold text-white">${price}</p>
            <p className="text-sm text-gray-400">per month</p>
          </div>

          <div className="py-3 md:py-4 px-4 md:px-6 rounded-xl bg-white/5">
            <p className="text-2xl md:text-3xl font-bold text-white">{credits}</p>
            <p className="text-xs md:text-sm text-gray-400">Credits</p>
          </div>

          <button
            onClick={onSelect}
            className="w-full py-2.5 md:py-3 px-4 md:px-6 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition-colors duration-200"
          >
            Select {name}
          </button>
        </div>
      </div>
    </div>
  );
};

export const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleProSelect = async () => {
    try {
      const response = await fetch("/api/checkout/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planType: "pro" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const data = await response.json();

      // Redirect to Polar checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error instanceof Error ? error.message : "Failed to start checkout. Please try again.");
    }
  };

  const handleUltraSelect = async () => {
    try {
      const response = await fetch("/api/checkout/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planType: "ultra" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const data = await response.json();

      // Redirect to Polar checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error instanceof Error ? error.message : "Failed to start checkout. Please try again.");
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-5xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-3xl bg-gradient-to-b from-gray-900 to-black border border-white/10 p-6 md:p-10">
          <BorderBeam size={200} duration={12} color="#06b6d4" borderWidth={2} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Choose Your Plan</h2>
              <p className="text-sm md:text-base text-gray-400">Select the perfect plan for your thumbnail needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <PricingCard
                name="Pro"
                price={20}
                credits={100}
                onSelect={handleProSelect}
              />
              <PricingCard
                name="Ultra"
                price={45}
                credits={300}
                onSelect={handleUltraSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
