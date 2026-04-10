import { useTranslations } from 'next-intl'
import { Linkedin } from 'lucide-react'
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
                  <Linkedin className="h-4 w-4" />
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
