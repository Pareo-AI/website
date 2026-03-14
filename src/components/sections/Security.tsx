'use client'

import { motion } from 'framer-motion'

const badges = [
  {
    icon: '🇩🇪',
    label: 'Made in Germany',
    detail: 'Built and operated in Germany, under German and EU law.',
  },
  {
    icon: '🔒',
    label: 'DSGVO Compliant',
    detail: 'Fully compliant with EU data protection regulation.',
  },
  {
    icon: '🚫',
    label: 'No model training on your data',
    detail: 'Your product and compliance data is never used to train AI models — by Pareo or any third party.',
  },
  {
    icon: '🏗️',
    label: 'Isolated infrastructure',
    detail: 'Deployed in a dedicated VPC. Your data never shares infrastructure with other customers.',
  },
]

export function Security() {
  return (
    <section
      id="security"
      className="py-24 border-t"
      style={{ background: '#0A0A12', borderColor: 'rgba(123,92,245,0.1)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
              Your Data is Safe With Us
            </span>
          </div>
          <h2 className="mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 800, color: '#ffffff' }}>
            Compliance data is sensitive.{' '}
            <span style={{ color: '#7B5CF5' }}>We treat it that way.</span>
          </h2>
          <p className="text-base"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
            Pareo is designed for regulated industrial environments — where data sovereignty, auditability, and control aren't optional.
          </p>
        </div>

        {/* Badge cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-start p-6 rounded-xl"
              style={{
                background: '#16162A',
                border: '1px solid rgba(123,92,245,0.15)',
              }}
            >
              <div className="text-3xl mb-4">{badge.icon}</div>
              <div className="text-sm font-bold mb-2"
                style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}>
                {badge.label}
              </div>
              <p className="text-xs leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                {badge.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
