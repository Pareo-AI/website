import { CONTACT_EMAIL } from '@/lib/constants';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Pareo Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: March 27, 2026</p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed [&_strong]:text-foreground [&_strong]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40 [&_a:hover]:decoration-primary [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-xs">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Data Controller</h2>
            <p className="text-muted-foreground">
              Jonathan Kaleve
              <br />
              Baumstraße 2<br />
              80469 München, Germany
              <br />
              Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Data We Collect</h2>
            <p className="text-muted-foreground">
              This is the Pareo marketing website. We collect:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              <li>
                <strong>Contact form submissions:</strong> name, email address, company name
                (optional), and message — when you fill out the contact form.
              </li>
              <li>
                <strong>Analytics data (with your consent):</strong> page views, clicks, referring
                URLs, browser type, device type, and anonymised IP address — via PostHog, processed
                on EU servers. Only collected if you accept analytics cookies.
              </li>
            </ul>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Legal Basis for Processing</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              <li>
                <strong>Contact form data:</strong> processed on the basis of your consent (Article
                6(1)(a) GDPR) given by submitting the form, in order to respond to your enquiry.
              </li>
              <li>
                <strong>Analytics data:</strong> processed on the basis of your consent (Article
                6(1)(a) GDPR) given via the cookie banner.
              </li>
            </ul>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">How We Use Your Data</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              <li>
                <strong>Contact form data</strong> is used solely to respond to your enquiry. We do
                not add you to marketing lists without separate consent.
              </li>
              <li>
                <strong>Analytics data</strong> is used to understand how visitors use this site so
                we can improve it.
              </li>
            </ul>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Third-Party Processors</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
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
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Data Retention</h2>
            <p className="text-muted-foreground">
              Contact form submissions are retained only as long as necessary to handle your
              enquiry. Analytics data is retained per PostHog&apos;s default retention policy.
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Your Rights</h2>
            <p className="text-muted-foreground">Under GDPR, you have the right to:</p>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              <li>Access your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Request erasure of your data</li>
              <li>Object to data processing</li>
              <li>
                Withdraw consent at any time — for cookie-based analytics, clear your cookies or
                decline via the cookie banner
              </li>
              <li>Data portability</li>
              <li>Lodge a complaint with your local supervisory authority</li>
            </ul>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="text-muted-foreground">
              For privacy-related inquiries, contact us at:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
