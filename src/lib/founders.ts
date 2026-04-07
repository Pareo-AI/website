export interface Founder {
  key: string
  name: string
  role: string
  email: string
  phone: string
  linkedin: string
  vcardNote: string
  initials: string
  photoUrl: string
}

export const founders: Record<string, Founder> = {
  angelika: {
    key: 'angelika',
    name: 'Angelika Bordunova',
    role: 'Co-Founder',
    email: 'angelika@pareo.ai',
    phone: '+491722033742',
    linkedin: 'https://www.linkedin.com/in/angelika-bordunova',
    vcardNote: 'Pareo: AI compliance automation for manufacturing.',
    initials: 'AB',
    photoUrl: '/team/Angelika.jpg',
  },
  bjoern: {
    key: 'bjoern',
    name: 'Bjørn Angelo Schick',
    role: 'Co-Founder',
    email: 'bjoern@pareo.ai',
    phone: '+4915173038393',
    linkedin: 'https://www.linkedin.com/in/bjoern-schick/',
    vcardNote: 'Pareo: AI compliance automation for manufacturing.',
    initials: 'BS',
    photoUrl: '/team/Bjoern.jpg',
  },
  jonathan: {
    key: 'jonathan',
    name: 'Jonathan Kaleve',
    role: 'Co-Founder',
    email: 'jonathan@pareo.ai',
    phone: '+4915121576888',
    linkedin: 'https://www.linkedin.com/in/jonathan-kaleve/',
    vcardNote: 'Pareo: AI compliance automation for manufacturing.',
    initials: 'JK',
    photoUrl: '/team/Jonathan.jpg',
  },
}

export const companyDescription =
  'Pareo builds AI agents that automate compliance data extraction from supplier documents — turning weeks of manual work into hours. We support RoHS, REACH, SCIP, PFAS, and more for European manufacturers.'

export const websiteUrl = 'https://pareo.ai'
