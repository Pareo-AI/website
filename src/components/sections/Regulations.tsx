'use client'

import { motion } from 'framer-motion'

// ─── Citation primitives ──────────────────────────────────────────────────────

function Sup({ n, href }: { n: number; href: string }) {
  return (
    <sup style={{ lineHeight: 0 }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#7B5CF5',
          fontSize: '0.68em',
          textDecoration: 'none',
          marginLeft: '1px',
          opacity: 0.8,
        }}
        onClick={e => e.stopPropagation()}
      >
        {n}
      </a>
    </sup>
  )
}

function Footnotes({ items }: { items: { n: number; label: string; href: string }[] }) {
  return (
    <div className="mt-3 space-y-0.5">
      {items.map(item => (
        <div key={item.n} className="flex items-baseline gap-1.5">
          <span
            style={{
              color: 'rgba(255,255,255,0.2)',
              fontSize: '10px',
              fontFamily: 'var(--font-ibm)',
              lineHeight: '1.5',
              minWidth: '10px',
              flexShrink: 0,
            }}
          >
            {item.n}
          </span>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255,255,255,0.28)',
              fontSize: '10px',
              fontFamily: 'var(--font-ibm)',
              lineHeight: '1.5',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(255,255,255,0.12)',
            }}
          >
            {item.label}
          </a>
        </div>
      ))}
    </div>
  )
}

// ─── Sources ──────────────────────────────────────────────────────────────────

const src = {
  2: { label: 'Manufacturing-X — BMWK', href: 'https://www.bundeswirtschaftsministerium.de/Redaktion/EN/Dossier/manufacturing-x.html' },
  3: { label: 'Factory-X — SAP News, Sep 2025', href: 'https://news.sap.com/2025/09/factory-x-driving-mechanical-engineering-digitalization/' },
  4: { label: 'BMW Group mandate — BMW Newsroom, 2025', href: 'https://www.bmwgroup.com/en/news/general/2025/catena-x-connects-digital-supply-chains.html' },
  5: { label: 'Ford & BMW contracts — Plattform Industrie 4.0, Apr 2025', href: 'https://plattformindustrie40.at/en/blog/2025/04/07/operational-use-of-catena-x-in-the-automotive-industry/' },
  6: { label: 'VW, Mercedes-Benz — Catena-X Newsroom, IAA 2025', href: 'https://catena-x.net/news/catena-x-reaches-turning-point-industry-leaders-confirm-commitment-at-iaa/' },
} as const

// ─── Data ─────────────────────────────────────────────────────────────────────

const regulations = [
  { name: 'REACH SVHC', theme: 'Chemical Substances', flag: '🇪🇺', active: true },
  { name: 'RoHS', theme: 'Electrical / Electronic', flag: '🇪🇺', active: true },
  { name: 'PFAS', theme: 'Chemical Substances', flag: '🇪🇺🇺🇸', active: true },
  { name: 'SCIP', theme: 'Chemical Substances', flag: '🇪🇺', active: true },
  { name: 'EU Data Act', theme: 'Industrial Data', flag: '🇪🇺', active: true },
  { name: 'Conflict Minerals', theme: 'Trade & Conflict', flag: '🇺🇸', active: true },
  { name: 'TSCA', theme: 'Chemical Substances', flag: '🇺🇸', active: true },
  { name: 'California Prop. 65', theme: 'Chemical Substances', flag: '🇺🇸', active: true },
  { name: 'Ecodesign', theme: 'Sustainability', flag: '🇪🇺', active: true },
  { name: 'CSRD', theme: 'Sustainability Reporting', flag: '🇪🇺', active: true },
  { name: 'EU Battery Regulation', theme: 'Electrical / Electronic', flag: '🇪🇺', active: true },
  { name: 'IPC-1752', theme: 'Electrical / Electronic', flag: '🌐', active: true },
  { name: 'OSHA', theme: 'Chemical Substances', flag: '🇺🇸', active: true },
  { name: 'Digital Product Passport', theme: 'Sustainability', flag: '🇪🇺', active: false },
]

type OemCard = {
  org: string
  date: string
  detail: React.ReactNode
  footnotes: { n: number; label: string; href: string }[]
}

