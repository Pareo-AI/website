import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pareo — Contact',
  description: 'Pareo: AI-powered compliance automation for manufacturing.',
  robots: { index: false, follow: false },
}

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
