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
      description: "Your product data — already structured for compliance — becomes the foundation for industrial data space participation. Manufacturing-X and Factory-X connectors let you share product data with OEMs and system integrators automatically, without rebuilding from scratch.",
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
          <h2 className="text-3xl font-bold sm:text-4xl">Where compliance work leads.</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            The EU Data Act, Manufacturing-X, and Digital Product Passport mandates are converging
            on the same requirement: structured, machine-readable product data across every supply
            chain tier. Pareo starts with the compliance problem your team already has — and builds
            the data foundation that every subsequent requirement draws from.
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

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The compliance work you do today doesn't have to be a cost centre.
            Done with the right data structure, it becomes the <span className="font-semibold text-foreground">foundation for data space participation, DPP readiness, and automated supply chain integration</span> — work your team would otherwise have to do again from scratch.
          </p>
        </div>
      </div>
    </section>
  )
}
