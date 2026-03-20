'use client'

import { Hero } from '@/components/sections/strategy/Hero'
import { Problem } from '@/components/sections/strategy/Problem'
import { HowItWorks } from '@/components/sections/strategy/HowItWorks'
import { Benefits } from '@/components/sections/strategy/Benefits'
import { Regulations } from '@/components/sections/strategy/Regulations'
import { DataSovereignty } from '@/components/sections/strategy/DataSovereignty'
import { CTA } from '@/components/sections/strategy/CTA'

export default function StrategyPage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Benefits />
      <Regulations />
      <DataSovereignty />
      <CTA />
    </>
  )
}
