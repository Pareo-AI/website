'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/useInView'
import { Citation } from '@/components/ui/Citation'

// ─── Sources ──────────────────────────────────────────────────────────────────

const src = {
  1: { label: 'EU Data Act — Morgan Lewis, Sep 2025', href: 'https://www.morganlewis.com/blogs/sourcingatmorganlewis/2025/09/eu-data-act-begins-september-12-impacting-cloud-services-connected-products-and-other-data-industries' },
  2: { label: 'Manufacturing-X — BMWK', href: 'https://www.bundeswirtschaftsministerium.de/Redaktion/EN/Dossier/manufacturing-x.html' },
  3: { label: 'Factory-X — Fraunhofer ISST', href: 'https://www.isst.fraunhofer.de/en/departments/industrial-manufacturing/projects/factory-x.html' },
  4: { label: 'BOMcheck — Siemens, Philips, Schneider Electric, TE Connectivity coalition', href: 'https://www.bomcheck.net/en/suppliers/regulatory-compliance-declaration-tool' },
  5: { label: 'Intel IPC-1752A requirement — Intel Supplier Portal', href: 'https://www.intel.com/content/dam/www/public/us/en/documents/supplier/environment/supplier-training.pdf' },
  6: { label: 'BMW Group mandate — BMW Newsroom, 2025', href: 'https://www.bmwgroup.com/en/news/general/2025/catena-x-connects-digital-supply-chains.html' },
  7: { label: 'EU Battery Regulation 2023/1542 — TÜV Rheinland', href: 'https://www.tuv.com/landingpage/en/eu-new-battery-regulation-eu-2023-1542/' },
} as const

// ─── Scroll step ──────────────────────────────────────────────────────────────

type Step = { visual: number; content: React.ReactNode }

