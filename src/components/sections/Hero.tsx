'use client'

import { useTranslations } from 'next-intl'

const EASE = 'cubic-bezier(0.16,1,0.3,1)'

export function Hero() {
  const t = useTranslations('Hero')

  const handleDemoClick = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{ background: '#0A0A12' }}
    >
      {/* Purple gradient bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 5% 110%, rgba(123, 92, 245, 0.22) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 95% 0%, rgba(123, 92, 245, 0.07) 0%, transparent 50%)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(123,92,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(123,92,245,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <div className="relative flex-1 flex flex-col justify-center mx-auto max-w-7xl w-full px-6 lg:px-8 pt-24 pb-12">
        <div
          className="max-w-5xl"
          style={{ animation: `fade-in-up 0.75s ${EASE} both` }}
        >
          {/* Eyebrow */}
          <div
            className="mb-8 flex items-center gap-3"
            style={{ animation: `slide-in-left 0.5s ${EASE} 0.1s both` }}
          >
            <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
            >
              {t('eyebrow')}
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="mb-8 leading-[1.05] tracking-tight"
            style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: 'clamp(52px, 7vw, 92px)',
              fontWeight: 800,
              animation: `fade-in-up 0.7s ${EASE} 0.2s both`,
            }}
          >
            <span style={{ color: '#ffffff' }}>{t('headline1')}</span>
            <br />
            <span style={{ color: '#7B5CF5' }}>{t('headline2')}</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mb-10 max-w-2xl leading-relaxed"
            style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: 'clamp(17px, 2.2vw, 22px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.62)',
              animation: `fade-in-up 0.6s ${EASE} 0.38s both`,
            }}
          >
            {t('subheadline')}
          </p>

          {/* CTA */}
          <div style={{ animation: `fade-in-up 0.5s ${EASE} 0.52s both` }}>
            <button
              onClick={handleDemoClick}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold text-white transition-all duration-200"
              style={{
                background: '#7B5CF5',
                fontFamily: 'var(--font-ibm)',
                boxShadow: '0 0 32px rgba(123, 92, 245, 0.35)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#6d4ee0'
                e.currentTarget.style.boxShadow = '0 0 48px rgba(123, 92, 245, 0.5)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#7B5CF5'
                e.currentTarget.style.boxShadow = '0 0 32px rgba(123, 92, 245, 0.35)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {t('cta')}
            </button>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div
        className="relative border-t"
        style={{
          borderColor: 'rgba(123, 92, 245, 0.12)',
          animation: 'fade-in 0.6s ease 0.9s both',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <p
            className="text-center text-xs mb-4"
            style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-ibm)', letterSpacing: '0.04em' }}
          >
            {t('trustStrip')}
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {['TUM', 'UnternehmerTUM', 'XPLORE'].map((name) => (
              <span
                key={name}
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-ibm)' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
