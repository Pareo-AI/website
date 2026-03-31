'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { Suspense, useEffect } from 'react';
import { useCookieConsent } from './CookieConsent';

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const client = usePostHog();

  useEffect(() => {
    if (pathname && client) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) url += `?${search}`;
      client.capture('$pageview', { $current_url: url });
    }
  }, [pathname, searchParams, client]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const consent = useCookieConsent();

  useEffect(() => {
    if (consent === 'accepted') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: 'https://eu.i.posthog.com',
        defaults: '2026-01-30',
        autocapture: false,
        capture_pageview: false,
        disable_session_recording: true,
      });
    }
  }, [consent]);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
