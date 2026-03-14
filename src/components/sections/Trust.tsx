import { Shield, Lock, Server, FileCheck, Gauge, Users } from 'lucide-react'

export function Trust() {
  const signals = [
    {
      icon: Lock,
      title: "Enterprise Security",
      items: [
        "SAML 2.0 SSO (roadmap: Azure AD, Okta)",
        "JWT authentication with HTTP-only cookies",
        "Automatic secret rotation",
        "Multi-tenancy with data isolation"
      ]
    },
    {
      icon: Server,
      title: "European Infrastructure",
      items: [
        "Data hosted in EU (Germany/Netherlands)",
        "GDPR-compliant by design",
        "No data transfer to US servers",
        "Local LLM deployment option available"
      ]
    },
    {
      icon: FileCheck,
      title: "Production-Ready",
      items: [
        "Comprehensive test coverage (unit + integration + E2E)",
        "Real-time monitoring and alerting",
        "Automatic retries with exponential backoff",
        "Complete audit trails for compliance"
      ]
    },
    {
      icon: Gauge,
      title: "Performance at Scale",
      items: [
        "Async job processing (handles spikes)",
        "Horizontal scaling (Kubernetes)",
        "Vector search for instant retrieval",
        "Prompt caching reduces LLM costs"
      ]
    }
  ]

  return (
    <section className="py-24 bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Built for Enterprise Compliance</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Security, reliability, and compliance aren't afterthoughts - they're foundational architecture decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {signals.map((signal) => (
            <div key={signal.title} className="p-6 rounded-lg border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <signal.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{signal.title}</h3>
              </div>
              <ul className="space-y-2">
                {signal.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-muted/50 text-center">
            <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime SLA target</div>
          </div>
          <div className="p-6 rounded-lg bg-muted/50 text-center">
            <div className="text-4xl font-bold text-primary mb-2">&lt;200ms</div>
            <div className="text-sm text-muted-foreground">Median API response time</div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Who We Work With</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pareo is designed for mid-to-large European manufacturers in regulated industries: automotive suppliers, electronics, industrial machinery, medical devices, and sensor manufacturers. We're currently running pilot programs with compliance teams to validate and refine our product.
                </p>
                <p className="text-sm text-muted-foreground">
                  If your compliance team handles 50+ customer requests per year and you're spending too much time on manual data extraction - you're our ideal pilot partner.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <span className="text-xl">🔗</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Enterprise Integrations</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  <span className="font-medium">Roadmap:</span> Deep integrations with your existing enterprise systems.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• SAP ERP integration for product data</li>
                  <li>• Outlook add-in for email workflow</li>
                  <li>• Generic database connectors</li>
                  <li>• API access for custom integrations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
