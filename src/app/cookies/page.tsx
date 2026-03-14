export const metadata = {
  title: 'Cookie Policy',
  description: 'Pareo Cookie Policy'
}

export default function CookiesPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Cookie Policy</h1>
          <p className="lead">Last updated: February 6, 2026</p>

          <h2>What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website.
            They help us provide you with a better experience.
          </p>

          <h2>How We Use Cookies</h2>
          <p>We use cookies for:</p>
          <ul>
            <li><strong>Essential cookies:</strong> Required for authentication and basic functionality</li>
            <li><strong>Analytics cookies:</strong> Help us understand how you use our service</li>
            <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
          </ul>

          <h2>Third-Party Cookies</h2>
          <p>
            We may use third-party services like Google Analytics that set their own cookies
            to help us analyze service usage.
          </p>

          <h2>Managing Cookies</h2>
          <p>
            You can control cookies through your browser settings. Note that disabling
            certain cookies may affect the functionality of our service.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about our use of cookies, contact us at: <a href="mailto:admin@pareo.ai">admin@pareo.ai</a>
          </p>
        </div>
      </div>
    </div>
  )
}
