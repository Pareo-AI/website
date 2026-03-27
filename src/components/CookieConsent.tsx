'use client';

import Link from 'next/link';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

type ConsentStatus = 'pending' | 'accepted' | 'declined';

const CookieConsentContext = createContext<ConsentStatus>('pending');

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentStatus>('pending');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent');
    if (stored === 'accepted' || stored === 'declined') {
      setConsent(stored);
    }
    setMounted(true);
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted');
    setConsent('accepted');
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined');
    setConsent('declined');
  }

  return (
    <CookieConsentContext.Provider value={consent}>
      {children}
      {mounted && consent === 'pending' && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 border-t"
          style={{
            background: '#0A0A12',
            borderColor: 'rgba(123,92,245,0.2)',
            fontFamily: 'var(--font-ibm)',
          }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '640px' }}>
              We use analytics cookies (PostHog) to understand how visitors use this site. Your data
              is processed in the EU.{' '}
              <Link
                href="/cookies"
                className="underline"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                Cookie Policy
              </Link>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={decline}
                className="text-sm px-4 py-2 rounded-md transition-colors"
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="text-sm px-4 py-2 rounded-md transition-colors font-medium"
                style={{
                  background: '#7B5CF5',
                  color: '#ffffff',
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
}
