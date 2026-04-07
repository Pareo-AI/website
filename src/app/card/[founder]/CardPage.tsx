'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Calendar, Check, Linkedin, Mail, Phone, Shield } from 'lucide-react'
import { DEMO_URL } from '@/lib/constants'
import type { Founder } from '@/lib/founders'
import { companyDescription, websiteUrl } from '@/lib/founders'

async function buildVCard(founder: Founder): Promise<string> {
  const nameParts = founder.name.split(' ')
  const lastName = nameParts[nameParts.length - 1]
  const firstName = nameParts.slice(0, -1).join(' ')

  // Use Next.js image optimisation to get a small JPEG for embedding in the vCard
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

export function CardPage({ founder }: { founder: Founder }) {
  const [saved, setSaved] = useState(false)
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

  return (
    <div className="min-h-screen bg-background">

      {/* ── Layer 1: Contact Save ────────────────────────────────── */}
      <section className="px-6 py-10">
        <div className="flex flex-col items-center gap-6">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 shadow-lg ring-2 ring-primary/30">
            <Image
              src={founder.photoUrl}
              alt={founder.name}
              width={96}
              height={96}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>

          {/* Identity */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">{founder.name}</h1>
            <p className="mt-1 text-sm font-medium text-primary">{founder.role}</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <Image
                src="/PareoAI_Logo_Fade.png"
                alt="Pareo"
                width={20}
                height={20}
                className="opacity-80"
              />
              <span className="text-sm text-muted-foreground">Pareo</span>
            </div>
          </div>

          {/* Save Contact CTA */}
          <button
            onClick={handleSaveContact}
            disabled={saving}
            className={`
              w-full max-w-xs flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg
              text-sm font-semibold transition-all duration-200
              ${saved
                ? 'bg-success text-success-foreground cursor-default'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]'
              }
            `}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Contact Saved
              </>
            ) : saving ? (
              'Saving…'
            ) : (
              'Save Contact'
            )}
          </button>

          {/* Quick-action icons */}
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${founder.email}`}
              aria-label="Send email"
              className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary/50 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs">Email</span>
            </a>

            <a
              href={`tel:${founder.phone}`}
              aria-label="Call"
              className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary/50 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs">Call</span>
            </a>

            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary/50 transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <span className="text-xs">LinkedIn</span>
            </a>
          </div>

        </div>
      </section>

      {/* ── Layer 2: Company Context ─────────────────────────────── */}
      <section className="px-6 py-14">
        <div className="max-w-sm mx-auto flex flex-col items-center gap-5 text-center">
          <Image
            src="/PareoAI_Logo_Fade.png"
            alt="Pareo logo"
            width={48}
            height={48}
            className="opacity-90"
          />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Pareo</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {companyDescription}
            </p>
          </div>
          <Link
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            Learn more about Pareo →
          </Link>
        </div>
      </section>

      {/* ── Layer 3: Book a Demo ─────────────────────────────────── */}
      <section className="px-6 py-10 bg-card">
        <div className="max-w-sm mx-auto flex flex-col gap-5">

          <div>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Let's talk</p>
            <h2 className="text-lg font-bold text-foreground">Book a personal consultation.</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Free and non-binding — let's explore how Pareo fits your compliance setup.
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {[
              { icon: <Calendar className="w-4 h-4" />, text: '30 minutes, no pitch deck' },
              { icon: <Check className="w-4 h-4" />,    text: 'Tailored to your situation' },
              { icon: <Shield className="w-4 h-4" />,   text: 'NDA available on request' },
            ].map(({ icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {icon}
                </span>
                {text}
              </li>
            ))}
          </ul>

          <Link
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Book a call
          </Link>

          <p className="text-xs text-center text-muted-foreground/60">
            No spam. We'll reply within one business day.
          </p>
        </div>
      </section>

    </div>
  )
}
