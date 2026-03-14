export const metadata = {
  title: 'Terms of Service',
  description: 'Pareo Terms of Service'
}

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p className="lead">Last updated: February 6, 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Pareo's services, you agree to be bound by these Terms of Service.
          </p>

          <h2>2. Service Description</h2>
          <p>
            Pareo provides AI-powered compliance management services for supply chain regulations,
            including document analysis, data extraction, and compliance reporting.
          </p>

          <h2>3. User Obligations</h2>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate information</li>
            <li>Maintain the security of your account</li>
            <li>Use the service in compliance with applicable laws</li>
            <li>Not misuse or attempt to disrupt the service</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content, features, and functionality of Pareo are owned by us and protected
            by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            Pareo is provided "as is" without warranties of any kind. We are not liable
            for any indirect, incidental, or consequential damages arising from your use of the service.
          </p>

          <h2>6. Termination</h2>
          <p>
            We reserve the right to terminate or suspend access to our service for any reason,
            including breach of these Terms.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Germany.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these Terms, contact us at: <a href="mailto:admin@pareo.ai">admin@pareo.ai</a>
          </p>
        </div>
      </div>
    </div>
  )
}