const oemCards: OemCard[] = [
  {
    org: 'BMW Group',
    date: 'April 2025',
    detail: 'Catena-X registration mandatory for all suppliers as part of procurement process.',
    footnotes: [{ n: 4, ...src[4] }],
  },
  {
    org: 'Ford',
    date: 'July 2024',
    detail: 'Catena-X included in supplier contract terms.',
    footnotes: [{ n: 5, ...src[5] }],
  },
  {
    org: 'Volkswagen',
    date: 'Committed',
    detail: (
      <>"Catena-X is a prerequisite for data-driven value chains."<Sup n={6} href={src[6].href} /> — VW Board, IAA 2025</>
    ),
    footnotes: [{ n: 6, ...src[6] }],
  },
  {
    org: 'Mercedes-Benz',
    date: 'Committed',
    detail: (
      <>"Catena-X will become the new standard of the automotive industry."<Sup n={6} href={src[6].href} /> — Head of Procurement, IAA 2025</>
    ),
    footnotes: [{ n: 6, ...src[6] }],
  },
]

// ─── Section ──────────────────────────────────────────────────────────────────

export function Regulations() {
  return (
    <section
      className="py-24 border-t"
      style={{ background: '#0A0A12', borderColor: 'rgba(123,92,245,0.1)' }}
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
              The Regulatory Shift
            </span>
          </div>
          <h2
            className="mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 800, color: '#ffffff' }}
          >
            The rules keep expanding.{' '}
            <span style={{ color: '#7B5CF5' }}>So does what your data must do.</span>
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
          >
            Compliance obligations are growing — but the bigger shift is structural. The EU Data Act establishes
            rights and obligations around industrial data sharing across the single market. Manufacturing-X<Sup n={2} href={src[2].href} />{' '}
            is building the data space infrastructure where machine builders, electrical equipment manufacturers,
            and their supply chains exchange product data automatically. Factory-X<Sup n={3} href={src[3].href} />{' '}
            extends this to the shop floor. Every one of these initiatives requires the same thing:
            your product data, structured and interoperable.
          </p>
          <Footnotes items={[{ n: 2, ...src[2] }, { n: 3, ...src[3] }]} />
        </div>

        {/* Regulation pills */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-3">
            {regulations.map((reg, i) => (
              <motion.div
                key={reg.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium"
                style={{
                  background: reg.active ? 'rgba(123,92,245,0.1)' : 'rgba(255,255,255,0.04)',
                  border: reg.active ? '1px solid rgba(123,92,245,0.25)' : '1px solid rgba(255,255,255,0.08)',
                  color: reg.active ? '#c4b0ff' : 'rgba(255,255,255,0.25)',
                  fontFamily: 'var(--font-ibm)',
                }}
                title={reg.theme}
              >
                <span style={{ fontSize: '13px' }}>{reg.flag}</span>
                <span>{reg.name}</span>
                {!reg.active && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', fontSize: '10px' }}
                  >
                    Soon
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* OEM mandate cards */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {oemCards.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl"
              style={{ background: '#16162A', border: '1px solid rgba(123,92,245,0.15)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-sm font-bold"
                  style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}
                >
                  {item.org}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(123,92,245,0.15)', color: '#b89cff', fontFamily: 'var(--font-ibm)' }}
                >
                  {item.date}
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
              >
                {item.detail}
              </p>
              <Footnotes items={item.footnotes} />
            </motion.div>
          ))}
        </div>

        {/* Forward-looking callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="rounded-xl p-7 max-w-3xl"
          style={{ background: '#1E1E35', borderLeft: '3px solid #7B5CF5' }}
        >
          <div
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
          >
            Data Space Readiness
          </div>
          <h3
            className="text-lg font-bold mb-3"
            style={{ fontFamily: 'var(--font-ibm)', color: '#ffffff' }}
          >
            Compliance today. Data space readiness tomorrow.
          </h3>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
          >
            Manufacturing-X<Sup n={2} href={src[2].href} /> — the data space infrastructure for German mechanical
            and electrical engineering — requires suppliers to maintain continuous, machine-readable product records
            across every supply chain tier. Factory-X<Sup n={3} href={src[3].href} /> extends this to the shop
            floor. Participation isn't optional: OEMs and system integrators are already making data space
            connectivity a supplier qualification criterion.<Sup n={4} href={src[4].href} /><Sup n={5} href={src[5].href} />
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}
          >
            The structured product data Pareo helps you generate and validate today is the same data these
            ecosystems will require tomorrow. You're not preparing for compliance — you're building the
            foundation for full data space participation.
          </p>
          <Footnotes items={[{ n: 2, ...src[2] }, { n: 3, ...src[3] }, { n: 4, ...src[4] }, { n: 5, ...src[5] }]} />
        </motion.div>

      </div>
    </section>
  )
}
