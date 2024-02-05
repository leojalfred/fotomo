'use client'

import { Button } from '@/components/ui/button'
import { logOut } from '@/lib/actions'
import { type User } from '@supabase/supabase-js'
import { LogOut, LogIn } from 'lucide-react'
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
            className="h-auto p-0"
            variant="link"
            onClick={() => logOut()}
          >
            <LogOut size={16} />
          </Button>
        : <Link href="/login">
            <LogIn size={16} />
          </Link>
        }
      </div>
    </nav>
  )
}
