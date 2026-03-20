'use client'

import { motion } from 'framer-motion'
import { Citation } from '@/components/ui/Citation'

// ─── Sources ──────────────────────────────────────────────────────────────────

const src = {
  2: { label: 'Manufacturing-X — BMWK', href: 'https://www.bundeswirtschaftsministerium.de/Redaktion/EN/Dossier/manufacturing-x.html' },
  3: { label: 'Factory-X — Fraunhofer ISST', href: 'https://www.isst.fraunhofer.de/en/departments/industrial-manufacturing/projects/factory-x.html' },
  4: { label: 'BOMcheck — Siemens, Philips, Schneider Electric, TE Connectivity coalition', href: 'https://www.bomcheck.net/en/suppliers/regulatory-compliance-declaration-tool' },
  5: { label: 'Intel IPC-1752A supplier requirement', href: 'https://www.intel.com/content/dam/www/public/us/en/documents/supplier/environment/supplier-training.pdf' },
  6: { label: 'BMW Group mandate — BMW Newsroom, 2025', href: 'https://www.bmwgroup.com/en/news/general/2025/catena-x-connects-digital-supply-chains.html' },
  7: { label: 'Ford contracts — Plattform Industrie 4.0, Apr 2025', href: 'https://plattformindustrie40.at/en/blog/2025/04/07/operational-use-of-catena-x-in-the-automotive-industry/' },
  8: { label: 'ZVEI & VDMA — Manufacturing-X Data Space Study, Fraunhofer ISST, Aug 2023', href: 'https://www.zvei.org/fileadmin/user_upload/Presse_und_Medien/Pressebereich/2023_059_Manufacturing_X/Manufacturing-X_Data_Space_Study_ZVEI-VDMA-Fraunhofer.pdf' },
  11: { label: 'EU Environmental Omnibus — SCIP repeal proposal, Mayer Brown, Dec 2025', href: 'https://www.mayerbrown.com/en/insights/publications/2025/12/european-commission-presents-environmental-omnibus-news-for-epr-scip-industrial-emissions-and-environmental-assessments' },
} as const

// ─── Data ─────────────────────────────────────────────────────────────────────

const regulations = [
  { name: 'REACH SVHC', theme: 'Chemical Substances', flag: '🇪🇺', active: true },
  { name: 'RoHS', theme: 'Electrical / Electronic', flag: '🇪🇺', active: true },
  { name: 'PFAS', theme: 'Chemical Substances', flag: '🇪🇺🇺🇸', active: true },
  { name: 'SCIP', theme: 'Chemical Substances', flag: '🇪🇺', active: true },
  { name: 'EU Data Act', theme: 'Industrial Data', flag: '🇪🇺', active: true },
  { name: 'Conflict Minerals', theme: 'Trade & Conflict', flag: '🇪🇺🇺🇸', active: true },
  { name: 'Ecodesign / ESPR', theme: 'Sustainability', flag: '🇪🇺', active: true },
  { name: 'CSRD', theme: 'Sustainability Reporting', flag: '🇪🇺', active: true },
  { name: 'EU Battery Regulation', theme: 'Electrical / Electronic', flag: '🇪🇺', active: true },
  { name: 'IPC-1752', theme: 'Electrical / Electronic', flag: '🌐', active: true },
  { name: 'TSCA', theme: 'Chemical Substances', flag: '🇺🇸', active: true },
  { name: 'California Prop. 65', theme: 'Chemical Substances', flag: '🇺🇸', active: true },
  { name: 'Digital Product Passport', theme: 'Sustainability', flag: '🇪🇺', active: false },
]

type OemCard = {
  org: string
  date: string
  detail: React.ReactNode
}

type OemGroup = {
  sector: string
  cards: OemCard[]
}

