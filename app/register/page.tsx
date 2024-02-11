import { SignUpForm } from '@/components/auth'
import { isAuthorized } from '@/lib/utils'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Register() {
  if (await isAuthorized(cookies())) redirect('/')

  return (
    <div className="flex min-h-dvh flex-col items-center pt-16">
      <main className="flex w-full max-w-md flex-1 flex-col justify-center p-4 duration-200 animate-in fade-in sm:p-8">
        <SignUpForm />
      </main>
    </div>
  )
}
