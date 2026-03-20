import type { Metadata } from 'next'
import { StrategyHeader } from '@/components/layout/StrategyHeader'
import { StrategyFooter } from '@/components/layout/StrategyFooter'

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
      <StrategyHeader />
      <main>{children}</main>
      <StrategyFooter />
    </>
  )
}
