import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import { CONTACT_EMAIL } from '@/lib/constants';

export const metadata = {
  title: 'Terms of Service',
  description: 'Pareo Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: April 2, 2026</p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed [&_strong]:text-foreground [&_strong]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40 [&_a:hover]:decoration-primary">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Pareo&apos;s services, you agree to be bound by these Terms of
              Service.
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">2. Service Description</h2>
            <p className="text-muted-foreground">
              Pareo provides AI-powered compliance management services for supply chain regulations,
              including document analysis, data extraction, and compliance reporting.
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">3. User Obligations</h2>
            <p className="text-muted-foreground">You agree to:</p>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              <li>Provide accurate information</li>
              <li>Maintain the security of your account</li>
              <li>Use the service in compliance with applicable laws</li>
              <li>Not misuse or attempt to disrupt the service</li>
            </ul>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">4. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, features, and functionality of Pareo are owned by us and protected by
              international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Pareo is provided &quot;as is&quot; without warranties of any kind. Our liability is
              governed as follows:
            </p>
            <ul className="space-y-3 text-muted-foreground list-disc list-outside ml-4">
              <li>
                We are fully liable for damages resulting from intentional acts (Vorsatz) or gross
                negligence (grobe Fahrlässigkeit), for injury to life, body, or health, and under
                any mandatory statutory provisions.
              </li>
              <li>
                For slight negligence (leichte Fahrlässigkeit), we are liable only where an
                essential contractual obligation (Kardinalpflicht) has been breached — that is, an
                obligation whose fulfilment is fundamental to the proper performance of this
                agreement and on whose observance you may reasonably rely. In such cases, liability
                is limited to foreseeable damages typical for this type of contract.
              </li>
              <li>
                We are not liable for slight negligence in cases not involving essential contractual
                obligations, or for any indirect, incidental, or consequential damages in those
                cases.
              </li>
            </ul>
            <p className="text-muted-foreground">
              Pareo&apos;s outputs are provided for informational and operational assistance
              purposes only and do not constitute legal advice. You are responsible for
              independently verifying any compliance determinations before relying on them for
              regulatory purposes.
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">6. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend access to our service for any reason,
              including breach of these Terms.
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">7. Data Processing</h2>
            <p className="text-muted-foreground">
              When you upload or submit documents containing personal data (for example, supplier
              contact information) through Pareo&apos;s services, we act as a data processor on your
              behalf within the meaning of Article 28 GDPR, and you act as the data controller. We
              process such data solely to provide the services described in these Terms and in
              accordance with our <a href="/privacy">Privacy Policy</a>.
            </p>
            <p className="text-muted-foreground">
              If your use of Pareo requires a Data Processing Agreement (DPA) under Article 28 GDPR,
              please contact us at the address below and we will provide one.
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">8. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms are governed by the laws of Germany.
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="text-muted-foreground">
              For questions about these Terms, contact us at:{' '}
              <ObfuscatedEmail encoded={Buffer.from(CONTACT_EMAIL).toString('base64')} />
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
