'use server'

import { logInSchema } from '@/components/Auth'
import { createClient } from '@/utils/supabase/server'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type State = {
  message?: string
}

export async function logIn(
  _: State,
  { email, password }: z.infer<typeof logInSchema>,
) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error(error)
    return { message: 'Could not authenticate user' }
  }

  redirect('/')
}

export async function signUp(
  _: State,
  { email, password }: z.infer<typeof logInSchema>,
) {
  const origin = headers().get('origin')
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error)
    return { message: 'Could not register user' }
  }

  return { message: 'Check your email to finish signing up' }
}
