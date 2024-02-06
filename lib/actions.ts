'use server'

import { logInSchema, signUpSchema } from '@/lib/schemas'
import { createClient } from '@/utils/supabase/server'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type ActionState = {
  type?: 'info' | 'error'
  message?: string
}

export async function signUp(
  _: ActionState,
  credentials: z.infer<typeof signUpSchema>,
): Promise<ActionState> {
  const parsedCredentials = signUpSchema.safeParse(credentials)
  if (!parsedCredentials.success) {
    console.error(parsedCredentials.error)
    return { type: 'error', message: 'Could not register user.' }
  }

  const origin = headers().get('origin')
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { email, password } = parsedCredentials.data

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error)
    return { type: 'error', message: 'Could not register user.' }
  }

  return { type: 'info', message: 'Check your email to finish signing up.' }
}

export async function logIn(
  _: ActionState,
  credentials: z.infer<typeof logInSchema>,
): Promise<ActionState> {
  const parsedCredentials = logInSchema.safeParse(credentials)
  if (!parsedCredentials.success) {
    console.error(parsedCredentials.error)
    return { type: 'error', message: 'Could not authenticate user.' }
  }

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { email, password } = parsedCredentials.data

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error(error)
    return { type: 'error', message: 'Could not authenticate user.' }
  }

  redirect('/')
}

export async function logOut() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  await supabase.auth.signOut()

  redirect('/login')
}
