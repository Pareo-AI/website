'use client'

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'

type Variant = 'up' | 'fade' | 'left' | 'scale'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Delay in ms before the reveal transition starts */
  delay?: number
  /** Animation direction/type */
  variant?: Variant
  /** IntersectionObserver threshold (0–1) */
  threshold?: number
}

const EASE = 'cubic-bezier(0.16,1,0.3,1)'

const hiddenTransform: Record<Variant, string> = {
  up:    'translateY(20px)',
  fade:  'none',
  left:  'translateX(-16px)',
  scale: 'scale(0.85)',
}

const transitionProp: Record<Variant, string> = {
  up:    `opacity 0.6s ${EASE}, transform 0.6s ${EASE}`,
  fade:  `opacity 0.6s ${EASE}`,
  left:  `opacity 0.5s ${EASE}, transform 0.5s ${EASE}`,
  scale: `opacity 0.3s ease, transform 0.3s ease`,
}

export function Reveal({
  children,
  className,
  style,
  delay = 0,
  variant = 'up',
  threshold = 0.2,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : hiddenTransform[variant],
        transition: transitionProp[variant],
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
