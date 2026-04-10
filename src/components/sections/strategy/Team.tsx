import { useTranslations } from 'next-intl'
import Link from 'next/link'

const teamMembers = [
  {
    name: 'Bjørn Schick',
    linkedin: 'https://www.linkedin.com/in/bjoern-schick/',
    initials: 'BS',
  },
  {
    name: 'Angelika Bordunova',
    linkedin: 'https://www.linkedin.com/in/angelika-bordunova/',
    initials: 'AB',
  },
  {
    name: 'Jonathan Kaleve',
    linkedin: 'https://www.linkedin.com/in/jonathan-kaleve/',
    initials: 'JK',
  },
]

export function Team() {
  const t = useTranslations('StrategyTeam')

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">{t('headline')}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('subheadline')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <div key={member.name} className="text-center">
              {/* Avatar placeholder */}
              <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-primary-foreground">{member.initials}</span>
              </div>

              {/* Name and role */}
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-primary font-medium mb-3">{t(`members.${i}.role`)}</p>

              {/* Bio */}
              <p className="text-sm text-muted-foreground mb-4 px-4">{t(`members.${i}.bio`)}</p>

              {/* LinkedIn link */}
              {member.linkedin && (
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  {t('linkedinLabel')}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
