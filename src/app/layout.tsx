import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { cookies } from 'next/headers';
import Script from 'next/script';
import '@/styles/globals.css';
import { CookieConsentProvider } from '@/components/CookieConsent';
import { ConditionalSiteLayout } from '@/components/layout/ConditionalSiteLayout';
import { PostHogProvider } from '@/components/PostHogProvider';
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants';

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'compliance automation',
    'supply chain compliance',
    'RoHS compliance',
    'REACH SVHC',
    'SCIP database',
    'PFAS restrictions',
    'conflict minerals',
    'AI document extraction',
    'compliance software',
    'product compliance',
    'supplier compliance',
    'compliance management',
    'European manufacturers',
    'automotive compliance',
    'electronics compliance',
    'IPC-1752A',
    'ECHA candidate list',
    'CAS number validation',
    'compliance data extraction',
  ],
  authors: [{ name: 'Pareo' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    description: 'Contact us for pricing',
  },
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    foundingLocation: 'Munich, Germany',
    sameAs: ['https://github.com/pareo-ai', 'https://linkedin.com/company/pareo-ai'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read locale set by the next-intl middleware (stored in NEXT_LOCALE cookie).
  // Falls back to 'en' for routes outside locale routing (strategy, card, etc.).
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value ?? 'en';
  const messages =
    locale === 'de'
      ? (await import('../../messages/de.json')).default
      : (await import('../../messages/en.json')).default;

  return (
    <html lang={locale} suppressHydrationWarning className={ibmPlex.variable}>
      <head>
        <link rel="preconnect" href="https://js-eu1.hs-scripts.com" />
        <link rel="preconnect" href="https://eu.i.posthog.com" />
        <link rel="preconnect" href="https://sc.lfeeder.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CookieConsentProvider>
          <PostHogProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ConditionalSiteLayout>{children}</ConditionalSiteLayout>
            </NextIntlClientProvider>
          </PostHogProvider>
        </CookieConsentProvider>
        <Analytics />
        <SpeedInsights />
        <Script
          id="hs-script-loader"
          src="https://js-eu1.hs-scripts.com/147054386.js"
          strategy="afterInteractive"
        />
        <Script id="dealfront" strategy="afterInteractive">{`
          (function(ss,ex){
            window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));};
            (function(d,s){
              fs=d.getElementsByTagName(s)[0];
              function ce(src){var cs=d.createElement(s);cs.src=src;cs.async=1;fs.parentNode.insertBefore(cs,fs);};
              ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js');
            })(document,'script');
          })('kn9Eq4R3ZPxaRlvP');
        `}</Script>
      </body>
    </html>
  );
}
