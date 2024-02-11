import { CreateGroupForm } from '@/components/groups'
import { Container } from '@/components/ui/layout'
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
    <Container className="max-w-md">
      <CreateGroupForm user={user} />
    </Container>
  )
}
