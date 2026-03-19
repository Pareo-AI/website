'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const tabs = [
  {
    id: 'ingestion',
    label: 'Data Capture',
    headline: 'Every compliance interaction is a structured data input.',
    body: 'Compliance requests arrive in every format — an email with a PDF, an Excel template from procurement, a portal notification, a standalone questionnaire. Pareo ingests each one automatically, extracts the product identifiers and regulatory requirements, and begins building the structured data record needed to respond.\n\nThe request isn\'t just a task to handle. It\'s a signal about what product data you need to have — and keep current.',
    tags: ['Email', 'PDF', 'Excel', 'Assent', 'CDX'],
    visual: 'ingestion',
  },
  {
    id: 'retrieval',
    label: 'Data Assembly',
    headline: 'A complete, validated product data record — assembled automatically.',
    body: 'Structuring product data for compliance means pulling together bills of materials from SAP, specifications from PLM, lab results, and supplier declarations. Pareo connects to your existing systems and assembles the complete picture in seconds.\n\nEvery data point retrieved is validated, linked to its source, and added to a structured product record — making each subsequent request faster and your data progressively more complete.',
    tags: ['SAP ERP', 'TEAMCENTER', 'ORACLE', 'SharePoint', 'Lab reports', 'Supplier documents'],
    visual: 'retrieval',
  },
  {
    id: 'generation',
    label: 'Structured Output',
    headline: 'Machine-readable output in any format. Approved by your team.',
    body: 'Pareo generates the output in the exact format required — IPC-1752A XML, a Manufacturing-X compatible schema, a filled Excel template, or a portal submission. Every data point is linked to its source document, so the evidence trail is always intact.\n\nNothing is sent automatically. Your specialist reviews and approves. But what gets generated isn\'t just a response — it\'s validated, structured product data that any downstream system can consume.',
    tags: ['IPC-1752', 'Manufacturing-X', 'Excel', 'PDF', 'XML', 'Data Space'],
    visual: 'generation',
  },
  {
    id: 'gap',
    label: 'Data Completeness',
    headline: 'Incomplete product data is a liability. Pareo closes the gaps.',
    body: 'A product data record is only as useful as it is complete. When Pareo identifies missing material declarations, substance data, or supplier certifications, it automatically reaches out to the relevant sub-supplier to request them. Responses are tracked, validated, and added to the record.\n\nThe result isn\'t just a closed compliance request — it\'s a more complete, more reliable product data foundation.',
    tags: ['Sub-supplier outreach', 'Automated follow-up', 'Gap detection', 'Regulation monitoring'],
    visual: 'gap',
  },
]

