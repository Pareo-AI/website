export const SUPPORTED_LANGUAGES = ['en', 'de'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: Language = 'en'

export const CONTACT_EMAIL = 'hello@pareo.ai' as const
export const SUPPORT_EMAIL = 'support@pareo.ai' as const

export const SITE_NAME = 'Pareo' as const
export const SITE_DESCRIPTION = 'AI agents that automate compliance data extraction from supplier documents - turning weeks of manual work into hours. RoHS, REACH, SCIP, PFAS support for European manufacturers.' as const

export const GITHUB_URL = 'https://github.com/pareo-ai' as const
export const LINKEDIN_URL = 'https://linkedin.com/company/pareo-ai' as const
