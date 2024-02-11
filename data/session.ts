import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import 'server-only'

export interface SessionDTO {
  isAuthenticated: boolean
}

export async function getSession(): Promise<SessionDTO> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { isAuthenticated: !!session }
}
