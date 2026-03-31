'use client';

import { Benefits } from '@/components/sections/Benefits';
import { CTA } from '@/components/sections/CTA';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Problem } from '@/components/sections/Problem';
import { Regulations } from '@/components/sections/Regulations';
import { Security } from '@/components/sections/Security';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Benefits />
      <Regulations />
      <Security />
      <CTA />
    </>
  );
}
