import { CreateGroupForm } from '@/components/Groups'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Groups() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="flex min-h-dvh flex-col items-center">
      <main className="flex w-full flex-1 flex-col justify-center px-8 duration-200 animate-in fade-in sm:max-w-md">
        <h1 className="mb-8 text-center text-2xl font-semibold tracking-tight lg:text-3xl">
          Create a new group
        </h1>
        <CreateGroupForm user={user} />
      </main>
    </div>
  )
}
