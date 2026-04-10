'use client'

import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/Reveal'

const badgeIcons = ['🇩🇪', '🔒', '🚫', '🏗️']

export function Security() {
  const t = useTranslations('Security')

  const badges = badgeIcons.map((icon, i) => ({
    icon,
    label: t(`badges.${i}.label`),
    detail: t(`badges.${i}.detail`),
  }))

  return (
    <section
      id="security"
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
          <p className="text-base"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            {t('subheadline')}
          </p>
        </div>

        {/* Badge cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              threshold={0.4}
              className="flex flex-col items-start p-6 rounded-xl"
              style={{ background: '#16162A', border: '1px solid rgba(123,92,245,0.15)' }}
            >
              <div className="text-3xl mb-4">{badge.icon}</div>
              <div className="text-sm font-bold mb-2"
                style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}>
                {badge.label}
              </div>
              <p className="text-xs leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                {badge.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
