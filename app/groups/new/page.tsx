import { CreateGroupForm } from '@/components/groups'
import { Container } from '@/components/ui/layout'
import { getUser } from '@/data/users'
import { redirect } from 'next/navigation'

export default async function Groups() {
  const user = await getUser()
  if (!user) redirect('/login')

  return (
    <Container className="max-w-md">
      <CreateGroupForm user={user} />
    </Container>
  )
}
