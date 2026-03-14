import { CONTACT_EMAIL } from '@/lib/constants'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Pareo Privacy Policy'
}

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: February 6, 2026</p>

          <h2>Data Controller</h2>
          <p>
            Jonathan Kaleve<br />
            Baumstraße 2<br />
            80469 München, Germany<br />
            Email: {CONTACT_EMAIL}
          </p>

          <h2>Data We Collect</h2>
          <p>We collect and process the following types of data:</p>
          <ul>
            <li>Account information (name, email, company)</li>
            <li>Compliance documents and supplier data</li>
            <li>Usage data and analytics</li>
          </ul>

          <h2>How We Use Your Data</h2>
          <p>We use your data to:</p>
          <ul>
            <li>Provide and improve our compliance management services</li>
            <li>Analyze compliance documents and extract relevant information</li>
            <li>Send important service updates and notifications</li>
          </ul>

          <h2>Data Storage and Security</h2>
          <p>
            Your data is stored securely on Google Cloud Platform in the EU region.
            We implement industry-standard security measures to protect your information.
          </p>

          <h2>Your Rights</h2>
          <p>Under GDPR, you have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Rectify inaccurate data</li>
            <li>Request erasure of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>

          <h2>Contact</h2>
          <p>
            For privacy-related inquiries, contact us at: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  )
}
