'use client';

import { useTranslations } from 'next-intl';
import { RegulationSweeper } from '@/components/game/RegulationSweeper';
import { Problem } from '@/components/sections/Problem';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Benefits } from '@/components/sections/Benefits';
import { Regulations } from '@/components/sections/Regulations';
import { Security } from '@/components/sections/Security';
import { CTA } from '@/components/sections/CTA';

const EASE = 'cubic-bezier(0.16,1,0.3,1)'

// ─── Custom hero that is transparent so the game shows through ────────────────
// pointer-events: none on the section lets clicks pass through to game cells.
// Interactive elements (buttons) explicitly restore pointer-events.

function GameHero() {
  const t = useTranslations('Hero');
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        pointerEvents: 'none',
      }}
    >
      {/* Subtle purple bloom gradient that sits over the game cells */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 90% 60% at 5% 110%, rgba(123,92,245,0.20) 0%, transparent 55%), ' +
            'radial-gradient(ellipse 50% 40% at 95% 0%, rgba(123,92,245,0.06) 0%, transparent 50%)',
        }}
      />

      {/* Main content — vertically centred */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '0 auto',
          maxWidth: '80rem',
          width: '100%',
          padding: '96px 32px 48px',
        }}
      >
        <div data-no-sweep="" style={{ maxWidth: '64rem' }}>
        <div style={{ animation: `fade-in-up 0.75s ${EASE} both` }}>
          {/* Eyebrow */}
          <div
            style={{
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: `slide-in-left 0.5s ${EASE} 0.1s both`,
            }}
          >
            <div style={{ height: '1px', width: '40px', background: '#7B5CF5' }} />
            <span style={{
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#7B5CF5', fontFamily: 'var(--font-ibm)',
            }}>
              {t('eyebrow')}
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: 'clamp(52px, 7vw, 92px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '32px',
              animation: `fade-in-up 0.7s ${EASE} 0.2s both`,
            }}
          >
            <span style={{ color: '#ffffff' }}>{t('headline1')}</span>
            <br />
            <span style={{ color: '#7B5CF5' }}>{t('headline2')}</span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: 'clamp(17px, 2.2vw, 22px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.62)',
              lineHeight: 1.65,
              maxWidth: '40rem',
              marginBottom: '40px',
              animation: `fade-in-up 0.6s ${EASE} 0.38s both`,
            }}
          >
            {t('gameSubheadline')}
          </p>

          {/* CTA — re-enable pointer events only here */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              pointerEvents: 'auto',
              animation: `fade-in-up 0.5s ${EASE} 0.52s both`,
            }}
          >
            <button
              onClick={scrollToContact}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#ffffff',
                background: '#7B5CF5',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-ibm)',
                boxShadow: '0 0 32px rgba(123,92,245,0.38)',
                transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#6d4ee0';
                e.currentTarget.style.boxShadow = '0 0 48px rgba(123,92,245,0.55)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#7B5CF5';
                e.currentTarget.style.boxShadow = '0 0 32px rgba(123,92,245,0.38)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {t('cta')}
            </button>
          </div>

          {/* Game hint */}
          <p
            style={{
              marginTop: '28px',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.28)',
              fontFamily: 'var(--font-ibm)',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: `fade-in 0.6s ease 1.6s both`,
            }}
          >
            <span style={{ color: '#7B5CF5', opacity: 0.6 }}>↖</span>
            {t('gameHint')}
          </p>
        </div>
        </div>
      </div>

      {/* Trust strip — pinned to bottom of viewport */}
      <div
        style={{
          position: 'relative',
          borderTop: '1px solid rgba(123,92,245,0.12)',
          background: 'rgba(10,10,18,0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: `fade-in 0.6s ease 0.9s both`,
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '24px 32px' }}>
          <p style={{
            textAlign: 'center',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.3)',
            fontFamily: 'var(--font-ibm)',
            letterSpacing: '0.04em',
            marginBottom: '12px',
          }}>
            {t('trustStrip')}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {['TUM', 'UnternehmerTUM', 'XPLORE'].map(name => (
              <span
                key={name}
                style={{
                  fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.18)',
                  fontFamily: 'var(--font-ibm)',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RegulationSweeperPage() {
  return (
    <>
      {/* Fixed minesweeper background — always behind everything */}
      <RegulationSweeper />

      {/* Scrollable page content — z-index 10 sits above the game.
          pointer-events: none on the wrapper lets clicks reach game cells through
          the transparent hero. Each section explicitly restores pointer-events. */}
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <GameHero />

        <div style={{ pointerEvents: 'auto' }}>
          <Problem />
          <HowItWorks />
          <Benefits />
          <Regulations />
          <Security />
          <CTA />
        </div>
      </div>
    </>
  );
}
