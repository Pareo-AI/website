'use client'

import { useEffect, useState } from 'react'

interface Props {
  encoded: string
  children: React.ReactNode
  className?: string
  'aria-label'?: string
}

/**
 * Renders an <a> whose href is decoded client-side from a base64 string.
 * The server-rendered HTML has an empty href, so bots cannot harvest
 * mailto: or tel: links from the page source.
 */
export function ObfuscatedLink({ encoded, children, className, ...props }: Props) {
  const [href, setHref] = useState('')

  useEffect(() => {
    setHref(atob(encoded))
  }, [encoded])

  return (
    <a href={href || undefined} className={className} {...props}>
      {children}
    </a>
  )
}
