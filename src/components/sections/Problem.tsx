'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Citation } from '@/components/ui/Citation'

// ─── Sources ──────────────────────────────────────────────────────────────────

const src = {
  1: { label: 'EU Data Act — Morgan Lewis, Sep 2025', href: 'https://www.morganlewis.com/blogs/sourcingatmorganlewis/2025/09/eu-data-act-begins-september-12-impacting-cloud-services-connected-products-and-other-data-industries' },
  2: { label: 'Manufacturing-X — BMWK', href: 'https://www.bundeswirtschaftsministerium.de/Redaktion/EN/Dossier/manufacturing-x.html' },
  3: { label: 'Factory-X — SAP News, Sep 2025', href: 'https://news.sap.com/2025/09/factory-x-driving-mechanical-engineering-digitalization/' },
  4: { label: 'BMW Group mandate — BMW Newsroom, 2025', href: 'https://www.bmwgroup.com/en/news/general/2025/catena-x-connects-digital-supply-chains.html' },
  5: { label: 'Ford & BMW contracts — Plattform Industrie 4.0, Apr 2025', href: 'https://plattformindustrie40.at/en/blog/2025/04/07/operational-use-of-catena-x-in-the-automotive-industry/' },
  6: { label: 'VW, Mercedes-Benz — Catena-X Newsroom, IAA 2025', href: 'https://catena-x.net/news/catena-x-reaches-turning-point-industry-leaders-confirm-commitment-at-iaa/' },
  7: { label: 'EU Battery Regulation 2023/1542 — TÜV Rheinland', href: 'https://www.tuv.com/landingpage/en/eu-new-battery-regulation-eu-2023-1542/' },
} as const

// ─── Scroll steps ─────────────────────────────────────────────────────────────

type Step = { visual: number; content: React.ReactNode }

const steps: Step[] = [
  {
    visual: 1,
    content: (
      <>
        The EU Data Act entered into force in January 2024.<Citation n={1} {...src[1]} /> From
        September 2025, connected product manufacturers are legally required to make product usage
        data accessible and shareable across the EU single market.<Citation n={1} {...src[1]} />{' '}
        Structured, interoperable data is no longer optional — it is a legal obligation.
      </>
    ),
  },
  {
    visual: 2,
    content: (
      <>
        Manufacturing-X — backed by €140 million in federal funding from BMWK<Citation n={2} {...src[2]} /> —
        is building the cross-sector data space infrastructure for European manufacturing. 115+
        companies across 12 industry sectors are already participating.<Citation n={2} {...src[2]} />{' '}
        Factory-X, led by Siemens and SAP, moves into its operational phase in mid-2026.<Citation n={3} {...src[3]} />
      </>
    ),
  },
  {
    visual: 3,
    content: (
      <>
        BMW Group made data space participation mandatory for all suppliers in April 2025.<Citation n={4} {...src[4]} />{' '}
        Ford included it in supplier contract terms in July 2024.<Citation n={5} {...src[5]} />{' '}
        Volkswagen has publicly committed.<Citation n={6} {...src[6]} /> Mercedes-Benz has called
        it "the new standard of the automotive industry."<Citation n={6} {...src[6]} />
      </>
    ),
  },
  {
    visual: 4,
    content: (
      <>
        The EU Battery Passport — the first hard Digital Product Passport deadline — requires all EV
        and industrial batteries to carry a machine-readable product record from February 2027.<Citation n={7} {...src[7]} />{' '}
        Electronics, machinery, and other sectors follow under the Ecodesign for Sustainable
        Products Regulation.
      </>
    ),
  },
  {
    visual: 5,
    content: (
      <>
        Every one of these initiatives requires the same thing: structured, validated,
        machine-readable product data at every supply chain tier. Most suppliers store that data in
        ERP silos, shared drives, and email threads. It cannot participate.
      </>
    ),
  },
]

// ─── Stat cards ───────────────────────────────────────────────────────────────

const stats = [
  {
    number: '€140M',
    label: 'BMWK Investment',
    body: <>Federal funding committed to Manufacturing-X — the data space infrastructure for German mechanical and electrical engineering.<Citation n={2} {...src[2]} /></>,
  },
  {
    number: 'Apr 2025',
    label: 'BMW Group Mandate',
    body: <>BMW Group made Catena-X data space participation mandatory for all suppliers.<Citation n={4} {...src[4]} /> Ford required it in contracts from July 2024.<Citation n={5} {...src[5]} /></>,
  },
  {
    number: 'Feb 2027',
    label: 'Battery Passport',
    body: <>First hard DPP deadline under EU law: all EV and industrial batteries placed on the EU market must carry a machine-readable Digital Product Passport.<Citation n={7} {...src[7]} /></>,
  },
]

