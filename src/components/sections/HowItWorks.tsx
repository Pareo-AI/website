'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

const EASE = 'cubic-bezier(0.16,1,0.3,1)'

const TAB_IDS = ['ingestion', 'retrieval', 'generation', 'gap'] as const
type TabId = typeof TAB_IDS[number]

const TAB_TAGS: Record<TabId, string[]> = {
  ingestion: ['Email', 'PDF', 'Excel', 'Assent', 'CDX'],
  retrieval: ['SAP ERP', 'TEAMCENTER', 'ORACLE', 'SharePoint', 'Lab reports', 'Supplier documents'],
  generation: ['IPC-1752', 'Assent', 'CDX', 'Excel', 'PDF', 'XML'],
  gap: ['Sub-supplier outreach', 'Automated follow-up', 'Gap detection', 'Regulation monitoring'],
}

const TAB_VISUAL: Record<TabId, string> = {
  ingestion: 'ingestion',
  retrieval: 'retrieval',
  generation: 'generation',
  gap: 'gap',
}

function IngestionVisual() {
  const t = useTranslations('HowItWorks')
  const items = [
    { icon: '📧', type: 'Email', label: 'PFAS_questionnaire_2024.xlsx', status: t('visuals.classifying'), tag: 'PFAS' },
    { icon: '🌐', type: 'Assent Portal', label: 'SVHC Declaration Request #4492', status: t('visuals.ingested'), tag: 'REACH' },
    { icon: '📄', type: 'PDF Attachment', label: 'RoHS_compliance_form_Q3.pdf', status: t('visuals.processing'), tag: 'RoHS' },
    { icon: '📊', type: 'Excel Template', label: 'Conflict_minerals_CMRT_v6.xlsx', status: t('visuals.queued'), tag: 'CMR' },
  ]

  return (
    <div className="h-full flex flex-col gap-3 p-6">
      <div className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}>
        {t('visuals.incomingRequests')}
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{
            background: 'rgba(123,92,245,0.07)',
            border: '1px solid rgba(123,92,245,0.12)',
            animation: `slide-in-right 0.4s ${EASE} ${i * 80}ms both`,
          }}
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
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.status === t('visuals.ingested') ? '#22c55e' : '#7B5CF5' }} />
          </div>
        </div>
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
          <div
            key={i}
            className={`absolute ${s.pos} flex flex-col items-center gap-1`}
            style={{ animation: `fade-in-up 0.4s ${EASE} ${i * 100}ms both` }}
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: '#16162A', border: '1px solid rgba(123,92,245,0.2)' }}>
              {s.icon}
            </div>
            <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}>
              {s.label}
            </span>
          </div>
        ))}

        {/* Centre node */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center animate-pulse-glow"
            style={{ background: 'rgba(123,92,245,0.15)', border: '2px solid rgba(123,92,245,0.4)' }}
          >
            <span className="text-xl">✦</span>
            <span className="text-xs font-bold mt-1" style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>Pareo</span>
          </div>
        </div>

        {/* Connector lines */}
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
  const t = useTranslations('HowItWorks')
  const rows = [
    { field: 'Regulation', value: 'REACH SVHC — Art. 59(1)', status: '✓' },
    { field: 'Substance', value: 'Lead (EC 231-100-4)', status: '✓' },
    { field: 'Concentration', value: '< 0.1% w/w — compliant', status: '✓' },
    { field: 'Evidence', value: 'LabReport_2024_Q2.pdf (p.7)', status: '✓' },
    { field: 'Output format', value: 'IPC-1752A XML', status: '✓' },
  ]

  return (
    <div className="h-full flex flex-col gap-3 p-6">
      <div className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}>
        {t('visuals.draftResponse')}
      </div>
      <div className="rounded-lg p-4" style={{ background: 'rgba(123,92,245,0.07)', border: '1px solid rgba(123,92,245,0.15)' }}>
        {rows.map((row, i) => (
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
          {t('visuals.approve')}
        </button>
        <button className="flex-1 py-2 rounded-lg text-xs font-semibold"
          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {t('visuals.requestChanges')}
        </button>
      </div>
    </div>
  )
}

function GapVisual() {
  const t = useTranslations('HowItWorks')

  return (
    <div className="h-full flex flex-col gap-3 p-6">
      <div className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}>
        {t('visuals.gapDetection')}
      </div>
      <div className="rounded-lg p-4" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>
        <div className="flex items-start gap-2">
          <span className="text-sm">⚠</span>
          <div>
            <div className="text-xs font-semibold mb-1" style={{ color: '#fca5a5', fontFamily: 'var(--font-ibm)' }}>{t('visuals.dataGapDetected')}</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}>
              PFAS declaration missing for sub-component SC-2291 from Supplier GmbH
            </div>
          </div>
        </div>
      </div>
      <div
        className="rounded-lg p-4"
        style={{
          background: 'rgba(123,92,245,0.08)',
          border: '1px solid rgba(123,92,245,0.2)',
          animation: `fade-in-up 0.4s ${EASE} 300ms both`,
        }}
      >
        <div className="text-xs font-semibold mb-2" style={{ color: '#b89cff', fontFamily: 'var(--font-ibm)' }}>
          {t('visuals.automatedOutreach')}
        </div>
        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-ibm)' }}>
          To: compliance@supplier-gmbh.de<br />
          Subject: PFAS data request — component SC-2291<br />
          {t('visuals.followUpScheduled')}
        </div>
      </div>
      <div
        className="rounded-lg p-4"
        style={{
          background: 'rgba(34,197,94,0.07)',
          border: '1px solid rgba(34,197,94,0.2)',
          animation: `fade-in-up 0.4s ${EASE} 600ms both`,
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: '#86efac' }}>✓</span>
          <span className="text-xs font-medium" style={{ color: '#86efac', fontFamily: 'var(--font-ibm)' }}>
            {t('visuals.gapResolved')}
          </span>
        </div>
      </div>
    </div>
  )
}

