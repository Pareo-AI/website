'use client'

import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/Reveal'

const STAT_COUNT = 3
const COMPARISON_COUNT = 6

export function Benefits() {
  const t = useTranslations('Benefits')

  const statCards = Array.from({ length: STAT_COUNT }, (_, i) => ({
    stat: t(`stats.${i}.stat`),
    body: t(`stats.${i}.body`),
  }))

  const comparison = Array.from({ length: COMPARISON_COUNT }, (_, i) => ({
    without: t(`comparison.${i}.without`),
    with: t(`comparison.${i}.with`),
  }))

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
            <span className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
              {t('eyebrow')}
            </span>
          </div>
          <h2 className="mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#ffffff' }}>
            {t('headline')}
          </h2>
          <p className="max-w-2xl text-base"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            {t('subheadline')}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {statCards.map((card, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              threshold={0.4}
              className="p-7 rounded-xl"
              style={{ background: '#16162A', border: '1px solid rgba(123,92,245,0.15)' }}
            >
              <div className="text-4xl font-extrabold mb-3 leading-none"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
                {card.stat}
              </div>
              <p className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Comparison table */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(123,92,245,0.15)' }}>
          {/* Table header */}
          <div className="grid grid-cols-2">
            <div className="px-6 py-4" style={{ background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(123,92,245,0.1)' }}>
              <span className="text-sm font-semibold"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-ibm)' }}>
                {t('withoutHeader')}
              </span>
            </div>
            <div className="px-6 py-4" style={{ background: 'rgba(123,92,245,0.07)' }}>
              <span className="text-sm font-semibold"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
                {t('withHeader')}
              </span>
            </div>
          </div>

          {/* Rows */}
          {comparison.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-2 border-t"
              style={{ borderColor: 'rgba(123,92,245,0.08)' }}
            >
              <div
                className="px-6 py-4 text-sm leading-relaxed"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'var(--font-ibm)',
                  fontWeight: 300,
                  borderRight: '1px solid rgba(123,92,245,0.08)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                }}
              >
                {row.without}
              </div>
              <div
                className="px-6 py-4 text-sm leading-relaxed"
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontFamily: 'var(--font-ibm)',
                  fontWeight: 300,
                  background: i % 2 === 0 ? 'rgba(123,92,245,0.04)' : 'rgba(123,92,245,0.03)',
                }}
              >
                {row.with}
              </div>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            {t('closing')}
          </p>
        </div>
      </div>
    </section>
  )
}