// ─── Timeline visual ──────────────────────────────────────────────────────────

const timelineEvents = [
  { date: 'Jan 2024', label: 'EU Data Act', detail: 'Enters into force' },
  { date: 'Jul 2024', label: 'Ford', detail: 'Catena-X required in supplier contracts' },
  { date: 'Apr 2025', label: 'BMW Group', detail: 'Catena-X mandatory for all suppliers' },
  { date: 'Sep 2025', label: 'EU Data Act', detail: 'Fully applies — data sharing obligations active' },
  { date: 'Mid-2026', label: 'Manufacturing-X', detail: 'Moves from development to operational' },
  { date: 'Feb 2027', label: 'EU Battery Passport', detail: 'Mandatory for all EV & industrial batteries' },
  { date: '2027–28', label: 'DPP expands', detail: 'Textiles, electronics, machinery' },
]

function TimelineVisual() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: '#0D0D1A', border: '1px solid rgba(123,92,245,0.2)', minHeight: '340px' }}
    >
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
          Mandate Timeline
        </span>
        <div style={{ width: 56 }} />
      </div>

      <div className="px-5 py-5">
        {timelineEvents.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="flex items-start gap-3 relative"
          >
            {i < timelineEvents.length - 1 && (
              <div
                className="absolute"
                style={{ left: '60px', top: '20px', width: '1px', height: '100%', background: 'rgba(123,92,245,0.18)' }}
              />
            )}
            <div className="shrink-0 w-14 pt-1 text-right">
              <span className="text-xs font-bold" style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
                {event.date}
              </span>
            </div>
            <div
              className="shrink-0 mt-1.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: 'rgba(123,92,245,0.5)', background: '#0D0D1A' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#7B5CF5' }} />
            </div>
            <div className="flex-1 pb-4">
              <div className="text-xs font-semibold" style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}>
                {event.label}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'var(--font-ibm)' }}>
                {event.detail}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Scroll step ──────────────────────────────────────────────────────────────

function ScrollStep({ step, index }: { step: Step; index: number }) {
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
          {step.content}
        </p>
      </motion.div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Problem() {
  return (
    <section style={{ background: '#0D0D1A' }} className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-8">

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
              The Stakes
            </span>
          </div>
          <h2
            className="leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 800, color: '#ffffff' }}
          >
            A new industrial data economy is being mandated. Most suppliers aren't ready.
          </h2>
        </div>

        <div className="mb-16 rounded-xl p-7 max-w-3xl" style={{ background: '#16162A', borderLeft: '3px solid #7B5CF5' }}>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            When SI units replaced regional measurement systems in the 19th century, cross-border
            trade and engineering collaboration accelerated beyond what had been possible before.
            The same structural shift is happening to industrial data today — driven by the EU Data
            Act,<Citation n={1} {...src[1]} /> Manufacturing-X,<Citation n={2} {...src[2]} /> and
            the Digital Product Passport.<Citation n={7} {...src[7]} /> A unified, machine-readable
            data layer for European manufacturing is being built. Most suppliers aren't ready for it.
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            This isn't a future risk. OEM mandates are already written into supplier contracts.<Citation n={4} {...src[4]} /><Citation n={5} {...src[5]} />{' '}
            Regulatory deadlines are fixed in EU law.<Citation n={7} {...src[7]} /> The data
            infrastructure gap — product data locked in ERP systems, shared drives, and email
            threads — is a qualification risk today.
          </p>
        </div>

        {/* Scrollytelling — desktop */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <TimelineVisual />
            </div>
          </div>
          <div>
            {steps.map((step, i) => (
              <ScrollStep key={i} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile stacked */}
        <div className="lg:hidden space-y-12 mb-24">
          {steps.map((step, i) => (
            <div key={i}>
              <div className="text-5xl font-bold mb-3" style={{ color: 'rgba(123,92,245,0.25)', fontFamily: 'var(--font-ibm)' }}>
                0{i + 1}
              </div>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                {step.content}
              </p>
            </div>
          ))}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="p-7 rounded-xl" style={{ background: '#16162A', border: '1px solid rgba(123,92,245,0.15)' }}>
              <div className="text-4xl font-extrabold mb-1 leading-none" style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
                {stat.number}
              </div>
              <div className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}>
                {stat.label}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                {stat.body}
              </p>
            </div>
          ))}
        </div>

        <div className="pb-16 text-center">
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            The answer isn't a compliance tool. It's building the data infrastructure that makes
            your products qualifiable, traceable, and ready for every data space that will demand them.
          </p>
        </div>

      </div>
    </section>
  )
}
