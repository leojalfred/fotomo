import { createClient } from '@/utils/supabase/server'
import { type ClassValue, clsx } from 'clsx'
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function isAuthorized(cookieStore: ReadonlyRequestCookies) {
  const supabase = createClient(cookieStore)
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return !!session
}
