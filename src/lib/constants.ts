export const SUPPORTED_LANGUAGES = ['en', 'de'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: Language = 'en'

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL!
export const SUPPORT_EMAIL = CONTACT_EMAIL

export const SITE_NAME = 'Pareo' as const
export const SITE_DESCRIPTION = 'AI agents that automate compliance data extraction from supplier documents - turning weeks of manual work into hours. RoHS, REACH, SCIP, PFAS support for European manufacturers.' as const
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!

export const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL!
export const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL!

export const DEMO_URL = '/contact'
