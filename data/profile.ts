import { createClient } from '@/utils/supabase/server'
import { camelCase } from 'change-case/keys'
import { cookies } from 'next/headers'
import 'server-only'

export interface ProfileDTO {
  id: string
  email: string
  givenName: string
  familyName: string
  avatarUrl: string
}

export async function getProfile(): Promise<ProfileDTO | null> {
  const supabase = createClient(cookies())
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError) console.error(userError)
  if (!user) return null

  return {
    id: user.id,
    email: user.user_metadata.email,
    givenName: user.user_metadata.given_name,
    familyName: user.user_metadata.family_name,
    avatarUrl: user.user_metadata.avatar_url,
  }
}

export async function getProfiles(search?: string) {
  const supabase = createClient(cookies())
  const query = supabase.from('profiles').select().limit(10)
  if (search) query.ilike('email', `%${search}%`)

  const { data: profiles, error } = await query
  if (error) console.error(error)

  return profiles ?
      profiles.map((profile) => camelCase(profile) as ProfileDTO)
    : []
}
