import Link from 'next/link'
import { Check, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Pricing() {
  const features = [
    'Multi-agent AI processing',
    'Format-agnostic document handling',
    'RoHS, REACH, SCIP, PFAS coverage',
    'Semantic search across documents',
    'Complete audit trails',
    'SAML SSO & enterprise security',
    'EU data hosting (GDPR compliant)',
    'Email-native workflow'
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Enterprise pricing tailored to your request volume and team size.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border bg-card shadow-lg overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left side - Features */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Enterprise Plan</h3>
                  <p className="text-muted-foreground mb-6">
                    Everything you need to automate compliance workflows and scale your team efficiently.
                  </p>

                  <ul className="space-y-3">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right side - CTA */}
                <div className="md:w-80 flex flex-col justify-center">
                  <div className="p-6 rounded-xl bg-muted/50 text-center">
                    <div className="mb-4">
                      <div className="text-4xl font-bold mb-2">Custom</div>
                      <div className="text-sm text-muted-foreground">
                        Based on request volume and team size
                      </div>
                    </div>

                    <Button asChild size="lg" className="w-full mb-4">
                      <Link href="/contact">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact us for pricing
                      </Link>
                    </Button>

                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Pilot before you commit
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Volume-based — scales with usage
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        DPA and security review on request
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border-t px-8 py-6">
              <p className="text-sm text-center text-muted-foreground">
                <span className="font-medium">Pilot Program Available:</span> Test Pareo with your real compliance data before committing. Typical pilot runs 4-6 weeks with 20-30 customer requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
