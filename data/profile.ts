import { createClient } from '@/utils/supabase/server'
import { camelCase } from 'change-case/keys'
import { cookies } from 'next/headers'
import 'server-only'

export interface ProfileDTO {
  email: string | null
  givenName: string | null
  familyName: string | null
  avatarUrl: string | null
}

export async function getProfile() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id)
    .maybeSingle()
  return profile ? (camelCase(profile) as ProfileDTO) : null
}
