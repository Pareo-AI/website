'use client'

import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/Reveal'

export function DataSovereignty() {
  const t = useTranslations('StrategyDataSovereignty')

  const pillars = [
    { icon: '⟳', title: t('pillars.0.title'), body: t('pillars.0.body') },
    { icon: '◉', title: t('pillars.1.title'), body: t('pillars.1.body') },
    { icon: '⬡', title: t('pillars.2.title'), body: t('pillars.2.body') },
    { icon: '⊞', title: t('pillars.3.title'), body: t('pillars.3.body') },
  ]

  return (
    <section
      className="py-24 border-t"
      style={{ background: '#13131F', borderColor: 'rgba(123,92,245,0.1)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
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
            className="mb-5 leading-tight"
            style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: 'clamp(30px, 4vw, 50px)',
              fontWeight: 800,
              color: '#ffffff',
            }}
          >
            {t('headline1')}{' '}
            <span style={{ color: '#7B5CF5' }}>{t('headline2')}</span>
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'var(--font-ibm)',
              fontWeight: 300,
            }}
          >
            {t('intro1')}
          </p>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'var(--font-ibm)',
              fontWeight: 300,
            }}
          >
            {t('intro2')}
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {pillars.map((pillar, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              threshold={0.3}
              className="p-7 rounded-xl"
              style={{
                background: '#0D0D1A',
                border: '1px solid rgba(123,92,245,0.15)',
              }}
            >
              <div
                className="text-xl mb-4 leading-none"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
              >
                {pillar.icon}
              </div>
              <h3
                className="text-sm font-bold mb-2"
                style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'var(--font-ibm)',
                  fontWeight: 300,
                }}
              >
                {pillar.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Closing callout */}
        <Reveal
          threshold={0.5}
          className="rounded-xl p-7 max-w-3xl"
          style={{ background: '#16162A', borderLeft: '3px solid #7B5CF5' }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'var(--font-ibm)',
              fontWeight: 300,
            }}
          >
            {t('closing')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
