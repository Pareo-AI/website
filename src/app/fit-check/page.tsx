'use client';

import Link from 'next/link';
import posthog from 'posthog-js';
import { useEffect, useRef, useState } from 'react';
import { useCookieConsent } from '@/components/CookieConsent';
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import { TurnstileWidget } from '@/components/TurnstileWidget';

const EASE = 'cubic-bezier(0.16,1,0.3,1)'

const CATEGORIES = [
  {
    id: 'process',
    label: 'Response Process',
    items: [
      {
        id: 'p1',
        text: 'We regularly receive product compliance requests from customers — e.g. material declarations, substance restriction confirmations, or supplier declarations.',
      },
      {
        id: 'p2',
        text: 'These requests are handled mostly manually today: searching ERP systems, shared drives, or emailing internal teams.',
      },
      {
        id: 'p3',
        text: 'Our staff regularly transfer data into customer portals (e.g. Assent, CDX, BOMcheck) or fill out individual PDF/Excel templates.',
      },
      {
        id: 'p4',
        text: 'There are employees whose working time is significantly consumed by answering compliance requests.',
      },
    ],
  },
  {
    id: 'data',
    label: 'Data Landscape',
    items: [
      {
        id: 'd1',
        text: 'Our product-related compliance data is scattered across multiple systems — with no central, structured repository.',
      },
      {
        id: 'd2',
        text: 'When new regulations come into force, we struggle to quickly determine which products are affected.',
      },
      {
        id: 'd3',
        text: 'For certain products or components, we are missing supplier documentation that we repeatedly have to re-request.',
      },
    ],
  },
  {
    id: 'outlook',
    label: 'Regulatory Outlook',
    items: [
      {
        id: 'o1',
        text: 'As a Tier-1/2/3 supplier, we already face structured data requirements from OEMs that go beyond standard declarations of conformity.',
      },
      {
        id: 'o2',
        text: 'We are looking at the Digital Product Passport (DPP) or Manufacturing-X but have no concrete implementation strategy yet.',
      },
      {
        id: 'o3',
        text: 'We expect the volume or depth of compliance requests to increase over the next 1–3 years.',
      },
    ],
  },
];

const ALL_ITEMS = CATEGORIES.flatMap(c => c.items);

