'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Network, Globe, Leaf } from 'lucide-react'

export function Vision() {
  const phases = [
    {
      phase: "Today",
      icon: Sparkles,
      title: "Compliance Automation",
      description: "AI agents automate compliance workflows for RoHS, REACH, SCIP, PFAS, and more — turning days of manual data work into minutes. Every response structured, validated, and audit-ready.",
      status: "shipping"
    },
    {
      phase: "2026",
      icon: Network,
      title: "Data Space Readiness",
      description: "Your product data — already structured for compliance — becomes the foundation for industrial data space participation. Catena-X, Manufacturing-X, and Factory-X connectors let you share data with OEMs automatically, without rebuilding from scratch.",
      status: "roadmap"
    },
    {
      phase: "2027",
      icon: Globe,
      title: "Proactive Regulatory Intelligence",
      description: "Monitor regulatory changes globally. Alert customers before new substances hit candidate lists. Auto-generate EU Data Act compliance assessments. Predict supply chain risk before it materializes.",
      status: "roadmap"
    },
    {
      phase: "2028+",
      icon: Leaf,
      title: "Digital Product Passport Infrastructure",
      description: "The EU Digital Product Passport mandate arrives. We're already the structured data backbone — extending to circularity, carbon footprint, and full lifecycle transparency across the single market.",
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
          <h2 className="text-3xl font-bold sm:text-4xl">Compliance is the Entry Point. The Data Economy is the Market.</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            When the metric system replaced regional measurement units in the 19th century, cross-border
            trade and engineering collaboration accelerated beyond what had been possible. Industrial data
            is undergoing the same transition. The EU Data Act, OPC UA, and European data spaces are
            building the shared infrastructure. Pareo is how manufacturers{' '}
            <span className="font-semibold text-foreground">get their data ready for it</span> — starting with compliance,
            the most immediate and highest-stakes data problem they already have.
          </p>
        </div>

        <div className="relative">
          {/* Timeline connector */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
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
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold text-primary mb-2">Network Effects</div>
            <p className="text-sm text-muted-foreground">
              Every supplier onboarded creates value for multiple OEMs. As data spaces mature, suppliers maintain structured product data once in Pareo — and every connected customer benefits automatically.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold text-primary mb-2">Structural Tailwind</div>
            <p className="text-sm text-muted-foreground">
              EU Data Act, Digital Product Passport, CSRD, Catena-X, Manufacturing-X — the regulatory and infrastructure forces are aligned. Industrial data standardization isn't optional. We're the readiness layer.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-3xl font-bold text-primary mb-2">Vertical → Horizontal</div>
            <p className="text-sm text-muted-foreground">
              Start with electronics and automotive supply chains where data space mandates are most immediate. Expand to machinery, medical devices, consumer goods — same infrastructure problem, different industries.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not building a compliance tool. We're building the <span className="font-semibold text-foreground">infrastructure layer for the EU industrial data economy</span>.
            Compliance is just the first — and most urgent — entry point.
          </p>
        </div>
      </div>
    </section>
  )
}
