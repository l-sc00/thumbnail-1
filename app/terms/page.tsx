import Link from "next/link";
import { Navbar } from "@/components/main/navbar";

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#050505] via-[#111111] to-[#050505]">
      <Navbar />

      <main className="container mx-auto px-6 py-24 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            이용약관
          </h1>
          <p className="text-gray-400 text-lg">
            최종 업데이트: 2026년 2월 15일
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-cyan max-w-none">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">약관 동의</h2>
              <p className="text-gray-300 leading-relaxed">
                thumbAI("서비스")에 접속하고 사용함으로써 귀하는 본 이용약관에 동의하고 이에 구속되는 것에 동의합니다.
                본 약관에 동의하지 않으시면 서비스를 이용하지 마시기 바랍니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">서비스 설명</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                thumbAI는 다음을 사용하여 전문적인 YouTube 썸네일을 생성하는 AI 기반 플랫폼입니다:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>이미지 생성을 위한 Google Gemini AI</li>
                <li>YouTube CTR을 위한 고급 프롬프트 최적화</li>
                <li>크레딧 기반 소비 모델</li>
                <li>구독 플랜 (무료, 프로, 울트라)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">계정 등록</h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  thumbAI를 사용하려면 계정을 만들어야 합니다. Google OAuth를 사용하여 로그인할 수 있습니다.
                </p>
                <p className="leading-relaxed">귀하는 다음에 대한 책임이 있습니다:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>계정의 기밀성 유지</li>
                  <li>귀하의 계정에서 발생하는 모든 활동</li>
                  <li>무단 사용 시 즉시 당사에 알리기</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">구독 플랜 및 크레딧</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">크레딧 시스템</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong className="text-white">무료 플랜:</strong> 0 크레딧 (테스트 전용)</li>
                    <li><strong className="text-white">프로 플랜:</strong> 월 $20에 100 크레딧</li>
                    <li><strong className="text-white">울트라 플랜:</strong> 월 $45에 300 크레딧</li>
                    <li>1 크레딧 = 1 썸네일 생성</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">요금 청구 및 결제</h3>
                  <p className="leading-relaxed">
                    결제는 Polar를 통해 안전하게 처리됩니다. 구독은 취소하지 않는 한 자동으로 갱신됩니다.
                    크레딧은 만료되지 않으며 활성 구독을 유지하는 한 계정에 남아 있습니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">환불 정책</h3>
                  <p className="leading-relaxed">
                    기술적 오류로 인해 썸네일 생성이 실패하면 크레딧이 자동으로 귀하의 계정으로 환불됩니다.
                    구독료는 환불되지 않지만, 언제든지 취소하여 향후 청구를 방지할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">허용되는 사용</h2>
              <p className="text-gray-300 leading-relaxed mb-3">귀하는 다음을 하지 않을 것에 동의합니다:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>법률, 규정 또는 제3자 권리를 위반하는 콘텐츠 생성</li>
                <li>불법적이거나 유해하거나 공격적인 콘텐츠가 포함된 썸네일 만들기</li>
                <li>저작권, 상표 또는 지적 재산권을 침해하는 콘텐츠 생성</li>
                <li>오해의 소지가 있거나 기만적인 콘텐츠를 만들기 위해 서비스 사용</li>
                <li>서비스를 리버스 엔지니어링, 해킹 또는 악용하려는 시도</li>
                <li>다른 사람과 계정 자격 증명 공유</li>
                <li>서비스를 남용하기 위해 자동화된 봇이나 스크립트 사용</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">지적 재산권</h2>
              <div className="space-y-3 text-gray-300">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">생성된 콘텐츠</h3>
                  <p className="leading-relaxed">
                    thumbAI를 사용하여 생성한 썸네일의 소유권은 귀하에게 있습니다. YouTube 채널이나 기타 목적으로
                    상업적으로 자유롭게 사용할 수 있습니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">서비스 콘텐츠</h3>
                  <p className="leading-relaxed">
                    코드, 디자인 및 알고리즘을 포함한 thumbAI 플랫폼은 저작권 및 기타 지적 재산권법에 의해 보호됩니다.
                    당사의 허가 없이 서비스의 일부를 복사, 수정 또는 배포할 수 없습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">AI 생성 콘텐츠 면책 조항</h2>
              <p className="text-gray-300 leading-relaxed">
                썸네일은 Google Gemini AI를 사용하여 생성됩니다. 품질과 관련성을 위해 프롬프트를 최적화하지만,
                AI 생성 콘텐츠는 때때로 예측할 수 없습니다. 생성된 이미지의 정확한 출력에 대해서는 당사가 책임지지 않습니다.
                게시하기 전에 생성된 콘텐츠가 귀하의 요구 사항을 충족하는지 검토하고 확인하는 것은 귀하의 책임입니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">데이터 및 개인정보 보호</h2>
              <p className="text-gray-300 leading-relaxed">
                thumbAI 사용은{" "}
                <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline">
                  개인정보 보호정책
                </Link>
                의 적용도 받습니다. 당사는 해당 문서에 설명된 대로 귀하의 데이터를 수집하고 처리합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">서비스 가용성</h2>
              <p className="text-gray-300 leading-relaxed">
                당사는 안정적인 서비스를 제공하기 위해 노력하지만 100% 가동 시간을 보장하지는 않습니다.
                유지 관리, 업데이트 또는 기술적 문제로 인해 서비스를 일시적으로 사용할 수 없을 수 있습니다.
                서비스 중단으로 인한 손해에 대해서는 당사가 책임지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">서비스 종료</h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  당사는 귀하가 본 이용약관을 위반하거나 남용 행위에 가담하는 경우 귀하의 계정을 정지하거나
                  종료할 권리를 보유합니다.
                </p>
                <p className="leading-relaxed">
                  Polar 고객 포털을 통해 언제든지 구독을 취소할 수 있습니다. 취소 시 구독은 현재 청구 기간이
                  끝날 때까지 활성 상태로 유지됩니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">책임 제한</h2>
              <p className="text-gray-300 leading-relaxed">
                법률이 허용하는 최대 범위 내에서 thumbAI 및 그 운영자는 서비스 사용으로 인해 발생하는 간접적,
                부수적, 특별, 결과적 또는 징벌적 손해에 대해 책임지지 않습니다. 당사의 총 책임은 지난 12개월 동안
                서비스에 대해 귀하가 지불한 금액을 초과하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">보증 부인</h2>
              <p className="text-gray-300 leading-relaxed">
                서비스는 명시적이든 묵시적이든 어떠한 종류의 보증 없이 "있는 그대로" 및 "사용 가능한 그대로"
                제공됩니다. 당사는 서비스가 오류 없고 안전하며 중단되지 않을 것이라고 보장하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">약관 변경</h2>
              <p className="text-gray-300 leading-relaxed">
                당사는 때때로 본 이용약관을 업데이트할 수 있습니다. 중요한 변경 사항은 이메일 또는 플랫폼의
                공지를 통해 전달됩니다. 변경 후 서비스를 계속 사용하면 새 약관에 동의하는 것으로 간주됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">준거법</h2>
              <p className="text-gray-300 leading-relaxed">
                본 약관은 법률 충돌 원칙에 관계없이 대한민국 법률에 따라 규율되고 해석됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">문의 정보</h2>
              <p className="text-gray-300 leading-relaxed">
                본 이용약관에 대해 질문이 있으시면 다음으로 문의해 주세요:
              </p>
              <p className="text-cyan-400 font-medium mt-2">
                qwer002497@gmail.com
              </p>
            </section>

          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center space-x-6">
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            개인정보 보호정책
          </Link>
          <span className="text-gray-600">|</span>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
