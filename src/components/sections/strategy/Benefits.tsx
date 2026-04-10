'use client'

import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/Reveal'

export function Benefits() {
  const t = useTranslations('StrategyBenefits')

  const statCards = [
    { stat: t('stats.0.stat'), body: t('stats.0.body') },
    { stat: t('stats.1.stat'), body: t('stats.1.body') },
    { stat: t('stats.2.stat'), body: t('stats.2.body') },
  ]

  const outcomes = [
    { icon: t('outcomes.0.icon'), title: t('outcomes.0.title'), body: t('outcomes.0.body') },
    { icon: t('outcomes.1.icon'), title: t('outcomes.1.title'), body: t('outcomes.1.body') },
    { icon: t('outcomes.2.icon'), title: t('outcomes.2.title'), body: t('outcomes.2.body') },
  ]

  return (
    <section
      className="py-24 border-t"
      style={{ background: '#13131F', borderColor: 'rgba(123,92,245,0.1)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
            >
              {t('eyebrow')}
            </span>
          </div>
          <h2
            className="mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#ffffff' }}
          >
            {t('headline')}
          </h2>
          <p
            className="max-w-2xl text-base"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
          >
            {t('subheadline')}
          </p>
        </div>

        {/* Operational stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
          {statCards.map((card, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              threshold={0.4}
              className="p-7 rounded-xl"
              style={{ background: '#16162A', border: '1px solid rgba(123,92,245,0.15)' }}
            >
              <div
                className="text-4xl font-extrabold mb-3 leading-none"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
              >
                {card.stat}
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
              >
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>

        <p
          className="text-xs mb-16 mt-3"
          style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-ibm)' }}
        >
          {t('benchmarkNote')}
        </p>

        {/* Strategic outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {outcomes.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 120}
              threshold={0.3}
              className="p-7 rounded-xl"
              style={{
                background: 'rgba(123,92,245,0.06)',
                border: '1px solid rgba(123,92,245,0.2)',
              }}
            >
              <div
                className="text-2xl mb-4"
                style={{ color: '#7B5CF5' }}
              >
                {item.icon}
              </div>
              <h3
                className="text-base font-bold mb-3"
                style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
              >
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-4 text-center max-w-3xl mx-auto">
          <p
            className="text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
          >
            {t('closing')}
          </p>
        </div>
      </div>
    </section>
  )
}
