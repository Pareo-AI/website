import { Linkedin } from 'lucide-react'
import Link from 'next/link'

export function Team() {
  const team = [
    {
      name: 'Bjørn Schick',
      role: 'Co-Founder, Business',
      bio: 'Venture Architect at Fraunhofer Venture, embedded in deep tech and industrial ventures. Ran the field research behind Pareo — interviewing compliance leads, procurement directors, and supply chain managers across European electronics and machinery manufacturers.',
      linkedin: 'https://www.linkedin.com/in/bjoern-schick/',
      initials: 'BS'
    },
    {
      name: 'Angelika Bordunova',
      role: 'Co-Founder, Product',
      bio: 'M.Sc. in Management and Technology from TUM. Translated 180+ hours of compliance workflow research into product decisions — every feature in Pareo traces back to a specific process failure she documented with a real compliance team.',
      linkedin: 'https://www.linkedin.com/in/angelika-bordunova/',
      initials: 'AB'
    },
    {
      name: 'Jonathan Kaleve',
      role: 'Co-Founder, Technical',
      bio: 'Lead engineer responsible for Pareo\'s AI and data architecture. Built production data systems at Ippen Digital. Designed Pareo\'s multi-agent processing, ERP integrations, and audit trail infrastructure from the ground up.',
      linkedin: 'https://www.linkedin.com/in/jonathan-kaleve/',
      initials: 'JK'
    }
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Who built this.</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            180+ conversations with compliance managers, RoHS engineers, and supply chain directors
            across European manufacturers before writing the first line of product code. That research
            is the basis for every design decision in Pareo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              {/* Avatar placeholder */}
              <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-primary-foreground">{member.initials}</span>
              </div>

              {/* Name and role */}
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-primary font-medium mb-3">{member.role}</p>

              {/* Bio */}
              <p className="text-sm text-muted-foreground mb-4 px-4">{member.bio}</p>

              {/* LinkedIn link */}
              {member.linkedin && (
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
