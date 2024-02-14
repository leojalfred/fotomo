import { Container } from '@/components/ui/layout'
import { getSession } from '@/data/sessions'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const { isAuthenticated } = await getSession()
  if (!isAuthenticated) redirect('/login')

  return <Container className="max-w-screen-xl"></Container>
}
