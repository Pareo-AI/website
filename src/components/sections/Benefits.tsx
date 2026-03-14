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

const comparison = [
  {
    without: 'Requests arrive by email, portal, and Excel and pile up in a shared inbox',
    with: 'Every incoming request is automatically ingested and classified the moment it arrives',
  },
  {
    without: 'Your engineer searches SAP, shared drives, lab reports, and email threads to find the data',
    with: 'Agents retrieve the relevant product and material data from your connected systems in seconds',
  },
  {
    without: 'Responses drafted from scratch each time, inconsistent quality across the team',
    with: 'Responses generated automatically, mapped to the exact format required, evidence linked',
  },
  {
    without: 'Data manually copy-pasted into Assent or customer templates',
    with: 'Direct write-back into portals and output formats — no re-entry, no transcription errors',
  },
  {
    without: 'Sub-supplier data chased over email, delays compound',
    with: 'Automated outreach triggered immediately when data is missing, gaps tracked until closed',
  },
  {
    without: 'Evidence scattered across systems, hard to reconstruct for audits',
    with: 'Full source trail archived with every response — audit-ready from day one',
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
            <span className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
              The Results
            </span>
          </div>
          <h2 className="mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#ffffff' }}>
            The same team. A fraction of the work.
          </h2>
          <p className="max-w-2xl text-base"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            Pareo doesn't replace your compliance specialists. It removes the part of their job that shouldn't exist in the first place.
          </p>
        </div>

        {/* Stat cards */}
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
              <div className="text-4xl font-extrabold mb-3 leading-none"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
                {card.stat}
              </div>
              <p className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(123,92,245,0.15)' }}>
          {/* Table header */}
          <div className="grid grid-cols-2">
            <div className="px-6 py-4" style={{ background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(123,92,245,0.1)' }}>
              <span className="text-sm font-semibold"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-ibm)' }}>
                ✗ Without Pareo
              </span>
            </div>
            <div className="px-6 py-4" style={{ background: 'rgba(123,92,245,0.07)' }}>
              <span className="text-sm font-semibold"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
                ✓ With Pareo
              </span>
            </div>
          </div>

          {/* Rows */}
          {comparison.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-2 border-t"
              style={{ borderColor: 'rgba(123,92,245,0.08)' }}
            >
              <div
                className="px-6 py-4 text-sm leading-relaxed"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'var(--font-ibm)',
                  fontWeight: 300,
                  borderRight: '1px solid rgba(123,92,245,0.08)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                }}
              >
                {row.without}
              </div>
              <div
                className="px-6 py-4 text-sm leading-relaxed"
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontFamily: 'var(--font-ibm)',
                  fontWeight: 300,
                  background: i % 2 === 0 ? 'rgba(123,92,245,0.04)' : 'rgba(123,92,245,0.03)',
                }}
              >
                {row.with}
              </div>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            Compliance requests aren't going away. The regulations keep coming, the OEMs keep asking, and the deadlines keep tightening.
            Pareo means your team never falls behind again.
          </p>
        </div>
      </div>
    </section>
  )
}
