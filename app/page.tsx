import { isAuthorized } from '@/lib/utils'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  if (!(await isAuthorized(cookies()))) redirect('/login')

  return <div></div>
}
