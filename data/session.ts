import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import 'server-only'

export interface SessionDTO {
  isAuthenticated: boolean
}

export async function getSession(): Promise<SessionDTO> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  if (error) console.log(error)

  return { isAuthenticated: !!session }
}
