import { LogInForm } from '@/components/Auth'
import { createClient } from '@/utils/supabase/server'
import { MoveRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Login() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session) redirect('/')

  return (
    <div className="flex min-h-dvh flex-col items-center">
      <main className="flex w-full flex-1 flex-col justify-center px-8 duration-200 animate-in fade-in sm:max-w-md">
        <h1 className="mb-8 text-center text-2xl font-semibold tracking-tight lg:text-3xl">
          Log In
        </h1>
        <LogInForm />
        <p className="mt-8 text-center text-sm text-zinc-400">
          Need an account?{' '}
          <Link
            href="/register"
            className="inline-flex items-center transition-colors hover:text-white"
          >
            Sign up <MoveRight className="ml-1" size={16} />
          </Link>
        </p>
      </main>
    </div>
  )
}
