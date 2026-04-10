import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Pareo — Industrial Data Infrastructure',
  description: 'Pareo turns compliance obligations into structured product data — feeding Manufacturing-X and Factory-X ecosystems while satisfying OEM mandates and EU regulations.',
}

export default function StrategyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
