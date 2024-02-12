import { CreateGroupForm } from '@/components/groups'
import { Container } from '@/components/ui/layout'
import { getProfile } from '@/data/profile'
import { redirect } from 'next/navigation'

export default async function Groups() {
  const profile = await getProfile()
  if (!profile) redirect('/login')

  return (
    <Container className="max-w-md">
      <CreateGroupForm profile={profile} />
    </Container>
  )
}
