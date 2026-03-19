'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Product', href: '#product' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleAnchorClick = (href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(10, 10, 18, 0.92)'
          : 'rgba(10, 10, 18, 0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(123, 92, 245, 0.15)' : '1px solid transparent',
      }}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/PareoAI_Logo_Fade.png"
              alt="Pareo"
              width={36}
              height={36}
              className="h-9 w-auto"
            />
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-ibm)', color: '#ffffff' }}
            >
              Pareo
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleAnchorClick(item.href)}
                className="text-sm font-medium transition-colors cursor-pointer"
                style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-ibm)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex">
            <button
              onClick={() => handleAnchorClick('#contact')}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 cursor-pointer"
              style={{
                background: '#7B5CF5',
                fontFamily: 'var(--font-ibm)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#6d4ee0')}
              onMouseLeave={e => (e.currentTarget.style.background = '#7B5CF5')}
            >
              Request Demo
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-md"
            style={{ color: 'rgba(255,255,255,0.8)' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden py-4 space-y-1 border-t"
            style={{ borderColor: 'rgba(123, 92, 245, 0.15)' }}
          >
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleAnchorClick(item.href)}
                className="block w-full text-left py-3 px-2 text-sm font-medium rounded-md transition-colors cursor-pointer"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ibm)' }}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => handleAnchorClick('#contact')}
                className="w-full px-5 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer"
                style={{ background: '#7B5CF5', fontFamily: 'var(--font-ibm)' }}
              >
                Request Demo
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