function IngestionVisual() {
  return (
    <div className="h-full flex flex-col gap-3 p-6">
      <div className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}>
        Incoming Requests
      </div>
      {[
        { icon: '📧', type: 'Email', label: 'PFAS_questionnaire_2024.xlsx', status: 'Classifying…', tag: 'PFAS' },
        { icon: '🌐', type: 'Assent Portal', label: 'SVHC Declaration Request #4492', status: 'Ingested', tag: 'REACH' },
        { icon: '📄', type: 'PDF Attachment', label: 'RoHS_compliance_form_Q3.pdf', status: 'Processing', tag: 'RoHS' },
        { icon: '📊', type: 'Excel Template', label: 'Conflict_minerals_CMRT_v6.xlsx', status: 'Queued', tag: 'CMR' },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{ background: 'rgba(123,92,245,0.07)', border: '1px solid rgba(123,92,245,0.12)' }}
        >
          <span className="text-base">{item.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate" style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}>{item.label}</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-ibm)' }}>{item.type}</div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs px-2 py-0.5 rounded"
              style={{ background: 'rgba(123,92,245,0.2)', color: '#b89cff', fontFamily: 'var(--font-ibm)' }}>
              {item.tag}
            </span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.status === 'Ingested' ? '#22c55e' : '#7B5CF5' }} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function RetrievalVisual() {
  const sources = [
    { label: 'SAP ERP', pos: 'top-0 left-4', icon: '🗃️' },
    { label: 'PLM', pos: 'top-0 right-4', icon: '⚙️' },
    { label: 'SharePoint', pos: 'bottom-0 left-4', icon: '📁' },
    { label: 'Lab Reports', pos: 'bottom-0 right-4', icon: '🔬' },
  ]

  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="relative w-full max-w-xs mx-auto" style={{ height: '260px' }}>
        {sources.map((s, i) => (
          <motion.div
            key={i}
            className={`absolute ${s.pos} flex flex-col items-center gap-1`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: '#16162A', border: '1px solid rgba(123,92,245,0.2)' }}>
              {s.icon}
            </div>
            <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}>
              {s.label}
            </span>
          </motion.div>
        ))}

        {/* Centre node */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ boxShadow: ['0 0 20px rgba(123,92,245,0.3)', '0 0 40px rgba(123,92,245,0.6)', '0 0 20px rgba(123,92,245,0.3)'] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center"
            style={{ background: 'rgba(123,92,245,0.15)', border: '2px solid rgba(123,92,245,0.4)' }}
          >
            <span className="text-xl">✦</span>
            <span className="text-xs font-bold mt-1" style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>Pareo</span>
          </motion.div>
        </div>

        {/* Connector lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.25 }}>
          <line x1="20%" y1="25%" x2="50%" y2="50%" stroke="#7B5CF5" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="#7B5CF5" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="20%" y1="75%" x2="50%" y2="50%" stroke="#7B5CF5" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="80%" y1="75%" x2="50%" y2="50%" stroke="#7B5CF5" strokeWidth="1" strokeDasharray="4 3" />
        </svg>
      </div>
    </div>
  )
}

function GenerationVisual() {
  return (
    <div className="h-full flex flex-col gap-3 p-6">
      <div className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}>
        Draft Response — Pending Review
      </div>
      <div className="rounded-lg p-4" style={{ background: 'rgba(123,92,245,0.07)', border: '1px solid rgba(123,92,245,0.15)' }}>
        {[
          { field: 'Regulation', value: 'REACH SVHC — Art. 59(1)', status: '✓' },
          { field: 'Substance', value: 'Lead (EC 231-100-4)', status: '✓' },
          { field: 'Concentration', value: '< 0.1% w/w — compliant', status: '✓' },
          { field: 'Evidence', value: 'LabReport_2024_Q2.pdf (p.7)', status: '✓' },
          { field: 'Output format', value: 'IPC-1752A XML', status: '✓' },
        ].map((row, i) => (
          <div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ibm)' }}>{row.field}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-ibm)' }}>{row.value}</span>
              <span className="text-xs" style={{ color: '#22c55e' }}>{row.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <button className="flex-1 py-2 rounded-lg text-xs font-semibold text-white"
          style={{ background: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
          ✓ Approve
        </button>
        <button className="flex-1 py-2 rounded-lg text-xs font-semibold"
          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', border: '1px solid rgba(255,255,255,0.1)' }}>
          ✕ Request changes
        </button>
      </div>
    </div>
  )
}

function GapVisual() {
  return (
    <div className="h-full flex flex-col gap-3 p-6">
      <div className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}>
        Gap Detection
      </div>
      <div className="rounded-lg p-4" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>
        <div className="flex items-start gap-2">
          <span className="text-sm">⚠</span>
          <div>
            <div className="text-xs font-semibold mb-1" style={{ color: '#fca5a5', fontFamily: 'var(--font-ibm)' }}>Data gap detected</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}>
              PFAS declaration missing for sub-component SC-2291 from Supplier GmbH
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-lg p-4"
        style={{ background: 'rgba(123,92,245,0.08)', border: '1px solid rgba(123,92,245,0.2)' }}
      >
        <div className="text-xs font-semibold mb-2" style={{ color: '#b89cff', fontFamily: 'var(--font-ibm)' }}>
          📧 Automated outreach sent
        </div>
        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-ibm)' }}>
          To: compliance@supplier-gmbh.de<br />
          Subject: PFAS data request — component SC-2291<br />
          Follow-up scheduled: +5 days
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-lg p-4"
        style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: '#86efac' }}>✓</span>
          <span className="text-xs font-medium" style={{ color: '#86efac', fontFamily: 'var(--font-ibm)' }}>
            Gap resolved — declaration received &amp; validated
          </span>
        </div>
      </motion.div>
    </div>
  )
}

const visuals: Record<string, React.ReactNode> = {
  ingestion: <IngestionVisual />,
  retrieval: <RetrievalVisual />,
  generation: <GenerationVisual />,
  gap: <GapVisual />,
}

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const tab = tabs[active]

  return (
    <section
      id="product"
      className="py-24 border-t"
      style={{ background: '#0D0D1A', borderColor: 'rgba(123,92,245,0.1)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
              The Product
            </span>
          </div>
          <h2 className="mb-4 leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#ffffff' }}>
            Your product data,{' '}
            <span style={{ color: '#7B5CF5' }}>structured and validated.</span>
            {' '}Automatically.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            Every compliance interaction captures, validates, and organizes your product data — building a machine-readable
            record that answers today's requests and is ready for tomorrow's data spaces.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mb-10 overflow-x-auto pb-1"
          style={{ borderBottom: '1px solid rgba(123,92,245,0.12)' }}>
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-all relative shrink-0"
              style={{
                fontFamily: 'var(--font-ibm)',
                color: active === i ? '#ffffff' : 'rgba(255,255,255,0.4)',
              }}
            >
              {t.label}
              {active === i && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: '#7B5CF5' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Left: copy */}
            <div>
              <h3 className="mb-5 leading-snug"
                style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: '#ffffff' }}>
                {tab.headline}
              </h3>
              <div className="space-y-4 mb-7">
                {tab.body.split('\n\n').map((para, i) => (
                  <p key={i} className="text-base leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                    {para}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {tab.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'rgba(123,92,245,0.1)',
                      border: '1px solid rgba(123,92,245,0.2)',
                      color: '#b89cff',
                      fontFamily: 'var(--font-ibm)',
                    }}>
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  const el = document.querySelector('#contact')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all"
                style={{ background: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#6d4ee0')}
                onMouseLeave={e => (e.currentTarget.style.background = '#7B5CF5')}
              >
                Request Demo →
              </button>
            </div>

            {/* Right: visual */}
            <div className="rounded-xl overflow-hidden min-h-[320px]"
              style={{ background: '#0A0A12', border: '1px solid rgba(123,92,245,0.18)' }}>
              {visuals[tab.visual]}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
