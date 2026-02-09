import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || supabaseUrl === 'your_supabase_url_here') {
    throw new Error(
      '❌ Supabase URL이 설정되지 않았습니다!\n\n' +
      '.env.local 파일에 NEXT_PUBLIC_SUPABASE_URL을 설정해주세요.\n' +
      'Supabase Dashboard > Settings > API에서 Project URL을 확인하세요.'
    )
  }

  if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key_here') {
    throw new Error(
      '❌ Supabase Anon Key가 설정되지 않았습니다!\n\n' +
      '.env.local 파일에 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정해주세요.\n' +
      'Supabase Dashboard > Settings > API에서 anon/public key를 확인하세요.'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
