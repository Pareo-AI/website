'use client';

import Link from 'next/link';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCookieConsent } from '@/components/CookieConsent';
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import { TurnstileWidget } from '@/components/TurnstileWidget';

const EASE = 'cubic-bezier(0.16,1,0.3,1)'

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function PitchDeckPage() {
  const t = useTranslations('PitchDeck');
  const consent = useCookieConsent();
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');

  const bullets = [t('bullets.0'), t('bullets.1'), t('bullets.2')];

  useEffect(() => {
    if (consent === 'accepted') {
      posthog.capture('pitch_deck_page_viewed');
    }
  }, [consent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-resource', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, gdprConsent: true, turnstileToken }),
      });

      if (response.ok) {
        setStatus('success');
        if (consent === 'accepted') {
          posthog.capture('pitch_deck_requested', { source: 'pitch_deck_page' });
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ background: '#0A0A12', minHeight: '100vh' }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 0% 0%, rgba(123,92,245,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(123,92,245,0.07) 0%, transparent 55%)',
          zIndex: 0,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-32" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: value prop ── */}
          <div style={{ animation: `fade-in-up 0.5s ${EASE} both` }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8" style={{ background: '#7B5CF5' }} />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
              >
                {t('eyebrow')}
              </span>
            </div>

            <h1
              className="mb-6 leading-tight"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 800,
                color: '#ffffff',
              }}
            >
              {t('headline1')}{' '}
              <span style={{ color: '#7B5CF5' }}>{t('headline2')}</span>
            </h1>

            <p
              className="mb-10 leading-relaxed"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontSize: 'clamp(16px, 1.8vw, 19px)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '520px',
              }}
            >
              {t('subline')}
            </p>

            <ul className="space-y-4 mb-10">
              {bullets.map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div
                    className="shrink-0 flex items-center justify-center rounded-full mt-0.5"
                    style={{
                      width: '22px',
                      height: '22px',
                      background: 'rgba(123,92,245,0.15)',
                      border: '1px solid rgba(123,92,245,0.35)',
                    }}
                  >
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                      <path d="M1 4L4 7L10 1" stroke="#7B5CF5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span
                    className="text-sm leading-snug"
                    style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-ibm)', fontWeight: 400 }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <p
              className="text-xs flex items-center gap-2"
              style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-ibm)' }}
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                <path d="M6 1L1 3.5V7C1 9.76 3.24 12.36 6 13C8.76 12.36 11 9.76 11 7V3.5L6 1Z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              {t('trustNote')}
            </p>
          </div>

          {/* ── Right: email gate card ── */}
          <div
            className="mx-auto w-full max-w-lg"
            style={{ animation: `fade-in-up 0.5s ${EASE} 0.1s both` }}
          >
            <div
              className="rounded-2xl p-8 lg:p-10"
              style={{ background: '#16162A', border: '1px solid rgba(123,92,245,0.15)' }}
            >
              {status === 'success' ? (
                <div className="text-center py-6" style={{ animation: `scale-sm-in 0.4s ${EASE} both` }}>
                  <div
                    className="mx-auto mb-6 flex items-center justify-center rounded-full"
                    style={{ width: '64px', height: '64px', background: 'rgba(123,92,245,0.15)', border: '1px solid rgba(123,92,245,0.3)' }}
                  >
                    <svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true">
                      <path d="M2 11L10 19L26 3" stroke="#7B5CF5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <h2 className="mb-3 text-2xl font-bold" style={{ fontFamily: 'var(--font-ibm)', color: '#ffffff' }}>
                    {t('success.title')}
                  </h2>
                  <p
                    className="mb-8 text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
                  >
                    {t('success.body', { email })}
                  </p>
                  <Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}>
                    {t('success.backLink')}
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p className="text-lg font-semibold mb-1" style={{ fontFamily: 'var(--font-ibm)', color: '#ffffff' }}>
                      {t('form.title')}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                      {t('form.subtitle')}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}>
                      {t('form.emailLabel')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder={t('form.emailPlaceholder')}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(123,92,245,0.2)', color: '#ffffff', fontFamily: 'var(--font-ibm)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.2)')}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0 mt-0.5">
                      <input id="gdpr" type="checkbox" required checked={gdprConsent} onChange={e => setGdprConsent(e.target.checked)} className="sr-only" />
                      <div
                        onClick={() => setGdprConsent(v => !v)}
                        role="checkbox"
                        aria-checked={gdprConsent}
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setGdprConsent(v => !v); } }}
                        className="flex items-center justify-center rounded cursor-pointer transition-all"
                        style={{ width: '18px', height: '18px', background: gdprConsent ? '#7B5CF5' : 'rgba(255,255,255,0.04)', border: `1px solid ${gdprConsent ? '#7B5CF5' : 'rgba(123,92,245,0.3)'}` }}
                      >
                        {gdprConsent && (
                          <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden="true">
                            <path d="M1 3.5L3.5 6L9 1" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <label
                      htmlFor="gdpr"
                      className="text-xs leading-snug cursor-pointer"
                      style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
                      onClick={() => setGdprConsent(v => !v)}
                    >
                      {t('form.gdprLabel')}{' '}
                      <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'rgba(255,255,255,0.65)' }} onClick={e => e.stopPropagation()}>
                        {t('form.gdprPrivacyLink')}
                      </Link>
                    </label>
                  </div>

                  <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken('')} />

                  <button
                    type="submit"
                    disabled={status === 'loading' || !gdprConsent || !turnstileToken}
                    className="w-full py-3.5 rounded-lg text-sm font-semibold text-white transition-all"
                    style={{
                      background: status === 'loading' || !gdprConsent || !turnstileToken ? 'rgba(123,92,245,0.45)' : '#7B5CF5',
                      fontFamily: 'var(--font-ibm)',
                      cursor: status === 'loading' || !gdprConsent || !turnstileToken ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={e => { if (status !== 'loading' && gdprConsent && turnstileToken) e.currentTarget.style.background = '#6d4ee0'; }}
                    onMouseLeave={e => { if (status !== 'loading' && gdprConsent && turnstileToken) e.currentTarget.style.background = '#7B5CF5'; }}
                  >
                    {status === 'loading' ? t('form.submitting') : t('form.submit')}
                  </button>

                  {status === 'error' && (
                    <p className="text-xs text-center" style={{ color: '#f87171', fontFamily: 'var(--font-ibm)' }}>
                      {t('form.error')}{' '}
                      <ObfuscatedEmail encoded="QmpvZXJuQHBhcmVvLmFp" style={{ color: '#f87171', textDecoration: 'underline' }} />
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
