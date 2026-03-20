import { Code2, Lock, Zap, GitBranch, Database, Shield } from 'lucide-react'

export function TechnicalExcellence() {
  const capabilities = [
    {
      icon: Code2,
      title: "Audit-Ready Traceability",
      description: "Every business operation is auditable, every data change is traceable, every integration is testable. Built for compliance from the ground up.",
      detail: "Complete audit trails for regulatory compliance"
    },
    {
      icon: Zap,
      title: "Handles Complex Workflows",
      description: "Agents handle rate limits gracefully. Low-confidence extractions pause for human review. Complex workflows resume exactly where they left off.",
      detail: "Never lose progress on interrupted tasks"
    },
    {
      icon: Database,
      title: "Intelligent Document Search",
      description: "Semantic search across supplier documents finds relevant compliance data even when product numbers don't match exactly.",
      detail: "AI-powered search understands context, not just keywords"
    },
    {
      icon: GitBranch,
      title: "Intelligent Task Delegation",
      description: "Orchestrator delegates to specialized agents. Parent-child execution tracking ensures transparency and debugging.",
      detail: "AI agents collaborate like your compliance team"
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "SAML 2.0 SSO, JWT authentication, multi-tenancy with data isolation, automatic secret rotation, and encrypted data at rest.",
      detail: "Bank-level security for your compliance data"
    },
    {
      icon: Shield,
      title: "Reliable Processing",
      description: "Automatic retries with exponential backoff. Failed jobs are tracked and retried. Complete audit trails for debugging production issues.",
      detail: "Built to handle failures gracefully"
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Built for production, not demos.</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Compliance data is too consequential for brittle automation. Pareo is built around the assumption that documents are inconsistent, suppliers are unreliable, and regulators don't accept "the system had an error."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability) => (
            <div key={capability.title} className="p-6 rounded-lg border bg-card hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <capability.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{capability.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{capability.description}</p>
              <p className="text-xs text-primary font-medium">{capability.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg bg-muted/50 border">
          <h3 className="text-lg font-semibold mb-3">Designed for audit, not just function.</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Every action in Pareo produces a traceable record. Your compliance team can show an auditor exactly which source document produced which output, when, and who approved it — without searching through email threads.
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <span className="font-medium">Every extraction linked to source</span> — document, page, field</li>
            <li>• <span className="font-medium">Human approval required</span> — nothing leaves without specialist sign-off</li>
            <li>• <span className="font-medium">Immutable activity log</span> — timestamped, exportable, regulator-ready</li>
            <li>• <span className="font-medium">Continuous monitoring</span> — anomalies flagged before they become incidents</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
