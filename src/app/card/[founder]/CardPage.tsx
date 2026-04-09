'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Calendar, Check, Linkedin, Mail, Phone, Shield } from 'lucide-react'
import { DEMO_URL } from '@/lib/constants'
import type { Founder } from '@/lib/founders'
import { companyDescription, websiteUrl } from '@/lib/founders'
import { ObfuscatedLink } from '@/components/ObfuscatedLink'

async function buildVCard(founder: Founder): Promise<string> {
  const nameParts = founder.name.split(' ')
  const lastName = nameParts[nameParts.length - 1]
  const firstName = nameParts.slice(0, -1).join(' ')

  let photoLine = ''
  try {
    const url = `/_next/image?url=${encodeURIComponent(founder.photoUrl)}&w=256&q=80`
    const res = await fetch(url)
    const blob = await res.blob()
    const type = blob.type.includes('png') ? 'PNG' : 'JPEG'
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve((reader.result as string).split(',')[1])
      reader.readAsDataURL(blob)
    })
    photoLine = `PHOTO;ENCODING=b;TYPE=${type}:${base64}`
  } catch {
    // photo is optional — skip if fetch fails
  }

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${founder.name}`,
    `N:${lastName};${firstName};;;`,
    'ORG:Pareo',
    `TITLE:${founder.role}`,
    `EMAIL;TYPE=WORK:${founder.email}`,
    `TEL;TYPE=WORK,VOICE:${founder.phone}`,
    `URL:${websiteUrl}`,
    `X-SOCIALPROFILE;type=linkedin:${founder.linkedin}`,
    `NOTE:${founder.vcardNote}`,
  ]
  if (photoLine) lines.push(photoLine)
  lines.push('END:VCARD')

  return lines.join('\r\n')
}

function downloadVCard(vcf: string, name: string) {
  const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${name.replace(/\s+/g, '_')}.vcf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const OBFUSCATED_ACTIONS = (founder: Founder) => [
  { encoded: btoa(`mailto:${founder.email}`), icon: <Mail className="w-5 h-5" />,     label: 'Email' },
  { encoded: btoa(`tel:${founder.phone}`),    icon: <Phone className="w-5 h-5" />,    label: 'Call'  },
]

const EXTERNAL_ACTIONS = (founder: Founder) => [
  { href: founder.linkedin, icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
]

const DEMO_BULLETS = [
  { icon: <Calendar className="w-4 h-4" />, text: '30 minutes, no pitch deck' },
  { icon: <Check className="w-4 h-4" />,    text: 'Tailored to your situation' },
  { icon: <Shield className="w-4 h-4" />,   text: 'NDA available on request' },
]

export function CardPage({ founder }: { founder: Founder }) {
  const [saved, setSaved]   = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleSaveContact() {
    if (saved || saving) return
    setSaving(true)
    try {
      const vcf = await buildVCard(founder)
      downloadVCard(vcf, founder.name)
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  // ── Shared sub-elements ──────────────────────────────────────────

  const Avatar = ({ size }: { size: number }) => (
    <div
      className="rounded-full overflow-hidden shrink-0 shadow-lg ring-2 ring-primary/30"
      style={{ width: size, height: size }}
    >
      <Image
        src={founder.photoUrl}
        alt={founder.name}
        width={size}
        height={size}
        className="w-full h-full object-cover object-top"
        priority
      />
    </div>
  )

  const SaveButton = ({ fullWidth }: { fullWidth?: boolean }) => (
    <button
      onClick={handleSaveContact}
      disabled={saving}
      className={`
        flex items-center justify-center gap-2 py-3 px-6 rounded-lg
        text-sm font-semibold transition-all duration-200
        ${fullWidth ? 'w-full' : 'w-full max-w-xs'}
        ${saved
          ? 'bg-success text-success-foreground cursor-default'
          : 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]'
        }
      `}
    >
      {saved ? <><Check className="w-4 h-4" /> Contact Saved</> : saving ? 'Saving…' : 'Save Contact'}
    </button>
  )

  const iconClass = 'flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors'
  const iconInner = (icon: React.ReactNode) => (
    <>
      <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:border-primary/50 transition-colors">
        {icon}
      </div>
    </>
  )

  const ActionIcons = () => (
    <div className="flex items-center gap-5">
      {OBFUSCATED_ACTIONS(founder).map(({ encoded, icon, label }) => (
        <ObfuscatedLink key={label} encoded={encoded} aria-label={label} className={iconClass}>
          {iconInner(icon)}
          <span className="text-xs">{label}</span>
        </ObfuscatedLink>
      ))}
      {EXTERNAL_ACTIONS(founder).map(({ href, icon, label }) => (
        <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className={iconClass}>
          {iconInner(icon)}
          <span className="text-xs">{label}</span>
        </a>
      ))}
    </div>
  )

  const CompanySection = () => (
    <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
      <Image src="/PareoAI_Logo_Fade.png" alt="Pareo logo" width={40} height={40} className="opacity-90" />
      <div>
        <h2 className="text-base font-semibold text-foreground">Pareo</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{companyDescription}</p>
      </div>
      <Link href={websiteUrl} target="_blank" rel="noopener noreferrer"
        className="text-sm font-medium text-primary hover:underline">
        Learn more about Pareo →
      </Link>
    </div>
  )

  const DemoSection = () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">Let's talk</p>
        <h2 className="text-base font-bold text-foreground">Book a personal consultation.</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Free and non-binding — let's explore how Pareo fits your compliance setup.
        </p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {DEMO_BULLETS.map(({ icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
              {icon}
            </span>
            {text}
          </li>
        ))}
      </ul>
      <Link href={DEMO_URL} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
        <Calendar className="w-4 h-4" />
        Book a call
      </Link>
      <p className="text-xs text-center text-muted-foreground/60">No spam. We'll reply within one business day.</p>
    </div>
  )

  // ── Mobile layout (< md): three stacked sections ─────────────────
  // ── Desktop layout (≥ md): centred floating card, two columns ────

  return (
    <>
      {/* ── MOBILE ───────────────────────────────────────────────── */}
      <div className="md:hidden min-h-screen bg-background">

        <section className="px-6 py-10">
          <div className="flex flex-col items-center gap-6">
            <Avatar size={96} />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">{founder.name}</h1>
              <p className="mt-1 text-sm font-medium text-primary">{founder.role}</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <Image src="/PareoAI_Logo_Fade.png" alt="Pareo" width={18} height={18} className="opacity-80" />
                <span className="text-sm text-muted-foreground">Pareo</span>
              </div>
            </div>
            <SaveButton />
            <ActionIcons />
          </div>
        </section>

        <section className="px-6 py-12">
          <CompanySection />
        </section>

        <section className="px-6 py-10 bg-card">
          <DemoSection />
        </section>

      </div>

      {/* ── DESKTOP ──────────────────────────────────────────────── */}
      <div className="hidden md:flex min-h-screen items-center justify-center p-[5vw] gradient-purple-bloom bg-background">

        {/* Floating card — scales between 680px and 82vw */}
        <div className="w-[min(82vw,1040px)] min-h-[min(72vh,640px)] bg-card rounded-2xl border border-border shadow-2xl overflow-hidden flex">

          {/* Left column — contact */}
          <div className="w-[min(34%,340px)] shrink-0 border-r border-border flex flex-col items-center justify-center gap-8 px-10 py-14 bg-background/40">
            <Avatar size={140} />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">{founder.name}</h1>
              <p className="mt-1 text-sm font-medium text-primary">{founder.role}</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <Image src="/PareoAI_Logo_Fade.png" alt="Pareo" width={18} height={18} className="opacity-80" />
                <span className="text-sm text-muted-foreground">Pareo</span>
              </div>
            </div>
            <SaveButton fullWidth />
            <ActionIcons />
          </div>

          {/* Right column — company + demo */}
          <div className="flex-1 flex flex-col divide-y divide-border overflow-y-auto">
            <div className="flex-1 px-10 py-12">
              <CompanySection />
            </div>
            <div className="px-10 py-12">
              <DemoSection />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
