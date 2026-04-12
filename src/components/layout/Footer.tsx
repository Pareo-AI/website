'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import { CONTACT_EMAIL } from '@/lib/constants';

export function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();

  const legalLinks = [
    { name: t('legal.impressum'), href: '/impressum' },
    { name: t('legal.privacy'), href: '/privacy' },
    { name: t('legal.terms'), href: '/terms' },
    { name: t('legal.cookies'), href: '/cookies' },
  ];

  return (
    <footer
      className="border-t"
      style={{ background: '#0A0A12', borderColor: 'rgba(123,92,245,0.1)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-ibm)', color: '#ffffff' }}
            >
              Pareo
            </span>
            <p
              className="text-xs mt-1"
              style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}
            >
              {t('tagline')}
            </p>
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            {legalLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs transition-colors"
                style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}
              >
                {link.name}
              </Link>
            ))}
            {CONTACT_EMAIL && (
              <ObfuscatedEmail
                encoded={Buffer.from(CONTACT_EMAIL).toString('base64')}
                className="text-xs transition-colors"
                style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ibm)' }}
              />
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(123,92,245,0.08)' }}>
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded px-4 py-3">
              <Image
                src={locale === 'de' ? '/funding-de.svg' : '/funding-en.svg'}
                alt={t('funding.alt')}
                width={400}
                height={60}
                style={{ height: '48px', width: 'auto' }}
              />
            </div>
          </div>
          <p
            className="text-center text-xs"
            style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-ibm)' }}
          >
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
