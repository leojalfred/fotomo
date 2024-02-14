import { SignUpForm } from '@/components/auth'
import { Container } from '@/components/ui/layout'
import { getSession } from '@/data/sessions'
import { redirect } from 'next/navigation'

export default async function Register() {
  const { isAuthenticated } = await getSession()
  if (isAuthenticated) redirect('/')

  return (
    <Container className="max-w-md">
      <SignUpForm />
    </Container>
  )
}
