# thumbAI

AI 기반 YouTube 썸네일 생성 SaaS 서비스. 텍스트 프롬프트와 참고 이미지를 입력하면 Google Gemini AI가 고해상도(1280×720) 썸네일을 자동으로 생성합니다.

---

## 주요 기능

- **AI 썸네일 생성** — 텍스트 프롬프트 또는 참고 이미지를 기반으로 YouTube 썸네일 즉시 생성
- **구독 플랜** — Pro(월 $20, 100 크레딧) / Ultra(월 $45, 300 크레딧)
- **생성 기록 관리** — 생성된 썸네일 저장·다운로드·삭제
- **Google OAuth 로그인** — Supabase Auth 기반 소셜 로그인
- **실시간 사이드바** — 썸네일 생성 즉시 히스토리 반영
- **결제 시스템** — Polar SDK를 통한 구독 결제 및 고객 포털 연동

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| Frontend | Next.js 16.1.6, React 19.2.3, TypeScript |
| 스타일링 | Tailwind CSS v4, Framer Motion |
| 백엔드/DB | Supabase (PostgreSQL, Auth, Storage) |
| AI | Google Gemini API (`@google/genai`) |
| 결제 | Polar SDK |
| 배포 | Vercel |

---

## 시스템 아키텍처

```
사용자
  │
  ▼
Next.js (App Router)
  ├── /app/page.tsx          → 랜딩 페이지
  ├── /app/auth/page.tsx     → Google OAuth 로그인
  ├── /app/dashboard/        → 썸네일 생성 대시보드
  └── /app/api/
        ├── generate-thumbnail  → Gemini AI 호출, 크레딧 차감, DB 저장
        ├── checkout/create     → Polar 결제 세션 생성
        ├── customer-portal     → 구독 관리 포털
        ├── webhook/polar       → 결제 완료 webhook (플랜·크레딧 업데이트)
        └── thumbnails/[id]     → 썸네일 삭제
  │
  ├── Supabase
  │     ├── Auth (Google OAuth)
  │     ├── users 테이블 (plan, credits)
  │     └── thumbnails 테이블 (prompt, image_url, status)
  │
  ├── Google Gemini API
  │     └── 이미지 생성 (1280×720)
  │
  └── Polar
        ├── 구독 결제 처리
        └── Webhook → credits/plan 업데이트
```

---

## DB 스키마

### `users`
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid | Supabase Auth user ID |
| plan | text | `free` / `pro` / `ultra` |
| credits | integer | 남은 생성 크레딧 |

### `thumbnails`
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → users.id |
| prompt | text | 생성 프롬프트 |
| image_url | text | Supabase Storage URL |
| status | text | `completed` / `failed` |
| created_at | timestamptz | 생성 시각 |

---

## 로컬 실행 방법

### 1. 클론 및 의존성 설치

```bash
git clone https://github.com/your-username/thumbai.git
cd thumbai
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 아래 값을 입력합니다.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Polar 결제
POLAR_ACCESS_TOKEN=your_polar_access_token
POLAR_PRO_PRODUCT_ID=your_pro_product_id
POLAR_ULTRA_PRODUCT_ID=your_ultra_product_id
POLAR_WEBHOOK_SECRET=your_webhook_secret
POLAR_SANDBOX=true   # 개발 시 true, 운영 시 false
```

### 3. 개발 서버 실행

```bash
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

---

## 주요 구현 사항

### AI 썸네일 생성 파이프라인
1. 사용자가 프롬프트(+참고 이미지 선택) 입력
2. `/api/generate-thumbnail` 에서 크레딧 잔액 확인
3. Google Gemini API 호출 → 이미지 생성
4. Supabase Storage 업로드 → `thumbnails` 테이블 저장
5. 크레딧 1 차감
6. 생성된 이미지 URL 반환 + 사이드바 실시간 반영

### 구독 결제 흐름
1. 사용자가 플랜 선택
2. Polar 결제 세션 생성 → 결제 페이지로 이동
3. 결제 완료 → Polar Webhook 수신
4. `users` 테이블의 `plan`, `credits` 업데이트
5. `/dashboard` 로 자동 리다이렉트

### 성능 최적화 (Canvas 배경 애니메이션)
- DPR(Device Pixel Ratio) 최대 2로 제한
- 빔 수: 레이어당 6개 (18개 총)
- 노이즈 텍스처: 매 3프레임마다 갱신
- Canvas context `{ alpha: false }` 적용

---

## 라이선스

MIT
