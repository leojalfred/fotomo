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

export async function getProfile() {
  const supabase = createClient(cookies())
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError) console.error(userError)
  if (!user) return null

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id)
    .maybeSingle()
  if (profileError) console.error(profileError)

  return profile ? (camelCase(profile) as ProfileDTO) : null
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
