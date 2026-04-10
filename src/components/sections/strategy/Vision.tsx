'use client'

import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/Reveal'
import { Sparkles, Network, Globe, Leaf } from 'lucide-react'

const icons = [Sparkles, Network, Globe, Leaf]
const statuses = ['shipping', 'roadmap', 'roadmap', 'vision'] as const

export function Vision() {
  const t = useTranslations('StrategyVision')

  const phases = [0, 1, 2, 3].map((i) => ({
    phase: t(`phases.${i}.phase`),
    icon: icons[i],
    title: t(`phases.${i}.title`),
    description: t(`phases.${i}.description`),
    status: statuses[i],
  }))

  const statusLabel = (s: typeof statuses[number]) => {
    if (s === 'shipping') return t('statusShipping')
    if (s === 'roadmap') return t('statusRoadmap')
    return t('statusVision')
  }

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">{t('headline')}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('subheadline')}
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
                      {statusLabel(phase.status)}
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

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('closing')}
          </p>
        </div>
      </div>
    </section>
  )
}
