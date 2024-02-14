import { createClient } from '@/utils/supabase/server'
import { camelCase } from 'change-case/keys'
import { cookies } from 'next/headers'
import 'server-only'

export interface UserDTO {
  id: string
  email: string
  givenName: string
  familyName: string
  avatarUrl: string | null
}

export async function getUser(): Promise<UserDTO | null> {
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

export async function getUsers(search?: string): Promise<UserDTO[]> {
  const supabase = createClient(cookies())
  const query = supabase.from('users').select().limit(10)
  if (search) query.ilike('email', `%${search}%`)

  const { data: users, error } = await query
  if (error) console.error(error)

  return users ? users.map((user) => camelCase(user)) : []
}
