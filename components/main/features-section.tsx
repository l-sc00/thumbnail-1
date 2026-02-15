"use client";

import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";

interface FeatureProps {
  title: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  reverse?: boolean;
  index: number;
}

const Feature = ({
  title,
  description,
  imagePath,
  imageAlt,
  reverse = false,
  index,
}: FeatureProps) => {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Text Content */}
      <div
        className={`space-y-6 ${reverse ? "lg:order-2" : "lg:order-1"}`}
        data-aos="fade-up"
        data-aos-delay={index * 100}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          <span className="text-cyan-400 font-semibold text-sm">
            Feature {index + 1}
          </span>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {title}
        </h3>

        <p className="text-gray-400 text-lg leading-relaxed">{description}</p>

        <div className="flex items-center gap-3 text-cyan-400">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6"
          >
            <path
              d="M5 12L10 17L20 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-medium">AI 기반 자동화</span>
        </div>
      </div>

      {/* Image */}
      <div
        className={`relative ${reverse ? "lg:order-1" : "lg:order-2"}`}
        data-aos="fade-up"
        data-aos-delay={index * 100 + 50}
      >
        <div className="relative group">
          <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-2">
            <BorderBeam size={200} duration={12} color="#06b6d4" />

            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src={imagePath}
                alt={imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </div>
      </div>
    </div>
  );
};

export const FeaturesSection = () => {
  const features = [
    {
      title: "AI 기반 썸네일 생성",
      description:
        "Google Gemini AI를 활용하여 단 몇 초 만에 전문적인 YouTube 썸네일을 생성합니다. 간단한 텍스트 프롬프트만으로 클릭을 유도하는 매력적인 썸네일을 만들어보세요.",
      imagePath: "/main/1.jpg",
      imageAlt: "AI 기반 썸네일 생성",
    },
    {
      title: "스마트 프롬프트 최적화",
      description:
        "당신의 아이디어를 최고의 결과물로 변환합니다. 고급 프롬프트 엔지니어링 시스템이 입력값을 자동으로 최적화하여 YouTube CTR을 극대화하는 썸네일을 생성합니다.",
      imagePath: "/main/2.jpg",
      imageAlt: "프롬프트 최적화 시스템",
    },
    {
      title: "고해상도 이미지 생성",
      description:
        "모든 썸네일은 1280x720 픽셀의 고해상도로 생성됩니다. YouTube 권장 사양에 완벽히 맞춰진 선명하고 전문적인 이미지를 받아보세요.",
      imagePath: "/main/3.jpg",
      imageAlt: "고해상도 이미지",
    },
    {
      title: "이미지 업로드 & 커스터마이징",
      description:
        "자신의 얼굴이나 특정 이미지를 업로드하여 썸네일에 포함시킬 수 있습니다. AI가 업로드된 이미지를 자연스럽게 통합하여 개성 있는 썸네일을 만들어드립니다.",
      imagePath: "/main/4.jpg",
      imageAlt: "이미지 업로드 기능",
    },
    {
      title: "크레딧 시스템 & 자동 환불",
      description:
        "간편한 크레딧 기반 시스템으로 필요한 만큼만 사용하세요. 기술적 오류로 생성이 실패하면 크레딧이 자동으로 환불됩니다. 투명하고 공정한 요금제를 경험하세요.",
      imagePath: "/main/5.jpg",
      imageAlt: "크레딧 시스템",
    },
  ];

  return (
    <section id="features" className="relative py-24 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />

      {/* Animated background beams */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <span className="text-cyan-400 font-semibold text-sm">
              주요 기능
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            AI로 완성하는
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              완벽한 썸네일
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            thumbAI는 최첨단 AI 기술로 YouTube 크리에이터의 성공을 돕습니다
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              imagePath={feature.imagePath}
              imageAlt={feature.imageAlt}
              reverse={index % 2 !== 0}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center">
          <div className="relative inline-block">
            <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12">
              <BorderBeam size={250} duration={15} color="#06b6d4" />

              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  지금 바로 시작하세요
                </h3>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  몇 초 만에 전문적인 썸네일을 생성하고 YouTube 조회수를
                  높여보세요
                </p>
                <a
                  href="/auth"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  무료로 시작하기
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl opacity-50 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
