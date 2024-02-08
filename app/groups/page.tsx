import { Button, buttonVariants } from '@/components/ui/button'
import { isAuthorized } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Groups() {
  if (!(await isAuthorized(cookies()))) redirect('/login')

  return (
    <div className="flex min-h-dvh flex-col items-center">
      <div className="flex w-full flex-1 flex-col items-center justify-center space-y-6 px-8 duration-200 animate-in fade-in sm:max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight">
          Nothing to see here!
        </h2>
        <p className="max-w-md text-center leading-7">
          Groups help keep your memories safe, organized, and accessible. Create
          a group to get started.
        </p>
        <Link
          className={buttonVariants({ variant: 'default' })}
          href="/groups/new"
        >
          <Plus className="mr-2" size={16} />
          Create new group
        </Link>
      </div>
    </div>
  )
}
