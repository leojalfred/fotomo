'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { logOut } from '@/lib/actions'
import { type User } from '@supabase/supabase-js'
import { LogIn, LogOut } from 'lucide-react'
import Link from 'next/link'

interface NavigationProps {
  user: User | null
}

export default function Navigation({ user }: NavigationProps) {
  return (
    <nav className="fixed top-0 flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        <h2 className="text-xl">
          <Link href="/">Fotomo</Link>
        </h2>
        {user ?
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
