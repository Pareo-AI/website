'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init('REDACTED', {
      api_host: 'https://eu.i.posthog.com',
      defaults: '2026-01-30',
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
