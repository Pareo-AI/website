'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import posthog from 'posthog-js';
import { useState } from 'react';
import { useCookieConsent } from './CookieConsent';

interface EmailWallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  score: number;
}

export function EmailWallModal({ open, onOpenChange, score }: EmailWallModalProps) {
  const consent = useCookieConsent();
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function track(event: string, props?: Record<string, unknown>) {
    if (consent === 'accepted') {
      posthog.capture(event, props);
    }
  }

  function handleOpenChange(next: boolean) {
    if (!next && status !== 'success') {
      track('match_check_modal_dismissed', { score });
    }
    onOpenChange(next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, gdprConsent, score }),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus('success');
      track('match_check_modal_submitted', { score });
    } catch {
      setStatus('error');
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
        />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl p-8 outline-none"
          style={{
            background: '#16162A',
            border: '1px solid rgba(123,92,245,0.25)',
            fontFamily: 'var(--font-ibm)',
          }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5 text-xl"
                  style={{
                    background: 'rgba(123,92,245,0.15)',
                    border: '1px solid rgba(123,92,245,0.3)',
                  }}
                >
                  ✓
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>
                  Wir melden uns.
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>
                  Innerhalb eines Werktages erhalten Sie eine Nachricht von uns.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="text-xs font-semibold tracking-[0.2em] uppercase"
                        style={{ color: '#7B5CF5' }}
                      >
                        {score} / 10 Aussagen treffen zu
                      </div>
                    </div>
                    <Dialog.Title
                      className="text-xl font-bold leading-snug"
                      style={{ color: '#ffffff' }}
                    >
                      Klingt vertraut?
                    </Dialog.Title>
                    <Dialog.Description
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}
                    >
                      Das ist ein klares Signal. Lassen Sie uns 20 Minuten sprechen — unverbindlich,
                      ohne Pitch-Deck.
                    </Dialog.Description>
                  </div>
                  <Dialog.Close
                    className="ml-4 shrink-0 rounded-md p-1.5 transition-colors"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                    aria-label="Schließen"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2 2L14 14M14 2L2 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Dialog.Close>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="ew-email"
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      Work-E-Mail
                    </label>
                    <input
                      id="ew-email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="jan@unternehmen.de"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(123,92,245,0.2)',
                        color: '#ffffff',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.2)')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ew-company"
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      Unternehmen
                    </label>
                    <input
                      id="ew-company"
                      type="text"
                      required
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      placeholder="Muster GmbH"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(123,92,245,0.2)',
                        color: '#ffffff',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.2)')}
                    />
                  </div>

                  {/* GDPR consent */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        required
                        checked={gdprConsent}
                        onChange={e => setGdprConsent(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center transition-colors"
                        style={{
                          background: gdprConsent ? '#7B5CF5' : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${gdprConsent ? '#7B5CF5' : 'rgba(123,92,245,0.3)'}`,
                        }}
                        onClick={() => setGdprConsent(v => !v)}
                      >
                        {gdprConsent && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}
                    >
                      Ich stimme zu, dass Pareo meine Angaben verwendet, um mich zum Thema
                      Compliance-Automatisierung zu kontaktieren.{' '}
                      <Link
                        href="/privacy"
                        target="_blank"
                        className="underline"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        Datenschutzhinweis
                      </Link>
                    </span>
                  </label>

                  {status === 'error' && (
                    <p className="text-xs" style={{ color: '#f87171' }}>
                      Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns
                      direkt.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading' || !gdprConsent}
                    className="w-full py-3.5 rounded-lg text-sm font-semibold text-white transition-all mt-2"
                    style={{
                      background:
                        !gdprConsent || status === 'loading' ? 'rgba(123,92,245,0.4)' : '#7B5CF5',
                      cursor: !gdprConsent ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={e => {
                      if (gdprConsent && status !== 'loading')
                        e.currentTarget.style.background = '#6d4ee0';
                    }}
                    onMouseLeave={e => {
                      if (gdprConsent && status !== 'loading')
                        e.currentTarget.style.background = '#7B5CF5';
                    }}
                  >
                    {status === 'loading' ? 'Wird gesendet…' : 'Gespräch anfragen'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
