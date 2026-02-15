import Link from "next/link";
import { Navbar } from "@/components/main/navbar";

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#050505] via-[#111111] to-[#050505]">
      <Navbar />

      <main className="container mx-auto px-6 py-24 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            개인정보 보호정책
          </h1>
          <p className="text-gray-400 text-lg">
            최종 업데이트: 2026년 2월 15일
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-cyan max-w-none">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">소개</h2>
              <p className="text-gray-300 leading-relaxed">
                thumbAI에 오신 것을 환영합니다. 당사는 귀하의 개인정보를 존중하며 개인 데이터 보호에 최선을 다하고 있습니다.
                본 개인정보 보호정책은 AI 기반 YouTube 썸네일 생성 서비스를 사용할 때 당사가 귀하의 정보를 수집, 사용 및
                보호하는 방법을 설명합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">수집하는 정보</h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">계정 정보</h3>
                  <p className="leading-relaxed">
                    Google OAuth로 로그인하면 이메일 주소, 전체 이름 및 프로필 사진 URL을 수집합니다.
                    이 정보는 thumbAI 계정을 생성하고 관리하는 데 사용됩니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">사용 데이터</h3>
                  <p className="leading-relaxed">
                    제출하신 프롬프트, 업로드하신 이미지 및 생성하신 썸네일을 포함한 썸네일 생성 활동에 대한 정보를
                    수집합니다. 이 데이터는 AI 모델 및 서비스 품질을 개선하는 데 도움이 됩니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">결제 정보</h3>
                  <p className="leading-relaxed">
                    결제 처리는 Polar를 통해 안전하게 처리됩니다. 당사는 거래 기록(플랜 유형, 크레딧, 결제 상태)을
                    저장하지만 신용카드 정보는 직접 저장하지 않습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">정보 사용 방법</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>thumbAI 서비스 제공 및 유지</li>
                <li>Google Gemini AI를 사용하여 썸네일 생성 요청 처리</li>
                <li>구독 및 크레딧 관리</li>
                <li>서비스 관련 알림 전송</li>
                <li>AI 모델 및 서비스 기능 개선</li>
                <li>플랫폼 보안 확보 및 남용 방지</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">데이터 저장 및 보안</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                귀하의 데이터는 Supabase(암호화된 PostgreSQL 데이터베이스)를 사용하여 안전하게 저장됩니다.
                생성된 썸네일 이미지는 YouTube에서 사용할 수 있도록 공개 읽기 액세스 권한이 있는 Supabase Storage에
                저장됩니다.
              </p>
              <p className="text-gray-300 leading-relaxed">
                당사는 행 수준 보안(RLS) 정책, 웹훅 서명 확인 및 Supabase Auth를 통한 안전한 인증을 포함한
                업계 표준 보안 조치를 구현합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">제3자 서비스</h2>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">당사는 다음 제3자 서비스를 사용합니다:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong className="text-white">Google Gemini AI:</strong> AI 기반 이미지 생성</li>
                  <li><strong className="text-white">Supabase:</strong> 인증, 데이터베이스 및 파일 저장소</li>
                  <li><strong className="text-white">Polar:</strong> 결제 처리 및 구독 관리</li>
                  <li><strong className="text-white">Google OAuth:</strong> 안전한 로그인</li>
                </ul>
                <p className="leading-relaxed">
                  각 서비스에는 귀하의 데이터 사용을 규정하는 자체 개인정보 보호정책이 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">귀하의 권리</h2>
              <p className="text-gray-300 leading-relaxed mb-3">귀하는 다음 권리가 있습니다:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>개인 데이터 액세스</li>
                <li>생성된 썸네일 삭제</li>
                <li>언제든지 구독 취소</li>
                <li>계정 및 관련 데이터 삭제 요청</li>
                <li>데이터 내보내기 (도움이 필요하면 문의하세요)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">쿠키 및 추적</h2>
              <p className="text-gray-300 leading-relaxed">
                당사는 인증 및 세션 관리를 위해 필수 쿠키를 사용합니다. 제3자 광고 또는 추적 쿠키는 사용하지 않습니다.
                Supabase Auth는 세션 쿠키를 관리하여 로그인 상태를 유지합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">데이터 보존</h2>
              <p className="text-gray-300 leading-relaxed">
                당사는 귀하의 계정이 활성화되어 있는 한 계정 데이터와 생성된 썸네일을 보관합니다.
                언제든지 개별 썸네일을 삭제할 수 있습니다. 결제 기록은 회계 및 법적 준수 목적으로 보관됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">어린이 개인정보 보호</h2>
              <p className="text-gray-300 leading-relaxed">
                thumbAI는 만 13세 미만의 사용자를 대상으로 하지 않습니다. 당사는 고의로 만 13세 미만 어린이의
                개인정보를 수집하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">정책 변경</h2>
              <p className="text-gray-300 leading-relaxed">
                당사는 때때로 본 개인정보 보호정책을 업데이트할 수 있습니다. 중요한 변경 사항은 이 페이지 상단의
                "최종 업데이트" 날짜를 업데이트하여 알려드립니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">문의하기</h2>
              <p className="text-gray-300 leading-relaxed">
                본 개인정보 보호정책 또는 당사의 데이터 처리 방법에 대해 질문이 있으시면 다음으로 문의해 주세요:
              </p>
              <p className="text-cyan-400 font-medium mt-2">
                qwer002497@gmail.com
              </p>
            </section>

          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
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
