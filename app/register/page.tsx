import { SignUpForm } from '@/components/auth'
import { Container } from '@/components/ui/layout'
import { isAuthorized } from '@/lib/utils'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Register() {
  if (await isAuthorized(cookies())) redirect('/')

  return (
    <Container className="max-w-md">
      <SignUpForm />
    </Container>
  )
}
