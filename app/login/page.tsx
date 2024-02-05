import { LogInForm } from '@/components/Auth'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'

export default function Login() {
  return (
    <div className="flex min-h-dvh flex-col items-center">
      <div className="flex w-full flex-1 flex-col justify-center px-8 sm:max-w-md">
        <main className="duration-200 animate-in fade-in">
          <h1 className="mb-8 text-center text-2xl font-semibold tracking-tight lg:text-3xl">
            Log In
          </h1>
          <LogInForm />
        </main>
        <p className="mt-8 text-center text-sm text-zinc-500">
          Need an account?{' '}
          <Link
            href="/register"
            className="inline-flex items-center transition-colors hover:text-zinc-200"
          >
            Sign up <MoveRight className="ml-1" size={16} />
          </Link>
        </p>
      </div>
    </div>
  )
}
