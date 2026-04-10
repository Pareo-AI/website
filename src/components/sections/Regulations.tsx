'use client'

import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/Reveal'

const regulations = [
  { name: 'REACH SVHC', theme: 'Chemical Substances', flag: '🇪🇺', active: true },
  { name: 'RoHS', theme: 'Electrical / Electronic', flag: '🇪🇺', active: true },
  { name: 'PFAS', theme: 'Chemical Substances', flag: '🇪🇺🇺🇸', active: true },
  { name: 'SCIP', theme: 'Chemical Substances', flag: '🇪🇺', active: true },
  { name: 'Conflict Minerals', theme: 'Trade & Conflict', flag: '🇺🇸', active: true },
  { name: 'TSCA', theme: 'Chemical Substances', flag: '🇺🇸', active: true },
  { name: 'California Prop. 65', theme: 'Chemical Substances', flag: '🇺🇸', active: true },
  { name: 'Ecodesign', theme: 'Sustainability', flag: '🇪🇺', active: true },
  { name: 'CSRD', theme: 'Sustainability Reporting', flag: '🇪🇺', active: true },
  { name: 'EU Battery Regulation', theme: 'Electrical / Electronic', flag: '🇪🇺', active: true },
  { name: 'IPC-1752', theme: 'Electrical / Electronic', flag: '🌐', active: true },
  { name: 'OSHA', theme: 'Chemical Substances', flag: '🇺🇸', active: true },
  { name: 'Digital Product Passport', theme: 'Sustainability', flag: '🇪🇺', active: false },
]

export function Regulations() {
  const t = useTranslations('Regulations')

  return (
    <section
      className="py-24 border-t"
      style={{ background: '#0A0A12', borderColor: 'rgba(123,92,245,0.1)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
              {t('eyebrow')}
            </span>
          </div>
          <h2 className="mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 800, color: '#ffffff' }}>
            {t('headline1')}{' '}
            <span style={{ color: '#7B5CF5' }}>{t('headline2')}</span>
          </h2>
          <p className="text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            {t('subheadline')}
          </p>
        </div>

        {/* Regulation pills */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-3">
            {regulations.map((reg, i) => (
              <Reveal
                key={reg.name}
                delay={i * 50}
                threshold={0.2}
                variant="scale"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium"
                title={reg.theme}
                style={{
                  background: reg.active ? 'rgba(123,92,245,0.1)' : 'rgba(255,255,255,0.04)',
                  border: reg.active ? '1px solid rgba(123,92,245,0.25)' : '1px solid rgba(255,255,255,0.08)',
                  color: reg.active ? '#c4b0ff' : 'rgba(255,255,255,0.25)',
                  fontFamily: 'var(--font-ibm)',
                }}
              >
                <span style={{ fontSize: '13px' }}>{reg.flag}</span>
                <span>{reg.name}</span>
                {!reg.active && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', fontSize: '10px' }}
                  >
                    {t('soon')}
                  </span>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        {/* Forward-looking callout */}
        <Reveal
          threshold={0.5}
          className="rounded-xl p-7 max-w-3xl"
          style={{ background: '#1E1E35', borderLeft: '3px solid #7B5CF5' }}
        >
          <div className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
            {t('futureLabel')}
          </div>
          <h3 className="text-lg font-bold mb-3"
            style={{ fontFamily: 'var(--font-ibm)', color: '#ffffff' }}>
            {t('futureHeadline')}
          </h3>
          <p className="text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            {t('futureBody')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
