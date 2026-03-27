import { CONTACT_EMAIL } from '@/lib/constants';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Pareo Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: March 27, 2026</p>

          <h2>Data Controller</h2>
          <p>
            Jonathan Kaleve
            <br />
            Baumstraße 2<br />
            80469 München, Germany
            <br />
            Email: {CONTACT_EMAIL}
          </p>

          <h2>Data We Collect</h2>
          <p>This is the Pareo marketing website. We collect:</p>
          <ul>
            <li>
              <strong>Contact form submissions:</strong> name, email address, company name
              (optional), and message — when you fill out the contact form.
            </li>
            <li>
              <strong>Analytics data (with your consent):</strong> page views, clicks, referring
              URLs, browser type, device type, and anonymised IP address — via PostHog, processed on
              EU servers. This is only collected if you accept analytics cookies.
            </li>
          </ul>

          <h2>Legal Basis for Processing</h2>
          <ul>
            <li>
              <strong>Contact form data:</strong> processed on the basis of your consent (Article
              6(1)(a) GDPR) given by submitting the form, in order to respond to your enquiry.
            </li>
            <li>
              <strong>Analytics data:</strong> processed on the basis of your consent (Article
              6(1)(a) GDPR) given via the cookie banner.
            </li>
          </ul>

          <h2>How We Use Your Data</h2>
          <ul>
            <li>
              <strong>Contact form data</strong> is used solely to respond to your enquiry. We do
              not add you to marketing lists without separate consent.
            </li>
            <li>
              <strong>Analytics data</strong> is used to understand how visitors use this site so we
              can improve it.
            </li>
          </ul>

          <h2>Third-Party Processors</h2>
          <ul>
            <li>
              <strong>PostHog</strong> — analytics platform. Data is processed on EU servers (
              <code>eu.i.posthog.com</code>). Only active if you accept analytics cookies. See{' '}
              <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">
                PostHog&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Mailgun</strong> — used to deliver contact form submissions to us. Data is
              processed in the EU. See{' '}
              <a
                href="https://www.mailgun.com/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mailgun&apos;s Privacy Policy
              </a>
              .
            </li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            Contact form submissions are retained only as long as necessary to handle your enquiry.
            Analytics data is retained per PostHog&apos;s default retention policy.
          </p>

          <h2>Your Rights</h2>
          <p>Under GDPR, you have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Rectify inaccurate data</li>
            <li>Request erasure of your data</li>
            <li>Object to data processing</li>
            <li>
              Withdraw consent at any time (for cookie-based analytics, clear your cookies or
              decline via the cookie banner)
            </li>
            <li>Data portability</li>
            <li>Lodge a complaint with your local supervisory authority</li>
          </ul>

          <h2>Contact</h2>
          <p>
            For privacy-related inquiries, contact us at:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
