'use client'

import { Turnstile } from '@marsidev/react-turnstile'

interface Props {
  onVerify: (token: string) => void
  onExpire?: () => void
  theme?: 'light' | 'dark' | 'auto'
}

export function TurnstileWidget({ onVerify, onExpire, theme = 'dark' }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={onVerify}
      onExpire={onExpire}
      options={{ theme }}
    />
  )
}
