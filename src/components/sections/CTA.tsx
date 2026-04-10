'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail'
import { TurnstileWidget } from '@/components/TurnstileWidget'

export function CTA() {
  const t = useTranslations('CTA')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message, turnstileToken }),
      })
      if (response.ok) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const bullets = [
    { icon: '🎯', title: t('bullets.0.title'), detail: t('bullets.0.detail') },
    { icon: '⏱', title: t('bullets.1.title'), detail: t('bullets.1.detail') },
    { icon: '🔒', title: t('bullets.2.title'), detail: t('bullets.2.detail') },
  ]

  return (
    <section
      id="contact"
      className="py-24 border-t"
      style={{ background: '#0A0A12', borderColor: 'rgba(123,92,245,0.1)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: '#7B5CF5' }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}>
                {t('eyebrow')}
              </span>
            </div>
            <h2 className="mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-ibm)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#ffffff' }}>
              {t('headline')}
            </h2>
            <p className="text-base leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
              {t('subheadline')}
            </p>

            {/* What to expect */}
            <div className="space-y-4">
              {bullets.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-base"
                    style={{ background: 'rgba(123,92,245,0.1)', border: '1px solid rgba(123,92,245,0.2)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-0.5"
                      style={{ color: '#ffffff', fontFamily: 'var(--font-ibm)' }}>
                      {item.title}
                    </div>
                    <div className="text-sm"
                      style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl p-8" style={{ background: '#16162A', border: '1px solid rgba(123,92,245,0.15)' }}>
            {submitted ? (
              <div className="text-center py-8 animate-scale-sm-in">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-ibm)', color: '#ffffff' }}>
                  {t('form.successTitle')}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-ibm)', fontWeight: 300 }}>
                  {t('form.successBody')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium mb-2"
                    style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}>
                    {t('form.nameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('form.namePlaceholder')}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(123,92,245,0.2)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-ibm)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2"
                    style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}>
                    {t('form.emailLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('form.emailPlaceholder')}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(123,92,245,0.2)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-ibm)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2"
                    style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}>
                    {t('form.companyLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={t('form.companyPlaceholder')}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(123,92,245,0.2)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-ibm)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.2)')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2"
                    style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ibm)' }}>
                    {t('form.messageLabel')}{' '}
                    <span style={{ color: 'rgba(255,255,255,0.25)' }}>{t('form.messageOptional')}</span>
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('form.messagePlaceholder')}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(123,92,245,0.2)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-ibm)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.5)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(123,92,245,0.2)')}
                  />
                </div>
                <TurnstileWidget
                  onVerify={setTurnstileToken}
                  onExpire={() => setTurnstileToken('')}
                />
                <button
                  type="submit"
                  disabled={loading || !turnstileToken}
                  className="w-full py-3.5 rounded-lg text-sm font-semibold text-white transition-all"
                  style={{
                    background: loading || !turnstileToken ? 'rgba(123,92,245,0.5)' : '#7B5CF5',
                    fontFamily: 'var(--font-ibm)',
                    cursor: loading || !turnstileToken ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={e => !loading && !!turnstileToken && (e.currentTarget.style.background = '#6d4ee0')}
                  onMouseLeave={e => !loading && !!turnstileToken && (e.currentTarget.style.background = '#7B5CF5')}
                >
                  {loading ? t('form.submitting') : t('form.submit')}
                </button>
                {error && (
                  <p className="text-xs text-center" style={{ color: '#f87171', fontFamily: 'var(--font-ibm)' }}>
                    {t('form.errorMessage')}{' '}
                    <ObfuscatedEmail encoded="aGVsbG9AcGFyZW8uYWk=" style={{ color: '#f87171' }} />.
                  </p>
                )}
                <p className="text-xs text-center"
                  style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-ibm)' }}>
                  {t('form.noSpam')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
