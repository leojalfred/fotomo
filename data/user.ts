import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import 'server-only'

export interface UserDTO {
  email: string | undefined
}

export async function getUser(): Promise<UserDTO | null> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return !!user ? { email: user.email } : null
}
