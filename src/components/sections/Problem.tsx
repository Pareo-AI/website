'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    visual: 1,
    text: 'Every morning, the inbox has more. An Excel template from a customer. A portal notification from Assent. A PDF about PFAS restrictions, forwarded from procurement with no context.',
  },
  {
    visual: 2,
    text: 'To answer any of them, your engineer opens SAP. Searches a shared drive. Digs through old email threads with sub-suppliers. Cross-references a lab report from two years ago.',
  },
  {
    visual: 3,
    text: 'The engineer pieces it together manually. Types it into whatever format the customer requires. Checks it. Sends it. Then the next one arrives.',
  },
  {
    visual: 4,
    text: 'This happens hundreds of times a year. Across every product line, every customer, every regulation. And the volume keeps growing.',
  },
  {
    visual: 5,
    text: 'The data your team needs exists. It\'s just scattered across too many systems, in too many formats, with no way to move fast.',
  },
]

const stats = [
  { number: '30%', label: 'Increase per year', body: 'Compliance request volume is growing every year — driven by new regulations, deeper data requirements, and OEMs automating their outreach.' },
  { number: '1+ hr', label: 'Per request', body: 'Retrieving data from multiple systems, validating it, and formatting the output correctly takes hours of expert time — for a single response.' },
  { number: '4+', label: 'Systems to check', body: 'The data needed to answer a single request lives in your ERP, PLM, shared drives, lab reports, and supplier email threads — with no single source of truth.' },
]

const inboxMessages = [
  { from: 'Assent Portal', subject: 'New SVHC request — response due in 5 days', tag: 'REACH', color: '#7B5CF5' },
  { from: 'procurement@customer.de', subject: 'FW: PFAS declaration template — urgent', tag: 'PFAS', color: '#a87fff' },
  { from: 'compliance@oem-group.com', subject: 'RoHS compliance data needed for Q3 audit', tag: 'RoHS', color: '#7B5CF5' },
  { from: 'CDX Platform', subject: 'Action required: conflict minerals report', tag: 'CMR', color: '#6b4fd4' },
  { from: 'supplier-mgmt@tier1.eu', subject: 'RE: REACH SVHC — missing CAS numbers', tag: 'REACH', color: '#7B5CF5' },
  { from: 'ecodesign@regulation.eu', subject: 'New ecodesign requirements — product XA-4420', tag: 'ECO', color: '#9b6dff' },
  { from: 'assent@portal.io', subject: 'Overdue: 3 pending declarations', tag: 'PORTAL', color: '#c084fc' },
  { from: 'compliance.team@automotive.de', subject: 'CSRD supply chain data request Q4', tag: 'CSRD', color: '#7B5CF5' },
]

function InboxVisual({ step }: { step: number }) {
  const visibleCount = Math.min(step + 1, inboxMessages.length)

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: '#0D0D1A',
        border: '1px solid rgba(123,92,245,0.2)',
        minHeight: '340px',
      }}
    >
      {/* Inbox header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(123,92,245,0.15)', background: 'rgba(123,92,245,0.05)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ibm)' }}>
          Compliance Inbox
        </span>
        <div
          className="px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', fontFamily: 'var(--font-ibm)' }}
        >
          {visibleCount} unread
        </div>
      </div>

      {/* Messages */}
      <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        {inboxMessages.slice(0, visibleCount).map((msg, i) => (
          <motion.div
            key={i}
            initial={i === visibleCount - 1 && step > 0 ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-3 flex items-start gap-3"
            style={{ background: i === 0 ? 'rgba(123,92,245,0.04)' : 'transparent' }}
          >
            <div
              className="w-2 h-2 rounded-full mt-2 shrink-0"
              style={{ background: i < 2 ? '#7B5CF5' : 'rgba(123,92,245,0.3)' }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span
                  className="text-xs font-medium truncate"
                  style={{ color: i < 2 ? '#ffffff' : 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-ibm)' }}
                >
                  {msg.from}
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded shrink-0"
                  style={{
                    background: 'rgba(123,92,245,0.15)',
                    color: '#b89cff',
                    fontFamily: 'var(--font-ibm)',
                    fontSize: '10px',
                  }}
                >
                  {msg.tag}
                </span>
              </div>
              <p
                className="text-xs truncate"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-ibm)' }}
              >
                {msg.subject}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ScrollStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.6, once: false })

  return (
    <div ref={ref} className="min-h-[60vh] flex items-center py-16">
      <motion.div
        animate={{ opacity: inView ? 1 : 0.25, x: inView ? 0 : 16 }}
        transition={{ duration: 0.45 }}
        className="max-w-lg"
      >
        <div
          className="text-6xl font-bold mb-4 leading-none"
          style={{ color: 'rgba(123,92,245,0.2)', fontFamily: 'var(--font-ibm)' }}
        >
          0{index + 1}
        </div>
        <p
          className="text-lg leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
        >
          {step.text}
        </p>
      </motion.div>
    </div>
  )
}

export function Problem() {
  return (
    <section
      style={{ background: '#0D0D1A' }}
      className="relative"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-8">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
            >
              The Problem
            </span>
          </div>
          <h2
            className="leading-tight tracking-tight"
            style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: 'clamp(36px, 4.5vw, 56px)',
              fontWeight: 800,
              color: '#ffffff',
            }}
          >
            Your compliance team didn't sign up to be a data entry department.
          </h2>
        </div>

        {/* Scrollytelling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left: sticky inbox */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <InboxSticky />
            </div>
          </div>

          {/* Right: scroll steps */}
          <div>
            {steps.map((step, i) => (
              <ScrollStep key={i} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile-only stacked steps */}
        <div className="lg:hidden space-y-12 mb-24">
          {steps.map((step, i) => (
            <div key={i}>
              <div
                className="text-5xl font-bold mb-3"
                style={{ color: 'rgba(123,92,245,0.25)', fontFamily: 'var(--font-ibm)' }}
              >
                0{i + 1}
              </div>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
              >
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-7 rounded-xl"
              style={{
                background: '#16162A',
                border: '1px solid rgba(123,92,245,0.15)',
              }}
            >
              <div
                className="text-4xl font-extrabold mb-1 leading-none"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
              >
                {stat.number}
              </div>
              <div
                className="text-sm font-semibold mb-3 uppercase tracking-wider"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}
              >
                {stat.label}
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
              >
                {stat.body}
              </p>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div className="pb-16 text-center">
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
          >
            The answer isn't hiring more compliance engineers. It's changing how the work gets done.
          </p>
        </div>
      </div>
    </section>
  )
}

function InboxSticky() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.1 })

  return (
    <div ref={ref}>
      <InboxVisual step={inView ? 5 : 0} />
    </div>
  )
}
