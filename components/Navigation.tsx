'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { logOut } from '@/lib/actions'
import { type Session } from '@supabase/supabase-js'
import { LogIn, LogOut } from 'lucide-react'
import Link from 'next/link'

interface NavigationProps {
  session: Session | null
}

export default function Navigation({ session }: NavigationProps) {
  return (
    <nav className="fixed top-0 flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        <h2 className="text-xl">
          <Link href="/">Fotomo</Link>
        </h2>
        {session ?
          <Button
            variant="outline"
            onClick={() => logOut()}
            aria-label="Log out"
          >
            <LogOut className="mr-2" size={16} /> Log Out
          </Button>
        : <Link
            className={buttonVariants({ variant: 'outline' })}
            href="/login"
            aria-label="Log in"
          >
            <LogIn className="mr-2" size={16} /> Log In
          </Link>
        }
      </div>
    </nav>
  )
}
