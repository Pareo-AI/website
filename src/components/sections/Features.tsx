import { Brain, FileText, Mail, Database, Shield, Zap, CheckCircle, GitBranch } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Brain,
      title: 'Multi-Agent AI System',
      description: 'Agents collaborate to understand requests, extract data, and generate compliant outputs - handling complexity you need multiple specialists for.',
      technical: 'Intelligent task delegation'
    },
    {
      icon: FileText,
      title: 'Format-Agnostic Processing',
      description: 'Parse Excel pivot tables, extract from scanned PDFs, interpret XML schemas, and process email threads - no matter how suppliers format their data.',
      technical: 'Excel · PDF · XML · DOCX · EML'
    },
    {
      icon: Shield,
      title: 'EU Regulation Coverage',
      description: 'RoHS exemption tracking, REACH SVHC validation with CAS checksums, SCIP notification support, PFAS restrictions, and conflict minerals reporting.',
      technical: 'IPC-1752A XML generation'
    },
    {
      icon: Database,
      title: 'Institutional Memory',
      description: 'Every document becomes searchable knowledge. Semantic search finds relevant supplier data across thousands of files - answers questions your team forgot to document.',
      technical: 'AI-powered search'
    },
    {
      icon: CheckCircle,
      title: 'Validation & Verification',
      description: 'CAS checksum validation, product ownership verification, and threshold checking - catch errors before they reach customers.',
      technical: 'Automated quality gates'
    },
    {
      icon: Zap,
      title: 'Human-in-the-Loop',
      description: 'AI handles 95% automatically. For edge cases, agents pause and ask clarifying questions through the web UI - ensuring accuracy without sacrificing speed.',
      technical: 'Confidence-based routing'
    },
    {
      icon: Mail,
      title: 'Email-Native Workflow',
      description: 'Forward supplier emails directly to Pareo. Attachments are automatically processed, data extracted, and responses drafted - no copy-pasting between systems.',
      technical: 'Email integration · Outlook (roadmap)'
    },
    {
      icon: GitBranch,
      title: 'Audit Trail & Traceability',
      description: 'Every data point links back to source documents. Complete activity logs, version history, and domain events provide compliance-ready audit trails.',
      technical: 'Complete traceability'
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Built for Compliance Complexity</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Supplier documents are messy. Regulations are evolving. Your team is overwhelmed.
            Pareo handles the chaos so you can focus on decisions, not data entry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="text-left p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
              <div className="text-xs text-primary font-mono">{feature.technical}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
