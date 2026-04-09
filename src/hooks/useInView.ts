import { useEffect, useState, type RefObject } from 'react'

/**
 * Thin IntersectionObserver hook that replaces framer-motion's useInView.
 * Set once: false to re-trigger on scroll (Problem.tsx scroll steps).
 */
export function useInView(
  ref: RefObject<Element | null>,
  options: { amount?: number; once?: boolean } = {}
): boolean {
  const [inView, setInView] = useState(false)
  const { amount = 0, once = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        const isIn = entry.isIntersecting
        setInView(isIn)
        if (isIn && once) obs.disconnect()
      },
      { threshold: amount }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [amount, once])

  return inView
}
