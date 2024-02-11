import './globals.css'
import Navigation from '@/components/navigation'
import { createClient } from '@/utils/supabase/server'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import { cookies } from 'next/headers'

const defaultUrl =
  process.env.VERCEL_URL ?
    `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Fotomo',
  description: 'Keep your memories safe, organized, and accessible',
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
        <Analytics />
      </body>
    </html>
  )
}
