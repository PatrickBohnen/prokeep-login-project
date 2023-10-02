import './globals.css'
import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'

const barlow = Barlow({ subsets: ['latin'], variable: '--font-barlow', weight: ['200', '300', '400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Prokeep Login',
  description: 'Log in to your Prokeep account',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={barlow.className}>{children}</body>
    </html>
  )
}
