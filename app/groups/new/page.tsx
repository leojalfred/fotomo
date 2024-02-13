import { CreateGroupForm } from '@/components/groups'
import { Container } from '@/components/ui/layout'
import { getProfile, getProfiles } from '@/data/profile'
import { redirect } from 'next/navigation'

export default async function Groups() {
  const [profile, profiles] = await Promise.allSettled([
    getProfile(),
    getProfiles(),
  ])
  if (profile.status === 'rejected' || !profile.value) redirect('/login')
  const profilesValue = profiles.status === 'fulfilled' ? profiles.value : null

  return (
    <Container className="max-w-md">
      <CreateGroupForm
        authenticatedProfile={profile.value}
        profiles={profilesValue}
      />
    </Container>
  )
}
