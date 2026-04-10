'use client'

import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/ui/Reveal'
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

// ─── Section ──────────────────────────────────────────────────────────────────

export function Regulations() {
  const t = useTranslations('StrategyRegulations')

  const oemGroups = [
    {
      sector: t('oemGroups.0.sector'),
      cards: [
        {
          org: 'Siemens · Philips · Schneider Electric · TE Connectivity',
          date: t('oemCards.0.0.date'),
          detail: <>{t('oemCards.0.0.detail_a')}<Citation n={4} {...src[4]} /></>,
        },
        {
          org: 'Intel',
          date: t('oemCards.0.1.date'),
          detail: <>{t('oemCards.0.1.detail_a')}<Citation n={5} {...src[5]} /></>,
        },
      ],
    },
    {
      sector: t('oemGroups.1.sector'),
      cards: [
        {
          org: 'BMW Group',
          date: t('oemCards.1.0.date'),
          detail: <>{t('oemCards.1.0.detail_a')}<Citation n={6} {...src[6]} /></>,
        },
        {
          org: 'Ford',
          date: t('oemCards.1.1.date'),
          detail: <>{t('oemCards.1.1.detail_a')}<Citation n={7} {...src[7]} /></>,
        },
      ],
    },
    {
      sector: t('oemGroups.2.sector'),
      cards: [
        {
          org: 'VDMA + ZVEI',
          date: t('oemCards.2.0.date'),
          detail: <>{t('oemCards.2.0.detail_a')}<Citation n={8} {...src[8]} /> {t('oemCards.2.0.detail_b')}</>,
        },
        {
          org: 'Factory-X',
          date: t('oemCards.2.1.date'),
          detail: <>{t('oemCards.2.1.detail_a')}<Citation n={3} {...src[3]} /> {t('oemCards.2.1.detail_b')}</>,
        },
      ],
    },
  ]

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
              {t('eyebrow')}
            </span>
          </div>
          <h2 className="mb-4 leading-tight" style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 800, color: '#ffffff' }}>
            {t('headline1')}{' '}
            <span style={{ color: '#7B5CF5' }}>{t('headline2')}</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            {t('subheadline').split('Manufacturing-X')[0]}Manufacturing-X<Citation n={2} {...src[2]} />
            {t('subheadline').split('Manufacturing-X')[1]?.split('Factory-X')[0]}Factory-X<Citation n={3} {...src[3]} />
            {t('subheadline').split('Factory-X')[1]}
          </p>
        </div>

        {/* Regulation pills */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-3">
            {regulations.map((reg, i) => (
              <Reveal
                key={reg.name}
                variant="scale"
                delay={i * 50}
                threshold={0.2}
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
                    {t('soonLabel')}
                  </span>
                )}
              </Reveal>
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
                  <Reveal
                    key={i}
                    delay={i * 80}
                    threshold={0.3}
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
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Forward-looking callout */}
        <Reveal
          threshold={0.5}
          className="rounded-xl p-7 max-w-3xl"
          style={{ background: '#1E1E35', borderLeft: '3px solid #7B5CF5' }}
        >
          <div className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
            {t('forwardLabel')}
          </div>
          <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-ibm)', color: '#ffffff' }}>
            {t('forwardHeadline')}
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            {t('forwardBody1_a')}<Citation n={11} {...src[11]} /> {t('forwardBody1_b')}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            {t('forwardBody2')}
          </p>
        </Reveal>

      </div>
    </section>
  )
}
