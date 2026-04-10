import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/constants'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  // Hreflang alternates for both locales — present on every locale page.
  const alternates: Metadata['alternates'] = {
    canonical: locale === 'de' ? `${SITE_URL}/de` : SITE_URL,
    languages: {
      en: SITE_URL,
      de: `${SITE_URL}/de`,
      'x-default': SITE_URL,
    },
  }

  if (locale === 'de') {
    return {
      title: {
        default: 'Pareo — KI-gestützte Compliance-Automatisierung',
        template: '%s | Pareo',
      },
      description:
        'Pareo automatisiert Compliance-Anfragen für Industriehersteller. REACH, RoHS, PFAS, TSCA und mehr — vollständig bearbeitet, prüfungsbereit, ohne manuelle Dateneingabe.',
      keywords: [
        'Compliance-Automatisierung',
        'Lieferketten-Compliance',
        'RoHS Konformität',
        'REACH SVHC',
        'SCIP-Datenbank',
        'PFAS Beschränkungen',
        'Konfliktmineralien',
        'KI Dokumentenextraktion',
        'Compliance-Software',
        'Produktkonformität',
        'Lieferanten-Compliance',
        'europäische Hersteller',
        'Automotive Compliance',
        'Elektronik Compliance',
        'IPC-1752A',
        'ECHA Kandidatenliste',
        'CAS-Nummer Validierung',
      ],
      openGraph: {
        type: 'website',
        locale: 'de_DE',
        url: `${SITE_URL}/de`,
        title: 'Pareo — KI-gestützte Compliance-Automatisierung',
        description:
          'Pareo automatisiert Compliance-Anfragen für Industriehersteller. REACH, RoHS, PFAS, TSCA und mehr.',
      },
      alternates,
    }
  }

  // English — extend root defaults with hreflang only.
  return { alternates }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({ children }: Props) {
  return <>{children}</>
}
