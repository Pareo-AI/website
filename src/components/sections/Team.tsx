import { Linkedin } from 'lucide-react'
import Link from 'next/link'

export function Team() {
  const team = [
    {
      name: 'Bjørn Schick',
      role: 'Co-Founder, Business',
      bio: 'Venture Architect at Fraunhofer Venture with background in venture development and leadership advisory. Stanford Visiting Graduate Researcher and Manage and More scholar at TUM.',
      linkedin: 'https://www.linkedin.com/in/bjoern-schick/',
      initials: 'BS'
    },
    {
      name: 'Angelika Bordunova',
      role: 'Co-Founder, Product',
      bio: 'Product leader with M.Sc. in Management and Technology from TUM. Expertise in compliance workflows, enterprise software, and bridging business needs with technical solutions.',
      linkedin: 'https://www.linkedin.com/in/angelika-bordunova/',
      initials: 'AB'
    },
    {
      name: 'Jonathan Kaleve',
      role: 'Co-Founder, Technical',
      bio: 'Lead Generative AI engineer with background in data platforms and AI systems. Former Data Engineer at Ippen Digital, specialized in event streaming and real-time systems.',
      linkedin: 'https://www.linkedin.com/in/jonathan-kaleve/',
      initials: 'JK'
    }
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Meet the Team</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Built by a team with deep expertise in compliance, AI engineering, and product development.
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