function ScrollStep({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.6, once: false })

  return (
    <div ref={ref} className="min-h-[60vh] flex items-center py-16">
      <div
        className="max-w-lg"
        style={{
          opacity: inView ? 1 : 0.25,
          transform: inView ? 'none' : 'translateX(16px)',
          transition: 'opacity 0.45s ease, transform 0.45s ease',
        }}
      >
        <div
          className="text-6xl font-bold mb-4 leading-none"
          style={{ color: 'rgba(123,92,245,0.2)', fontFamily: 'var(--font-ibm)' }}
        >
          0{index + 1}
        </div>
        <p
          className="text-lg leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
        >
          {step.content}
        </p>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Problem() {
  const t = useTranslations('StrategyProblem')

  const steps: Step[] = [
    {
      visual: 1,
      content: (
        <>
          {t('steps.0.a')}<Citation n={1} {...src[1]} /> {t('steps.0.b')}<Citation n={1} {...src[1]} />{' '}
          {t('steps.0.c')}
        </>
      ),
    },
    {
      visual: 2,
      content: (
        <>
          {t('steps.1.a')}<Citation n={2} {...src[2]} />
          {' '}{t('steps.1.b')}<Citation n={3} {...src[3]} />{' '}
          {t('steps.1.c')}
        </>
      ),
    },
    {
      visual: 3,
      content: (
        <>
          {t('steps.2.a')}<Citation n={4} {...src[4]} />{' '}
          {t('steps.2.b')}<Citation n={5} {...src[5]} />{' '}
          {t('steps.2.c')}
        </>
      ),
    },
    {
      visual: 4,
      content: (
        <>
          {t('steps.3.a')}<Citation n={7} {...src[7]} />{' '}
          {t('steps.3.b')}
        </>
      ),
    },
  ]

  const stats = [
    {
      number: t('stats.0.number'),
      label: t('stats.0.label'),
      body: <>{t('stats.0.body')}<Citation n={2} {...src[2]} /></>,
    },
    {
      number: t('stats.1.number'),
      label: t('stats.1.label'),
      body: <>{t('stats.1.body')}<Citation n={4} {...src[4]} /></>,
    },
    {
      number: t('stats.2.number'),
      label: t('stats.2.label'),
      body: <>{t('stats.2.body')}<Citation n={7} {...src[7]} /></>,
    },
  ]

  const timelineEvents = [
    { date: t('timeline.0.date'), label: t('timeline.0.label'), detail: t('timeline.0.detail') },
    { date: t('timeline.1.date'), label: t('timeline.1.label'), detail: t('timeline.1.detail') },
    { date: t('timeline.2.date'), label: t('timeline.2.label'), detail: t('timeline.2.detail') },
    { date: t('timeline.3.date'), label: t('timeline.3.label'), detail: t('timeline.3.detail') },
    { date: t('timeline.4.date'), label: t('timeline.4.label'), detail: t('timeline.4.detail') },
    { date: t('timeline.5.date'), label: t('timeline.5.label'), detail: t('timeline.5.detail') },
    { date: t('timeline.6.date'), label: t('timeline.6.label'), detail: t('timeline.6.detail') },
  ]

  return (
    <section style={{ background: '#0D0D1A' }} className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-8">

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
              {t('eyebrow')}
            </span>
          </div>
          <h2
            className="leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 800, color: '#ffffff' }}
          >
            {t('headline')}
          </h2>
        </div>

        <div className="mb-16 rounded-xl p-7 max-w-3xl" style={{ background: '#16162A', borderLeft: '3px solid #7B5CF5' }}>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            {t('intro')}<Citation n={4} {...src[4]} /><Citation n={5} {...src[5]} />{' '}
            {t('intro2')}<Citation n={7} {...src[7]} />{' '}
            {t('intro3')}
          </p>
        </div>

        {/* Scrollytelling — desktop */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              {/* Timeline visual */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ background: '#0D0D1A', border: '1px solid rgba(123,92,245,0.2)', minHeight: '340px' }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3 border-b"
                  style={{ borderColor: 'rgba(123,92,245,0.15)', background: 'rgba(123,92,245,0.05)' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ibm)' }}>
                    {t('timelineTitle')}
                  </span>
                  <div style={{ width: 56 }} />
                </div>

                <div className="px-5 py-5">
                  {timelineEvents.map((event, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 relative"
                      style={{ animation: `slide-in-left 0.3s ease ${i * 60}ms both` }}
                    >
                      {i < timelineEvents.length - 1 && (
                        <div
                          className="absolute"
                          style={{ left: '60px', top: '20px', width: '1px', height: '100%', background: 'rgba(123,92,245,0.18)' }}
                        />
                      )}
                      <div className="shrink-0 w-14 pt-1 text-right">
                        <span className="text-xs font-bold" style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
                          {event.date}
                        </span>
                      </div>
                      <div
                        className="shrink-0 mt-1.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: 'rgba(123,92,245,0.5)', background: '#0D0D1A' }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#7B5CF5' }} />
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="text-xs font-semibold" style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}>
                          {event.label}
                        </div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'var(--font-ibm)' }}>
                          {event.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            {steps.map((step, i) => (
              <ScrollStep key={i} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile stacked */}
        <div className="lg:hidden space-y-12 mb-24">
          {steps.map((step, i) => (
            <div key={i}>
              <div className="text-5xl font-bold mb-3" style={{ color: 'rgba(123,92,245,0.25)', fontFamily: 'var(--font-ibm)' }}>
                0{i + 1}
              </div>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                {step.content}
              </p>
            </div>
          ))}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="p-7 rounded-xl" style={{ background: '#16162A', border: '1px solid rgba(123,92,245,0.15)' }}>
              <div className="text-4xl font-extrabold mb-1 leading-none" style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
                {stat.number}
              </div>
              <div className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}>
                {stat.label}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                {stat.body}
              </p>
            </div>
          ))}
        </div>

        <div className="pb-16 text-center">
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            {t('closing')}
          </p>
        </div>

      </div>
    </section>
  )
}
