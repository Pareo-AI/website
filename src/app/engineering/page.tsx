import { Code2, Database, GitBranch, Zap, Shield, Lock, Server, TestTube } from 'lucide-react'

export const metadata = {
  title: 'Engineering & Architecture',
  description: 'Technical deep dive into Pareo\'s architecture, AI systems, and engineering practices'
}

export default function EngineeringPage() {
  const architecture = [
    {
      icon: GitBranch,
      title: "CQRS + Event Sourcing",
      description: "Complete separation of reads and writes. Every business operation is a command or query. Domain events provide full audit trail and enable event-driven workflows.",
      details: [
        "100% of business logic through CommandBus/QueryBus",
        "Domain events capture all state changes",
        "Event handlers enable async workflows",
        "Complete audit trail for compliance"
      ]
    },
    {
      icon: Database,
      title: "Domain-Driven Design",
      description: "Clean architecture with strict layer separation. Domain layer contains business logic, application layer orchestrates use cases, infrastructure handles persistence.",
      details: [
        "Aggregates enforce business invariants",
        "Repository pattern abstracts data access",
        "Unit of Work pattern for transactions",
        "Value Objects ensure type safety"
      ]
    },
    {
      icon: Code2,
      title: "Multi-Agent AI System",
      description: "Built on Pydantic AI framework with Gemini 2.5 Flash. Orchestrator agent delegates to specialized agents for complex workflows.",
      details: [
        "Pydantic AI for type-safe agent definitions",
        "Gemini 2.5 Flash for fast, cost-effective inference",
        "Parent-child execution tracking",
        "Tool calls logged for observability"
      ]
    },
    {
      icon: Zap,
      title: "Vector Search + RAG",
      description: "Semantic search using pgvector for PostgreSQL. AWS Titan Embed V2 for embeddings. Retrieval-augmented generation finds relevant context across thousands of documents.",
      details: [
        "pgvector extension for PostgreSQL",
        "AWS Titan Embed V2 embeddings (1024 dimensions)",
        "Hybrid search: vector + full-text",
        "RAG improves extraction accuracy"
      ]
    },
    {
      icon: Shield,
      title: "Job Queue & Fault Tolerance",
      description: "Procrastinate for PostgreSQL-backed job queue. Async processing with automatic retries, dead letter queues, and pause/resume for long-running workflows.",
      details: [
        "Procrastinate job queue (PostgreSQL-backed)",
        "Exponential backoff for retries",
        "Dead letter queue for failed jobs",
        "Pause/resume for human review"
      ]
    },
    {
      icon: Lock,
      title: "Security & Multi-Tenancy",
      description: "JWT authentication, PostgreSQL row-level security for multi-tenancy, GCP Secret Manager for secret rotation, encrypted data at rest.",
      details: [
        "JWT with HTTP-only cookies",
        "PostgreSQL RLS for data isolation",
        "GCP Secret Manager integration",
        "AES-256 encryption at rest"
      ]
    }
  ]

  const stack = [
    {
      category: "Backend",
      items: [
        { name: "Python 3.12", description: "Primary backend language" },
        { name: "FastAPI", description: "High-performance API framework" },
        { name: "PostgreSQL 15", description: "Primary database with pgvector" },
        { name: "SQLAlchemy 2.0", description: "ORM for database access" },
        { name: "Pydantic AI", description: "Type-safe AI agent framework" },
        { name: "Procrastinate", description: "PostgreSQL-backed job queue" }
      ]
    },
    {
      category: "AI & ML",
      items: [
        { name: "Gemini 2.5 Flash", description: "Primary LLM for agent reasoning" },
        { name: "AWS Titan Embed V2", description: "Text embeddings for vector search" },
        { name: "pgvector", description: "PostgreSQL extension for vector similarity" },
        { name: "Pydantic", description: "Data validation and structured outputs" }
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "Next.js 15", description: "React framework for web UI" },
        { name: "TypeScript", description: "Type-safe frontend development" },
        { name: "TanStack Query", description: "Data fetching and caching" },
        { name: "Zustand", description: "Lightweight state management" },
        { name: "Tailwind CSS", description: "Utility-first styling" }
      ]
    },
    {
      category: "Infrastructure",
      items: [
        { name: "Google Cloud Platform", description: "Primary cloud provider (EU regions)" },
        { name: "Kubernetes (GKE)", description: "Container orchestration" },
        { name: "Cloud SQL", description: "Managed PostgreSQL" },
        { name: "Secret Manager", description: "Secret rotation and management" },
        { name: "Terraform", description: "Infrastructure as code" }
      ]
    },
    {
      category: "Observability",
      items: [
        { name: "Prometheus", description: "Metrics collection" },
        { name: "Grafana", description: "Metrics visualization" },
        { name: "Loki", description: "Log aggregation" },
        { name: "OpenTelemetry", description: "Distributed tracing (roadmap)" }
      ]
    },
    {
      category: "Testing & CI/CD",
      items: [
        { name: "pytest", description: "Python unit and integration tests" },
        { name: "Playwright", description: "End-to-end browser testing" },
        { name: "GitHub Actions", description: "CI/CD pipelines" },
        { name: "pre-commit", description: "Code quality hooks" }
      ]
    }
  ]

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl mb-4">Engineering & Architecture</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A technical deep dive for CTOs, technical evaluators, and anyone curious about how we build production-grade AI systems.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Patterns */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Architecture Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {architecture.map((item) => (
              <div key={item.title} className="p-6 rounded-lg border bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.details.map((detail) => (
                    <li key={detail} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>
          <div className="space-y-8">
            {stack.map((category) => (
              <div key={category.category}>
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item) => (
                    <div key={item.name} className="p-4 rounded-lg border bg-card">
                      <div className="font-semibold text-sm mb-1">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Practices */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Engineering Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <TestTube className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Testing Strategy</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Unit tests for domain logic and pure functions</li>
                <li>• Integration tests for database and external APIs</li>
                <li>• End-to-end tests with Playwright for critical workflows</li>
                <li>• Parametrized tests for authorization scenarios</li>
                <li>• Mock factories for consistent test data</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Code Quality</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Automated architecture validation in CI/CD</li>
                <li>• Pre-commit hooks for linting and formatting</li>
                <li>• Type checking with mypy (Python) and TypeScript</li>
                <li>• Code review required for all changes</li>
                <li>• Documentation for complex business logic</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <Server className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Deployment</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Kubernetes on GKE for container orchestration</li>
                <li>• Blue-green deployments for zero downtime</li>
                <li>• Database migrations with Alembic</li>
                <li>• Terraform for infrastructure as code</li>
                <li>• Automated rollback on health check failures</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Security</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Regular dependency updates and vulnerability scanning</li>
                <li>• Secrets stored in GCP Secret Manager, never in code</li>
                <li>• Row-level security for multi-tenancy</li>
                <li>• API rate limiting and authentication</li>
                <li>• Encrypted data at rest and in transit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Why This Matters</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Building AI products is easy. Building AI products that work in production - handling edge cases,
              failures, scale, security, and compliance - is hard.
            </p>
            <p className="text-muted-foreground">
              We don't just call LLM APIs. We've built a production-grade system with clean architecture,
              comprehensive testing, fault tolerance, observability, and security baked in from day one.
              This is software built to last, not a hackathon demo.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
