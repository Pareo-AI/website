'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const points = [
  {
    n: '01',
    title: 'We ask before we pitch.',
    detail:
      'We want to understand your current process, request volume, and systems — before suggesting anything.',
  },
  {
    n: '02',
    title: '30 minutes. No deck.',
    detail:
      'A direct conversation with the founders. We talk about your situation, not ours.',
  },
  {
    n: '03',
    title: 'NDA on request.',
    detail:
      'Happy to sign before you share details about your infrastructure or compliance setup.',
  },
]

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(123,92,245,0.2)',
  color: '#ffffff',
  fontFamily: 'var(--font-ibm)',
}

export function CTA() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="relative py-32 border-t overflow-hidden"
      style={{ background: '#0A0A12', borderColor: 'rgba(123,92,245,0.1)' }}
    >
      {/* Purple gradient bloom — mirrors Hero but from top-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 95% 0%, rgba(123,92,245,0.18) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 5% 100%, rgba(123,92,245,0.06) 0%, transparent 50%)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(123,92,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(123,92,245,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* ── Left: copy ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
              >
                Let's Talk
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="mb-6 leading-[1.05] tracking-tight"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                fontWeight: 800,
                color: '#ffffff',
              }}
            >
              Talk to the team.
            </motion.h2>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mb-12 leading-relaxed"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.5)',
                maxWidth: '420px',
              }}
            >
              Most manufacturers we speak with have never mapped their compliance
              exposure. Start there. One conversation is usually enough to know
              whether Pareo is the right fit.
            </motion.p>

            {/* Numbered points */}
            <div className="space-y-0">
              {points.map((item, i) => (
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.28 + i * 0.1, ease }}
                  className="flex items-start gap-6 py-6"
                  style={{
                    borderBottom:
                      i < points.length - 1
                        ? '1px solid rgba(123,92,245,0.1)'
                        : 'none',
                  }}
                >
                  {/* Number */}
                  <span
                    className="shrink-0 text-xs font-bold tracking-widest tabular-nums"
                    style={{
                      color: '#7B5CF5',
                      fontFamily: 'var(--font-ibm)',
                      paddingTop: '2px',
                      minWidth: '24px',
                    }}
                  >
                    {item.n}
                  </span>

                  <div>
                    <div
                      className="text-sm font-semibold mb-1"
                      style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-sm leading-relaxed"
                      style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: 'var(--font-ibm)',
                        fontWeight: 300,
                      }}
                    >
                      {item.detail}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right: form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15, ease }}
            className="rounded-2xl p-8"
            style={{
              background: '#13131F',
              border: '1px solid rgba(123,92,245,0.18)',
              boxShadow:
                'inset 0 1px 0 rgba(123,92,245,0.25), 0 32px 80px rgba(0,0,0,0.4)',
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="py-12 flex flex-col items-start"
              >
                {/* Accent line */}
                <div
                  className="h-px w-12 mb-8"
                  style={{ background: '#7B5CF5' }}
                />
                <h3
                  className="leading-tight mb-4"
                  style={{
                    fontFamily: 'var(--font-ibm)',
                    fontSize: 'clamp(28px, 3.5vw, 42px)',
                    fontWeight: 800,
                    color: '#ffffff',
                  }}
                >
                  Message received.
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'var(--font-ibm)',
                    fontWeight: 300,
                  }}
                >
                  We'll be back within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  {
                    label: 'Full name',
                    type: 'text',
                    value: name,
                    set: setName,
                    placeholder: 'Jan Müller',
                    required: true,
                  },
                  {
                    label: 'Work email',
                    type: 'email',
                    value: email,
                    set: setEmail,
                    placeholder: 'jan@company.com',
                    required: true,
                  },
                  {
                    label: 'Company',
                    type: 'text',
                    value: company,
                    set: setCompany,
                    placeholder: 'Acme GmbH',
                    required: true,
                  },
                ].map(({ label, type, value, set, placeholder, required }) => (
                  <div key={label}>
                    <label
                      className="block text-xs font-medium mb-2"
                      style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: 'var(--font-ibm)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      required={required}
                      value={value}
                      onChange={(e) => set(e.target.value)}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          'rgba(123,92,245,0.6)')
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          'rgba(123,92,245,0.2)')
                      }
                    />
                  </div>
                ))}

                <div>
                  <label
                    className="block text-xs font-medium mb-2"
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'var(--font-ibm)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    What's your biggest compliance challenge?{' '}
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>
                      (optional)
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. We receive ~200 SVHC requests per year and respond manually…"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 resize-none"
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        'rgba(123,92,245,0.6)')
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        'rgba(123,92,245,0.2)')
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg text-sm font-semibold text-white transition-all duration-200"
                  style={{
                    background: loading ? 'rgba(123,92,245,0.5)' : '#7B5CF5',
                    fontFamily: 'var(--font-ibm)',
                    boxShadow: loading
                      ? 'none'
                      : '0 0 32px rgba(123,92,245,0.35)',
                  }}
                  onMouseEnter={(e) => {
                    if (loading) return
                    e.currentTarget.style.background = '#6d4ee0'
                    e.currentTarget.style.boxShadow =
                      '0 0 48px rgba(123,92,245,0.5)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    if (loading) return
                    e.currentTarget.style.background = '#7B5CF5'
                    e.currentTarget.style.boxShadow =
                      '0 0 32px rgba(123,92,245,0.35)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {loading ? 'Sending…' : 'Request a Conversation'}
                </button>

                <p
                  className="text-xs text-center"
                  style={{
                    color: 'rgba(255,255,255,0.2)',
                    fontFamily: 'var(--font-ibm)',
                  }}
                >
                  No spam. Reply within one business day.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
