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
    <div className="flex min-h-dvh flex-col items-center pt-16">
      <main className="flex w-full max-w-md flex-1 flex-col justify-center p-4 duration-200 animate-in fade-in sm:p-8">
        <CreateGroupForm user={user} />
      </main>
    </div>
  )
}
