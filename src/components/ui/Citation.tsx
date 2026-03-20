'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  n: number
  label: string
  href: string
}

export function Citation({ n, label, href }: Props) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <span
      ref={wrapperRef}
      style={{ display: 'inline-block', position: 'relative', verticalAlign: 'super', lineHeight: 0 }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          fontSize: '0.68em',
          color: open ? '#a07aff' : '#7B5CF5',
          background: 'none',
          border: 'none',
          padding: '0 1px',
          cursor: 'pointer',
          fontFamily: 'var(--font-ibm)',
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        {n}
      </button>

      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              display: 'block',
              position: 'absolute',
              bottom: 'calc(100% + 10px)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              minWidth: 220,
              maxWidth: 300,
              background: '#16162A',
              border: '1px solid rgba(123,92,245,0.3)',
              borderRadius: 8,
              padding: '10px 14px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(123,92,245,0.08)',
              pointerEvents: 'auto',
            }}
          >
            {/* Caret */}
            <span
              style={{
                position: 'absolute',
                bottom: -5,
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: 8,
                height: 8,
                background: '#16162A',
                borderRight: '1px solid rgba(123,92,245,0.3)',
                borderBottom: '1px solid rgba(123,92,245,0.3)',
              }}
            />

            <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span
                style={{
                  color: '#7B5CF5',
                  fontSize: 10,
                  fontFamily: 'var(--font-ibm)',
                  fontWeight: 700,
                  flexShrink: 0,
                  paddingTop: 1,
                }}
              >
                {n}
              </span>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: 11,
                  fontFamily: 'var(--font-ibm)',
                  fontWeight: 300,
                  lineHeight: 1.55,
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c4b0ff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {label}
                <span style={{ marginLeft: 4, opacity: 0.5, fontSize: 10 }}>↗</span>
              </a>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
