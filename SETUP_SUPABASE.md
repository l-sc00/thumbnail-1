# Supabase 설정 가이드

thumbAI 프로젝트의 Supabase 연동을 위한 설정 가이드입니다.

## 1. 환경 변수 설정

`.env.local` 파일에 Supabase 프로젝트의 URL과 anon key를 입력하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Supabase 대시보드에서 확인하는 방법:
1. [Supabase Dashboard](https://supabase.com/dashboard)에 로그인
2. `youtube-thumbnail` 프로젝트 선택
3. Settings > API 메뉴로 이동
4. Project URL과 anon/public key 복사

## 2. Google OAuth 설정

### Supabase에서 Google Provider 활성화:
1. Supabase Dashboard > Authentication > Providers
2. Google Provider 활성화
3. Google Cloud Console에서 OAuth 2.0 클라이언트 생성:
   - [Google Cloud Console](https://console.cloud.google.com/)
   - APIs & Services > Credentials
   - Create Credentials > OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs 추가:
     ```
     https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback
     ```
4. Client ID와 Client Secret을 Supabase에 입력

## 3. 데이터베이스 설정

Supabase SQL Editor에서 다음 마이그레이션 스크립트를 실행하세요:

### 방법 1: Supabase Dashboard에서 직접 실행
1. Supabase Dashboard > SQL Editor
2. `supabase/migrations/001_create_users_table.sql` 파일의 내용을 복사
3. SQL Editor에 붙여넣기
4. Run 버튼 클릭

### 방법 2: Supabase CLI 사용 (선택사항)
```bash
# Supabase CLI 설치
npm install -g supabase

# 프로젝트 연동
supabase link --project-ref [YOUR_PROJECT_REF]

# 마이그레이션 실행
supabase db push
```

## 4. 테이블 구조

### users 테이블
- `id`: UUID (Primary Key, auth.users 참조)
- `email`: TEXT (Unique, Not Null)
- `full_name`: TEXT
- `avatar_url`: TEXT
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### 자동 트리거
- 새 사용자가 Google로 로그인하면 자동으로 `users` 테이블에 추가됩니다
- 사용자 정보가 업데이트되면 자동으로 동기화됩니다

## 5. 로컬 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000/auth`로 이동하여 Google 로그인을 테스트하세요.

## 6. 보안 설정

### Row Level Security (RLS)
- 사용자는 자신의 프로필만 조회/수정 가능
- 다른 사용자의 정보는 접근 불가

### 환경 변수 보안
- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- `.gitignore`에 `.env.local`이 포함되어 있는지 확인하세요

## 트러블슈팅

### 로그인 후 리디렉션이 안 되는 경우
- Supabase Dashboard > Authentication > URL Configuration
- Site URL: `http://localhost:3000` (개발) / `https://yourdomain.com` (프로덕션)
- Redirect URLs: 위와 동일하게 설정

### "Invalid Redirect URL" 에러
- Supabase Dashboard에서 Redirect URLs에 현재 도메인이 추가되어 있는지 확인

### 사용자 테이블에 데이터가 안 들어가는 경우
- SQL Editor에서 트리거가 제대로 생성되었는지 확인
- 트리거 재생성: 마이그레이션 스크립트 다시 실행

## 완료!

이제 thumbAI에서 Google 로그인을 사용할 수 있습니다! 🎉
