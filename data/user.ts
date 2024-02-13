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
    error,
  } = await supabase.auth.getUser()
  if (error) console.error(error)

  return !!user ? { email: user.email } : null
}
