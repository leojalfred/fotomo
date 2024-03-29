import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/layout'
import { getSession } from '@/data/sessions'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Groups() {
  const { isAuthenticated } = await getSession()
  if (!isAuthenticated) redirect('/login')

  return (
    <Container className="items-center space-y-6 text-center">
      <h2 className="text-3xl font-semibold tracking-tight">
        Nothing to see here!
      </h2>
      <p className="max-w-md leading-7">
        Groups help keep your memories safe, organized, and accessible. Create a
        group to get started.
      </p>
      <Link
        className={buttonVariants({ variant: 'default' })}
        href="/groups/new"
      >
        <Plus className="mr-2" size={16} />
        Create new group
      </Link>
    </Container>
  )
}
