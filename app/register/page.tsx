import { SignUpForm } from '@/components/Auth'
import { isAuthorized } from '@/lib/utils'
import { MoveRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Register() {
  if (await isAuthorized(cookies())) redirect('/')

  return (
    <div className="flex min-h-dvh flex-col items-center">
      <div className="flex w-full flex-1 flex-col justify-center px-8 duration-200 animate-in fade-in sm:max-w-md">
        <h1 className="mb-8 text-center text-2xl font-semibold tracking-tight lg:text-3xl">
          Sign Up
        </h1>
        <SignUpForm />
        <p className="mt-8 text-center text-sm text-zinc-400">
          Have an account?{' '}
          <Link
            href="/login"
            className="inline-flex items-center transition-colors hover:text-white"
          >
            Log in <MoveRight className="ml-1" size={16} />
          </Link>
        </p>
      </div>
    </div>
  )
}