const oemGroups: OemGroup[] = [
  {
    sector: 'Electronics & industrial OEMs — required today',
    cards: [
      {
        org: 'Siemens · Philips · Schneider Electric · TE Connectivity',
        date: 'In effect',
        detail: <>BOMcheck — co-founded by Siemens, Philips, and GE Healthcare — requires suppliers to submit RoHS and REACH declarations at component level. 480+ OEM members, 3,100+ suppliers. Structured material data is the entry requirement for most electronics supply chains.<Citation n={4} {...src[4]} /></>,
      },
      {
        org: 'Intel',
        date: 'In effect',
        detail: <>Intel requires IPC-1752A Class C or Class D (Full Material Disclosure) from all component suppliers via its Environmental Compliance Portal. A contractual condition, not an aspiration.<Citation n={5} {...src[5]} /></>,
      },
    ],
  },
  {
    sector: 'Automotive supply chains (Catena-X)',
    cards: [
      {
        org: 'BMW Group',
        date: 'April 2025',
        detail: <>Catena-X data space registration mandatory for all suppliers as part of the BMW Group procurement process.<Citation n={6} {...src[6]} /></>,
      },
      {
        org: 'Ford',
        date: 'July 2024',
        detail: <>Catena-X included in supplier contract terms. Relevant for any electronics manufacturer supplying into automotive.<Citation n={7} {...src[7]} /></>,
      },
    ],
  },
  {
    sector: 'Cross-industry data spaces (2026 onward)',
    cards: [
      {
        org: 'VDMA + ZVEI',
        date: 'Co-Founding Members',
        detail: <>Co-founders of Manufacturing-X alongside BMWK, representing 4,500+ machinery and electrical/electronic manufacturers. "Small and medium-sized companies in particular will be able to exchange their data more easily and share it with third parties on an equal footing."<Citation n={8} {...src[8]} /> — Gunther Koschnick, ZVEI, 2023</>,
      },
      {
        org: 'Factory-X',
        date: 'Jan 2024 – Jun 2026',
        detail: <>Led by Siemens and SAP with 40+ consortium partners: TRUMPF, Phoenix Contact, Festo, SICK, DMG MORI, and others.<Citation n={3} {...src[3]} /> Structured product data connectivity is a built-in participation requirement from day one.</>,
      },
    ],
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

        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
              The Regulatory Shift
            </span>
          </div>
          <h2 className="mb-4 leading-tight" style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 800, color: '#ffffff' }}>
            The rules keep expanding.{' '}
            <span style={{ color: '#7B5CF5' }}>So does what your data must do.</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            Compliance obligations are growing — but the bigger shift is structural. The EU Data Act
            establishes rights and obligations around industrial data sharing across the single market.
            Manufacturing-X<Citation n={2} {...src[2]} /> is building the data space infrastructure
            where machine builders, electrical equipment manufacturers, and their supply chains exchange
            product data automatically. Factory-X<Citation n={3} {...src[3]} /> extends this to the
            shop floor. Every one of these initiatives requires the same thing: your product data,
            structured and interoperable.
          </p>
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
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', fontSize: '10px' }}>
                    Soon
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* OEM mandate cards — grouped by sector */}
        <div className="mb-10 space-y-8 max-w-4xl">
          {oemGroups.map((group, gi) => (
            <div key={gi}>
              <div
                className="text-xs font-semibold uppercase tracking-[0.16em] mb-4"
                style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}
              >
                {group.sector}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.cards.map((item, i) => (
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
                      <span className="text-sm font-bold" style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}>
                        {item.org}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(123,92,245,0.15)', color: '#b89cff', fontFamily: 'var(--font-ibm)' }}>
                        {item.date}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
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
          <div className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
            Where this is heading
          </div>
          <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-ibm)', color: '#ffffff' }}>
            The compliance obligations you handle today are being replaced by something harder.
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            In December 2025, the European Commission proposed repealing the SCIP database — citing
            15 million submissions that were "administratively costly but not effective" — and
            replacing it with the Digital Product Passport.<Citation n={11} {...src[11]} /> The DPP
            requires the same substance and material data, but in a machine-readable, standardised
            format that any system in the supply chain can query automatically.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            The structured product data Pareo generates for today's RoHS, REACH, and SCIP
            obligations maps directly to what the DPP will require. Every compliance request handled
            now is a building block for the infrastructure that replaces it.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
