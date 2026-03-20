'use client'

import { motion } from 'framer-motion'

const pillars = [
  {
    icon: '⟳',
    title: 'Real-time, not retained',
    body: 'Connections to SAP ERP and PLM are live queries. Structured product data is retrieved at the moment it\'s needed and not stored in Pareo\'s systems. Your ERP remains the system of record — Pareo reads from it, nothing more.',
  },
  {
    icon: '◉',
    title: 'EU infrastructure',
    body: 'All data processing takes place within EU-based infrastructure. Documents and unstructured data you process through Pareo stay within European VPCs — no transatlantic data flows.',
  },
  {
    icon: '⬡',
    title: 'Standards-based, portable records',
    body: 'Pareo structures the data it processes into AAS-compatible records — the Asset Administration Shell format that underpins Manufacturing-X and the Digital Product Passport. The structured output belongs to you, in a format that works with any data space connector, whether you continue using Pareo or not.',
  },
  {
    icon: '⊞',
    title: 'Self-hosted storage',
    body: 'Document storage can be deployed in your own infrastructure. You bring the storage layer; Pareo uses it. Your unstructured data — lab reports, supplier declarations, material certificates — stays in an environment you control and can audit independently.',
  },
]

export function DataSovereignty() {
  return (
    <section
      className="py-24 border-t"
      style={{ background: '#13131F', borderColor: 'rgba(123,92,245,0.1)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
            >
              Data Sovereignty
            </span>
          </div>
          <h2
            className="mb-5 leading-tight"
            style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: 'clamp(30px, 4vw, 50px)',
              fontWeight: 800,
              color: '#ffffff',
            }}
          >
            Built on the same principle{' '}
            <span style={{ color: '#7B5CF5' }}>as the data spaces you're joining.</span>
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
          >
            The Datenraum ecosystem — GAIA-X, IDS, Manufacturing-X — exists because manufacturers
            refused to upload crown-jewels data to a central platform they didn't control. The entire
            architecture was designed around one principle: data stays with the owner; access is
            granted, not surrendered.
          </p>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
          >
            Pareo is built the same way — not as a compliance feature added later, but as a
            structural consequence of how it works. Your product data stays in your systems.
            What Pareo generates belongs to you, in formats you can take anywhere.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1 }}
              className="p-7 rounded-xl"
              style={{
                background: '#0D0D1A',
                border: '1px solid rgba(123,92,245,0.15)',
              }}
            >
              <div
                className="text-xl mb-4 leading-none"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
              >
                {pillar.icon}
              </div>
              <h3
                className="text-sm font-bold mb-2"
                style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
              >
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="rounded-xl p-7 max-w-3xl"
          style={{ background: '#16162A', borderLeft: '3px solid #7B5CF5' }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
          >
            When your CISO asks what access Pareo has to your ERP: it has read access to the
            specific data types needed to answer a compliance request, at the moment the request
            is processed. When your CTO asks where your lab reports go: into your own storage
            layer, in a format defined by an open standard, under your control. That's the answer
            before the first meeting.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
