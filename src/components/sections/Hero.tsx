'use client'

import { motion } from 'framer-motion'

export function Hero() {
  const handleDemoClick = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{ background: '#0A0A12' }}
    >
      {/* Purple gradient bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 5% 110%, rgba(123, 92, 245, 0.22) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 95% 0%, rgba(123, 92, 245, 0.07) 0%, transparent 50%)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(123,92,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(123,92,245,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content — vertically centred, takes up full viewport */}
      <div className="relative flex-1 flex flex-col justify-center mx-auto max-w-7xl w-full px-6 lg:px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 flex items-center gap-3"
          >
            <div
              className="h-px w-10"
              style={{ background: '#7B5CF5' }}
            />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
            >
              AI-Powered Compliance
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 leading-[1.05] tracking-tight"
            style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: 'clamp(52px, 7vw, 92px)',
              fontWeight: 800,
            }}
          >
            <span style={{ color: '#ffffff' }}>Every compliance request.</span>
            <br />
            <span style={{ color: '#7B5CF5' }}>Handled. Automatically.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 max-w-2xl leading-relaxed"
            style={{
              fontFamily: 'var(--font-ibm)',
              fontSize: 'clamp(17px, 2.2vw, 22px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.62)',
            }}
          >
            Pareo gives your compliance team an AI workforce that works every request — so your
            engineers stop doing data entry. Incoming requests in any format — email, Excel, portal
            notification — are automatically ingested, matched against your ERP and product data,
            and returned as validated, audit-ready responses. REACH, RoHS, PFAS, TSCA and more.
            Directly into Assent, CDX, or any format your customer requires.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.52 }}
          >
            <button
              onClick={handleDemoClick}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold text-white transition-all duration-200"
              style={{
                background: '#7B5CF5',
                fontFamily: 'var(--font-ibm)',
                boxShadow: '0 0 32px rgba(123, 92, 245, 0.35)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#6d4ee0'
                e.currentTarget.style.boxShadow = '0 0 48px rgba(123, 92, 245, 0.5)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#7B5CF5'
                e.currentTarget.style.boxShadow = '0 0 32px rgba(123, 92, 245, 0.35)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Request Demo
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust strip — pinned to bottom of viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative border-t"
        style={{ borderColor: 'rgba(123, 92, 245, 0.12)' }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <p
            className="text-center text-xs mb-4"
            style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-ibm)', letterSpacing: '0.04em' }}
          >
            Built with 180+ interviews across industrial compliance teams.
            Incubated at TUM &amp; UnternehmerTUM.
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {['TUM', 'UnternehmerTUM', 'XPLORE'].map((name) => (
              <span
                key={name}
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-ibm)' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
