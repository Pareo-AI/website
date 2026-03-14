import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import '@/styles/globals.css'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PostHogProvider } from '@/components/PostHogProvider'

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
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
    'compliance data extraction'
  ],
  authors: [{ name: 'Pareo' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.svg'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={ibmPlex.variable}>
      <body>
        <PostHogProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  )
}
