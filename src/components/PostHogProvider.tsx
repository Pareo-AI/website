'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import { useCookieConsent } from './CookieConsent';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const consent = useCookieConsent();

  useEffect(() => {
    if (consent === 'accepted') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: 'https://eu.i.posthog.com',
        defaults: '2026-01-30',
      });
    }
  }, [consent]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
