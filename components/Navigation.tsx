'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { logOut } from '@/lib/actions'
import { cn } from '@/lib/utils'
import { type Session } from '@supabase/supabase-js'
import { LogIn, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  session: Session | null
}

export default function Navigation({ session }: NavigationProps) {
  const pathname = usePathname()

  const linkData = [
    {
      href: '/groups',
      text: 'Groups',
    },
  ]
  const links = linkData.map(({ href, text }, index) => {
    const isActive = pathname.includes(href)
    const classes = cn(
      'text-muted-foreground transition-colors hover:text-foreground',
      isActive && 'text-foreground',
    )

    return (
      <Link key={index} href={href} className={classes}>
        {text}
      </Link>
    )
  })

  return (
    <nav className="fixed top-0 flex h-16 w-full justify-center border-b border-b-foreground/10 bg-background/50 shadow-md backdrop-blur-sm">
      <div className="flex w-full max-w-screen-xl items-center justify-between p-4 text-sm">
        <div className="flex items-center">
          <h2 className="mr-4 text-xl sm:mr-12">
            <Link href="/">Fotomo</Link>
          </h2>
          <div className="space-x-4 sm:space-x-6">{links}</div>
        </div>
        {session ?
          <Button
            variant="outline"
            onClick={() => logOut()}
            aria-label="Log out"
          >
            <LogOut className="mr-2" size={16} /> Log out
          </Button>
        : <Link
            className={buttonVariants({ variant: 'outline' })}
            href="/login"
            aria-label="Log in"
          >
            <LogIn className="mr-2" size={16} /> Log in
          </Link>
        }
      </div>
    </nav>
  )
}
