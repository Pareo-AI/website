'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
import { useCookieConsent } from '@/components/CookieConsent';

type Status = 'idle' | 'loading' | 'success' | 'error';

const bullets = [
  'AI agents retrieve data from ERP and PLM — no manual copy-paste',
  'Audit-ready responses written directly into OEM portals like Assent',
  'Every compliance interaction builds a Manufacturing-X-compatible product data layer',
];

export default function ChecklistPage() {
  const consent = useCookieConsent();
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

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
        body: JSON.stringify({ email, gdprConsent: true }),
      });

      if (response.ok) {
        setStatus('success');
        if (consent === 'accepted') {
          posthog.capture('pitch_deck_requested', { source: 'checklist_page' });
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
      {/* Subtle purple bloom */}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8" style={{ background: '#7B5CF5' }} />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
              >
                Pitch Deck
              </span>
            </div>

            {/* Headline */}
            <h1
              className="mb-6 leading-tight"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 800,
                color: '#ffffff',
              }}
            >
              Compliance Automation.{' '}
              <span style={{ color: '#7B5CF5' }}>Industrial Data Infrastructure.</span>
            </h1>

            {/* Subline */}
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
              Industrial suppliers handle thousands of product compliance requests per year — REACH,
              RoHS, PFAS, TSCA, CSRD — each answered manually, often from scratch, every time. Pareo
              automates this. And every compliance interaction doesn&apos;t just save time: it
              builds the machine-readable product data layer that powers Digital Product Passport
              readiness, Factory-X participation, and every OEM mandate that follows.
            </p>

            {/* Bullet list */}
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
                    {/* Checkmark SVG */}
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                      <path
                        d="M1 4L4 7L10 1"
                        stroke="#7B5CF5"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    className="text-sm leading-snug"
                    style={{
                      color: 'rgba(255,255,255,0.75)',
                      fontFamily: 'var(--font-ibm)',
                      fontWeight: 400,
                    }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Trust note */}
            <p
              className="text-xs flex items-center gap-2"
              style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-ibm)' }}
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                <path
                  d="M6 1L1 3.5V7C1 9.76 3.24 12.36 6 13C8.76 12.36 11 9.76 11 7V3.5L6 1Z"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
              Sent to your inbox immediately. No sales calls.
            </p>
          </motion.div>

          {/* ── Right: email gate card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-lg"
          >
            <div
              className="rounded-2xl p-8 lg:p-10"
              style={{
                background: '#16162A',
                border: '1px solid rgba(123,92,245,0.15)',
              }}
            >
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center py-6"
                >
                  {/* Checkmark icon */}
                  <div
                    className="mx-auto mb-6 flex items-center justify-center rounded-full"
                    style={{
                      width: '64px',
                      height: '64px',
                      background: 'rgba(123,92,245,0.15)',
                      border: '1px solid rgba(123,92,245,0.3)',
                    }}
                  >
                    <svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true">
                      <path
                        d="M2 11L10 19L26 3"
                        stroke="#7B5CF5"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h2
                    className="mb-3 text-2xl font-bold"
                    style={{ fontFamily: 'var(--font-ibm)', color: '#ffffff' }}
                  >
                    Check your inbox.
                  </h2>
                  <p
                    className="mb-8 text-sm leading-relaxed"
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontFamily: 'var(--font-ibm)',
                      fontWeight: 300,
                    }}
                  >
                    We&apos;ve sent the pitch deck to{' '}
                    <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                      {email}
                    </strong>
                    . If you don&apos;t see it, check your spam folder.
                  </p>
                  <Link
                    href="/"
                    className="text-xs"
                    style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}
                  >
                    ← Back to pareo.ai
                  </Link>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p
                      className="text-lg font-semibold mb-1"
                      style={{ fontFamily: 'var(--font-ibm)', color: '#ffffff' }}
                    >
                      Access the pitch deck
                    </p>
                    <p
                      className="text-xs"
                      style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: 'var(--font-ibm)',
                        fontWeight: 300,
                      }}
                    >
                      Enter your work email and we&apos;ll send the deck right away.
                    </p>
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium mb-2"
                      style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}
                    >
                      Work email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="jan@company.com"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(123,92,245,0.2)',
                        color: '#ffffff',
                        fontFamily: 'var(--font-ibm)',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.2)')}
                    />
                  </div>

                  {/* GDPR checkbox */}
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0 mt-0.5">
                      <input
                        id="gdpr"
                        type="checkbox"
                        required
                        checked={gdprConsent}
                        onChange={e => setGdprConsent(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        onClick={() => setGdprConsent(v => !v)}
                        role="checkbox"
                        aria-checked={gdprConsent}
                        tabIndex={0}
                        onKeyDown={e => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            setGdprConsent(v => !v);
                          }
                        }}
                        className="flex items-center justify-center rounded cursor-pointer transition-all"
                        style={{
                          width: '18px',
                          height: '18px',
                          background: gdprConsent ? '#7B5CF5' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${gdprConsent ? '#7B5CF5' : 'rgba(123,92,245,0.3)'}`,
                        }}
                      >
                        {gdprConsent && (
                          <svg
                            width="10"
                            height="7"
                            viewBox="0 0 10 7"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M1 3.5L3.5 6L9 1"
                              stroke="#ffffff"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <label
                      htmlFor="gdpr"
                      className="text-xs leading-snug cursor-pointer"
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontFamily: 'var(--font-ibm)',
                        fontWeight: 300,
                      }}
                      onClick={() => setGdprConsent(v => !v)}
                    >
                      I agree that Pareo may use my email to send me this pitch deck and relevant
                      updates.{' '}
                      <Link
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                        style={{ color: 'rgba(255,255,255,0.65)' }}
                        onClick={e => e.stopPropagation()}
                      >
                        privacy policy
                      </Link>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading' || !gdprConsent}
                    className="w-full py-3.5 rounded-lg text-sm font-semibold text-white transition-all"
                    style={{
                      background:
                        status === 'loading' || !gdprConsent ? 'rgba(123,92,245,0.45)' : '#7B5CF5',
                      fontFamily: 'var(--font-ibm)',
                      cursor: status === 'loading' || !gdprConsent ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={e => {
                      if (status !== 'loading' && gdprConsent) {
                        e.currentTarget.style.background = '#6d4ee0';
                      }
                    }}
                    onMouseLeave={e => {
                      if (status !== 'loading' && gdprConsent) {
                        e.currentTarget.style.background = '#7B5CF5';
                      }
                    }}
                  >
                    {status === 'loading' ? 'Sending…' : 'Access Pitch Deck →'}
                  </button>

                  {/* Error message */}
                  {status === 'error' && (
                    <p
                      className="text-xs text-center"
                      style={{ color: '#f87171', fontFamily: 'var(--font-ibm)' }}
                    >
                      Something went wrong. Please try again or email us at{' '}
                      <a
                        href="mailto:Bjoern@pareo.ai"
                        style={{ color: '#f87171', textDecoration: 'underline' }}
                      >
                        Bjoern@pareo.ai
                      </a>
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
