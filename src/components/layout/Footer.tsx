import Link from 'next/link';
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import { CONTACT_EMAIL } from '@/lib/constants';

export function Footer() {
  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
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
              AI-powered compliance automation for industrial manufacturers.
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
          <p
            className="text-center text-xs"
            style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-ibm)' }}
          >
            © {new Date().getFullYear()} Pareo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
