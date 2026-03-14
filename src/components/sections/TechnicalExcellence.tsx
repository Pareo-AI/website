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
          <h2 className="text-3xl font-bold sm:text-4xl">Why Our AI Actually Works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Anyone can call an LLM API. Building AI that handles real-world complexity - messy documents, edge cases, production failures - requires engineering discipline.
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
          <div className="flex items-start gap-4">
            <div className="text-4xl">🏗️</div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Built to Last</h3>
              <p className="text-sm text-muted-foreground mb-2">
                This isn't a hackathon demo. It's production software designed for reliability, observability, and maintainability.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <span className="font-medium">Comprehensive testing</span>  -  every feature validated before deployment</li>
                <li>• <span className="font-medium">Real-time monitoring</span>  -  we catch issues before you notice them</li>
                <li>• <span className="font-medium">Quality enforcement</span>  -  automated checks prevent bugs and regressions</li>
                <li>• <span className="font-medium">Complete audit trails</span>  -  every action logged for compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