export default function FitCheckPage() {
  const consent = useCookieConsent();
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const formRef = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);

  const score = checked.size;

  function track(event: string, props?: Record<string, unknown>) {
    if (consent === 'accepted') posthog.capture(event, props);
  }

  useEffect(() => {
    track('fit_check_page_viewed');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consent]);

  function toggle(id: string, category: string) {
    setChecked(prev => {
      const next = new Set(prev);
      const nowChecked = !next.has(id);
      nowChecked ? next.add(id) : next.delete(id);

      track('fit_check_item_toggled', {
        item_id: id,
        category,
        checked: nowChecked,
        total_checked: next.size,
      });

      // Scroll to the form once after 3 checks
      if (next.size === 3 && !hasScrolled.current) {
        hasScrolled.current = true;
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
      }

      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/fit-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, gdprConsent, score, turnstileToken }),
      });

      if (!res.ok) throw new Error();

      setStatus('success');
      track('fit_check_submitted', { score });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div style={{ background: '#0A0A12', minHeight: '100vh' }}>
      {/* Purple bloom */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 100% 0%, rgba(123,92,245,0.1) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 0% 100%, rgba(123,92,245,0.06) 0%, transparent 55%)',
          zIndex: 0,
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8 py-20 lg:py-28" style={{ zIndex: 1 }}>
        {/* Header */}
        <div
          className="mb-14"
          style={{ animation: `fade-in-up 0.5s ${EASE} both` }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: '#7B5CF5' }} />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
            >
              Self-assessment
            </span>
          </div>
          <h1
            className="mb-4 leading-tight"
            style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              fontWeight: 800,
              color: '#ffffff',
            }}
          >
            Is Pareo a fit <span style={{ color: '#7B5CF5' }}>for your team?</span>
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'var(--font-ibm)',
              fontWeight: 300,
              maxWidth: '560px',
            }}
          >
            Select all the statements that apply to your company. We'll reach out with a
            personalised view of how Pareo could help.
          </p>
        </div>

        {/* Score bar */}
        <div
          className="mb-10 flex items-center gap-4"
          style={{ animation: `fade-in 0.5s ${EASE} 0.2s both` }}
        >
          <div
            className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                background: '#7B5CF5',
                width: `${(score / ALL_ITEMS.length) * 100}%`,
                transition: `width 0.4s ${EASE}`,
              }}
            />
          </div>
          <span
            className="text-sm font-semibold tabular-nums shrink-0"
            style={{
              color: score > 0 ? '#7B5CF5' : 'rgba(255,255,255,0.3)',
              fontFamily: 'var(--font-ibm)',
            }}
          >
            {score} / {ALL_ITEMS.length}
          </span>
        </div>

        {/* Checklist */}
        <div className="space-y-10 mb-16">
          {CATEGORIES.map((cat, ci) => (
            <div
              key={cat.id}
              style={{ animation: `fade-in-up 0.5s ${EASE} ${0.15 + ci * 0.08}s both` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-ibm)' }}
                >
                  {cat.label}
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>
              <div className="space-y-3">
                {cat.items.map(item => {
                  const isChecked = checked.has(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggle(item.id, cat.id)}
                      className="w-full flex items-start gap-3 rounded-xl p-4 text-left transition-all active:scale-[0.99]"
                      style={{
                        background: isChecked ? 'rgba(123,92,245,0.12)' : '#16162A',
                        border: `1px solid ${isChecked ? 'rgba(123,92,245,0.4)' : 'rgba(123,92,245,0.1)'}`,
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        className="mt-0.5 w-4 h-4 rounded shrink-0 flex items-center justify-center transition-all"
                        style={{
                          background: isChecked ? '#7B5CF5' : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${isChecked ? '#7B5CF5' : 'rgba(123,92,245,0.25)'}`,
                        }}
                      >
                        {isChecked && (
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
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: isChecked ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
                          fontFamily: 'var(--font-ibm)',
                          fontWeight: 300,
                          transition: 'color 0.15s',
                        }}
                      >
                        {item.text}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Email gate */}
        <div
          ref={formRef}
          style={{ animation: `fade-in-up 0.5s ${EASE} 0.4s both` }}
        >
          <div
            className="rounded-2xl p-8 lg:p-10"
            style={{
              background: '#16162A',
              border: '1px solid rgba(123,92,245,0.15)',
            }}
          >
            {status === 'success' ? (
              <div
                className="text-center py-4"
                style={{ animation: `scale-sm-in 0.4s ${EASE} both` }}
              >
                <div
                  className="mx-auto mb-6 flex items-center justify-center rounded-full"
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'rgba(123,92,245,0.15)',
                    border: '1px solid rgba(123,92,245,0.3)',
                  }}
                >
                  <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
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
                  We'll be in touch.
                </h2>
                <p
                  className="mb-8 text-sm leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: 'var(--font-ibm)',
                    fontWeight: 300,
                  }}
                >
                  {score > 0
                    ? `You matched ${score} of ${ALL_ITEMS.length} — that's a strong signal. Expect a message within one business day.`
                    : 'Expect a message within one business day.'}
                </p>
                <Link
                  href="/"
                  className="text-xs"
                  style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}
                >
                  ← Back to pareo.ai
                </Link>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <p
                    className="text-lg font-semibold mb-1"
                    style={{ fontFamily: 'var(--font-ibm)', color: '#ffffff' }}
                  >
                    {score >= 3
                      ? `${score} of ${ALL_ITEMS.length} apply — let's talk.`
                      : 'Talk to us.'}
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'var(--font-ibm)',
                      fontWeight: 300,
                    }}
                  >
                    Leave your email and we'll reach out within one business day. No commitment,
                    no pitch deck.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="fc-email"
                        className="block text-xs font-medium mb-2"
                        style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}
                      >
                        Work email
                      </label>
                      <input
                        id="fc-email"
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
                        onFocus={e =>
                          (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.5)')
                        }
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.2)')}
                      />
                    </div>
                    <div className="sm:flex sm:items-end">
                      <button
                        type="submit"
                        disabled={status === 'loading' || !gdprConsent || !turnstileToken}
                        className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all"
                        style={{
                          background:
                            !gdprConsent || status === 'loading' || !turnstileToken
                              ? 'rgba(123,92,245,0.4)'
                              : '#7B5CF5',
                          fontFamily: 'var(--font-ibm)',
                          cursor:
                            !gdprConsent || status === 'loading' || !turnstileToken ? 'not-allowed' : 'pointer',
                        }}
                        onMouseEnter={e => {
                          if (gdprConsent && status !== 'loading' && turnstileToken)
                            e.currentTarget.style.background = '#6d4ee0';
                        }}
                        onMouseLeave={e => {
                          if (gdprConsent && status !== 'loading' && turnstileToken)
                            e.currentTarget.style.background = '#7B5CF5';
                        }}
                      >
                        {status === 'loading' ? 'Sending…' : 'Request a call →'}
                      </button>
                    </div>
                  </div>

                  <TurnstileWidget
                    onVerify={setTurnstileToken}
                    onExpire={() => setTurnstileToken('')}
                  />

                  {/* GDPR */}
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
                        className="w-4 h-4 rounded flex items-center justify-center transition-all"
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
                      style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: 'var(--font-ibm)',
                        fontWeight: 300,
                      }}
                    >
                      I agree that Pareo may use my details to contact me about compliance
                      automation.{' '}
                      <Link
                        href="/privacy"
                        target="_blank"
                        className="underline"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                        onClick={e => e.stopPropagation()}
                      >
                        Privacy policy
                      </Link>
                    </span>
                  </label>

                  {status === 'error' && (
                    <p
                      className="text-xs"
                      style={{ color: '#f87171', fontFamily: 'var(--font-ibm)' }}
                    >
                      Something went wrong. Please try again or email us at{' '}
                      <ObfuscatedEmail
                        encoded="QmpvZXJuQHBhcmVvLmFp"
                        style={{ color: '#f87171', textDecoration: 'underline' }}
                      />
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
