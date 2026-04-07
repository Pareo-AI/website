'use client'

import { usePathname } from 'next/navigation'
import { Footer } from './Footer'
import { Header } from './Header'

export function ConditionalSiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isCardPage = pathname.startsWith('/card')

  if (isCardPage) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