export function HowItWorks() {
  const t = useTranslations('HowItWorks')
  const [active, setActive] = useState(0)

  const tabs = TAB_IDS.map((id) => ({
    id,
    label: t(`tabs.${id}.label`),
    headline: t(`tabs.${id}.headline`),
    body: [t(`tabs.${id}.body1`), t(`tabs.${id}.body2`)],
    tags: TAB_TAGS[id],
    visual: TAB_VISUAL[id],
  }))

  const visuals: Record<string, React.ReactNode> = {
    ingestion: <IngestionVisual />,
    retrieval: <RetrievalVisual />,
    generation: <GenerationVisual />,
    gap: <GapVisual />,
  }

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
              {t('eyebrow')}
            </span>
          </div>
          <h2 className="mb-4 leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#ffffff' }}>
            {t('headline1')}{' '}
            <span style={{ color: '#7B5CF5' }}>{t('headline2')}</span>
            {' '}{t('headline3')}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            {t('subheadline')}
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mb-10 overflow-x-auto pb-1"
          style={{ borderBottom: '1px solid rgba(123,92,245,0.12)' }}>
          {tabs.map((tabItem, i) => (
            <button
              key={tabItem.id}
              onClick={() => setActive(i)}
              className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-all relative shrink-0"
              style={{
                fontFamily: 'var(--font-ibm)',
                color: active === i ? '#ffffff' : 'rgba(255,255,255,0.4)',
              }}
            >
              {tabItem.label}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-200"
                style={{ background: '#7B5CF5', opacity: active === i ? 1 : 0 }}
              />
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          key={active}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          style={{ animation: `fade-in-up 0.3s ${EASE} both` }}
        >
          {/* Left: copy */}
          <div>
            <h3 className="mb-5 leading-snug"
              style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: '#ffffff' }}>
              {tab.headline}
            </h3>
            <div className="space-y-4 mb-7">
              {tab.body.map((para, i) => (
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
              {t('cta')}
            </button>
          </div>

          {/* Right: visual */}
          <div className="rounded-xl overflow-hidden min-h-[320px]"
            style={{ background: '#0A0A12', border: '1px solid rgba(123,92,245,0.18)' }}>
            {visuals[tab.visual]}
          </div>
        </div>
      </div>
    </section>
  )
}
