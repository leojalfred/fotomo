import './globals.css'
import Navigation from '@/components/navigation'
import { getSession } from '@/data/session'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'

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
  const { isAuthenticated } = await getSession()

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Navigation isAuthenticated={isAuthenticated} />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
