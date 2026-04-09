'use client'

import { Reveal } from '@/components/ui/Reveal'
import { ArrowRight, Sparkles, Network, Globe, Leaf } from 'lucide-react'

export function Vision() {
  const phases = [
    {
      phase: "Today",
      icon: Sparkles,
      title: "Compliance Intelligence",
      description: "AI agents that understand regulatory requirements and automate compliance workflows for RoHS, REACH, SCIP, and PFAS.",
      status: "shipping"
    },
    {
      phase: "2026",
      icon: Network,
      title: "Supply Chain Knowledge Graph",
      description: "Connect products → components → materials → suppliers. Every compliance question becomes a graph query. Suppliers update once, all customers see it.",
      status: "roadmap"
    },
    {
      phase: "2027",
      icon: Globe,
      title: "Proactive Compliance Platform",
      description: "Monitor regulatory changes globally. Alert customers before new substances hit candidate lists. Auto-generate impact assessments. Predict compliance risks before they materialize.",
      status: "roadmap"
    },
    {
      phase: "2028+",
      icon: Leaf,
      title: "Digital Product Passport Infrastructure",
      description: "EU's Digital Product Passport mandate arrives. We're already the compliance data backbone - extending to circularity, carbon footprint, and full product lifecycle transparency.",
      status: "vision"
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              For Investors
            </span>
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">Compliance is the Wedge. Transparency is the Market.</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Every manufacturer is drowning in compliance data. But compliance is just the first use case.
            The real opportunity is becoming the <span className="font-semibold text-foreground">universal supply chain transparency layer</span> - the system of record for what's actually in products, where it came from, and whether it meets evolving standards.
          </p>
        </div>

        <div className="relative">
          {/* Timeline connector */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <Reveal
                key={phase.phase}
                delay={index * 100}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1 lg:text-right" style={{ textAlign: index % 2 === 0 ? 'left' : 'right' }}>
                  <div className="inline-block mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      phase.status === 'shipping'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : phase.status === 'roadmap'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {phase.status === 'shipping' ? '✓ Shipping' : phase.status === 'roadmap' ? '→ Roadmap' : '⋆ Vision'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{phase.title}</h3>
                  <p className="text-muted-foreground">{phase.description}</p>
                </div>

                {/* Icon */}
                <div className="flex-shrink-0 relative">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center z-10 relative shadow-lg">
                    <phase.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/20 animate-pulse"></div>
                </div>

                {/* Phase label */}
                <div className="flex-1" style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                  <div className="text-3xl font-bold text-muted-foreground/30">{phase.phase}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold text-primary mb-2">Network Effects</div>
            <p className="text-sm text-muted-foreground">
              Every supplier we onboard creates value for multiple manufacturers. Eventually, suppliers maintain their compliance data once in Pareo - and all their customers benefit.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold text-primary mb-2">Regulatory Tailwind</div>
            <p className="text-sm text-muted-foreground">
              EU Green Deal, PFAS restrictions, Digital Product Passport, CSRD sustainability reporting - regulation is accelerating. Compliance isn't optional. We're infrastructure.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold text-primary mb-2">Vertical → Horizontal</div>
            <p className="text-sm text-muted-foreground">
              Start with electronics (automotive sensors, semiconductors). Expand to medical devices, machinery, consumer goods. Same regulations, same problem, different industries.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not building a compliance tool. We're building the <span className="font-semibold text-foreground">data backbone for the circular economy</span>.
            Compliance is just the first killer app.
          </p>
        </div>
      </div>
    </section>
  )
}
