import { isAuthorized } from '@/lib/utils'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Groups() {
  if (!(await isAuthorized(cookies()))) redirect('/login')

  return (
    <div className="flex min-h-dvh flex-col items-center">
      <div className="flex w-full flex-1 flex-col items-center justify-center space-y-6 px-8 duration-200 animate-in fade-in sm:max-w-6xl"></div>
    </div>
  )
}
