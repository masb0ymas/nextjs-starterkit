import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { META } from '@/lib/constants/meta'
import DecorationProvider from '@/lib/providers/decoration'
export const metadata: Metadata = META

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontPoppins.className} antialiased`}>
        <DecorationProvider>{children}</DecorationProvider>
      </body>
    </html>
  )
}
