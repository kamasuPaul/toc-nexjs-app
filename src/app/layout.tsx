import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Table of contents',
  description: 'App for creating and editing tables of contents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="halloween">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
