'use client'

import { motion } from 'framer-motion'

const statCards = [
  {
    stat: 'Hours → Minutes',
    body: 'What used to take hours to days of searching, formatting, and submitting now completes within a few minutes.',
  },
  {
    stat: '>70%',
    body: 'Of manual research and documentation effort eliminated per request — freeing your engineers for work that actually needs their expertise.',
  },
  {
    stat: '100%',
    body: 'Audit trail on every response. Every answer linked to its source document, retrievable in seconds when an auditor comes knocking.',
  },
]

const outcomes = [
  {
    icon: '◈',
    title: 'OEM qualification readiness',
    body: 'BMW Group and Ford have already made data space participation mandatory in supplier contracts. Volkswagen and Mercedes-Benz have publicly committed. Suppliers who can demonstrate structured, interoperable product data qualify faster and are less likely to be deprioritized as OEMs automate their supply chain requirements.',
  },
  {
    icon: '⬡',
    title: 'Data space participation',
    body: 'Every validated product record Pareo generates is built to Manufacturing-X-compatible standards. You\'re not preparing for data spaces — you\'re building your presence in them from day one. The compliance requests you handle today are the foundation for full data space participation tomorrow.',
  },
  {
    icon: '◻',
    title: 'Regulatory future-proofing',
    body: 'The EU Battery Passport is mandatory from February 2027. ESPR-based DPPs follow for electronics, machinery, and textiles. As requirements expand, the foundation is already in place. New regulations become new queries against structured data you already own — not new projects.',
  },
]

export function Benefits() {
  return (
    <section
      className="py-24 border-t"
      style={{ background: '#13131F', borderColor: 'rgba(123,92,245,0.1)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
            >
              The Results
            </span>
          </div>
          <h2
            className="mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#ffffff' }}
          >
            The same team. A data layer that works.
          </h2>
          <p
            className="max-w-2xl text-base"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
          >
            Pareo doesn't replace your compliance specialists. It removes the part of their job
            that shouldn't exist — while building the product data infrastructure your company needs.
          </p>
        </div>

        {/* Operational stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {statCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.1 }}
              className="p-7 rounded-xl"
              style={{ background: '#16162A', border: '1px solid rgba(123,92,245,0.15)' }}
            >
              <div
                className="text-4xl font-extrabold mb-3 leading-none"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
              >
                {card.stat}
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Strategic outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {outcomes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12 }}
              className="p-7 rounded-xl"
              style={{
                background: 'rgba(123,92,245,0.06)',
                border: '1px solid rgba(123,92,245,0.2)',
              }}
            >
              <div
                className="text-2xl mb-4"
                style={{ color: '#7B5CF5' }}
              >
                {item.icon}
              </div>
              <h3
                className="text-base font-bold mb-3"
                style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-4 text-center max-w-3xl mx-auto">
          <p
            className="text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
          >
            Compliance requests aren't going away — and they're only the beginning. Every piece of structured,
            validated product data your team generates is a building block for data space participation, Digital
            Product Passport readiness, and the automated supply chain exchanges that OEMs will require next.
            Pareo means you're building the foundation while handling today's workload.
          </p>
        </div>
      </div>
    </section>
  )
}
