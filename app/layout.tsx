import { QueryProvider } from '@/components/query-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Magic + FCL Example',
  description: 'A Next.js starter with Magic and FCL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <main className="flex min-h-svh flex-col items-center p-4 md:p-24">
              <Suspense fallback={<div>Hello loading...</div>}>
                {children}
              </Suspense>
              <Toaster />
            </main>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
