"use client";

import Link from "next/link";
import { BorderBeam } from "@/components/ui/border-beam";

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface PricingCardProps {
  name: string;
  price: number;
  credits: number;
  features: string[];
  popular?: boolean;
}

const PricingCard = ({
  name,
  price,
  credits,
  features,
  popular = false,
}: PricingCardProps) => {
  return (
    <div className="relative group h-full">
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
            인기 플랜
          </div>
        </div>
      )}

      <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:bg-white/[0.07] transition-all duration-300 h-full flex flex-col">
        <BorderBeam size={150} duration={10} color="#06b6d4" />

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="text-center space-y-4 pb-6 border-b border-white/10">
            <h3 className="text-2xl font-bold text-white">{name}</h3>

            <div className="space-y-1">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-white">${price}</span>
                <span className="text-gray-400">/월</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <span className="text-2xl font-bold text-cyan-400">{credits}</span>
              <span className="text-sm text-cyan-300">크레딧</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex-1 py-6">
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mt-0.5">
                    <CheckIcon />
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <Link
            href="/auth"
            className="w-full py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition-all duration-200 text-center block hover:scale-[1.02] active:scale-[0.98]"
          >
            시작하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export const PricingSection = () => {
  const proFeatures = [
    "월 100개의 AI 썸네일 생성",
    "1280x720 고해상도 이미지",
    "프롬프트 최적화 시스템",
    "이미지 업로드 기능",
    "무제한 다운로드",
    "크레딧 자동 환불 보장",
  ];

  const ultraFeatures = [
    "월 300개의 AI 썸네일 생성",
    "1280x720 고해상도 이미지",
    "프롬프트 최적화 시스템",
    "이미지 업로드 기능",
    "무제한 다운로드",
    "크레딧 자동 환불 보장",
    "우선 고객 지원",
    "가장 높은 가성비",
  ];

  return (
    <section id="pricing" className="relative py-24 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            요금제 선택
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            당신에게 맞는 완벽한 플랜을 선택하세요
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <PricingCard
            name="Pro"
            price={20}
            credits={100}
            features={proFeatures}
          />
          <PricingCard
            name="Ultra"
            price={45}
            credits={300}
            features={ultraFeatures}
            popular
          />
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            모든 플랜은 언제든지 취소 가능합니다 • 크레딧 만료 없음 •{" "}
            <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 underline">
              이용약관
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
