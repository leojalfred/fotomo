import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ContainerProps {
  className?: string
  children?: ReactNode
}

export function Container({ className, children }: ContainerProps) {
  const classes = cn(
    'flex w-full flex-1 flex-col justify-center p-4 duration-200 animate-in fade-in sm:p-8',
    className,
  )

  return (
    <div className="flex min-h-dvh flex-col items-center pt-16">
      <main className={classes}>{children}</main>
    </div>
  )
}
