import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { founders } from '@/lib/founders'
import { CardPage } from './CardPage'

interface Props {
  params: Promise<{ founder: string }>
}

export async function generateStaticParams() {
  return Object.keys(founders).map((key) => ({ founder: key }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { founder: founderKey } = await params
  const founder = founders[founderKey]
  if (!founder) return {}
  return {
    title: `${founder.name} — Pareo`,
    description: `Connect with ${founder.name}, ${founder.role} at Pareo. AI-powered compliance automation for manufacturing.`,
  }
}

export default async function FounderCardPage({ params }: Props) {
  const { founder: founderKey } = await params
  const founder = founders[founderKey]
  if (!founder) notFound()
  return <CardPage founder={founder} />
}
