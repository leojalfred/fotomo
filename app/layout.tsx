import './globals.css'
import Navigation from '@/components/Navigation'
import { createClient } from '@/utils/supabase/server'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import { cookies } from 'next/headers'

const defaultUrl =
  process.env.VERCEL_URL ?
    `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Navigation session={session} />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
