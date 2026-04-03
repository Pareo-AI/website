import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import { CONTACT_EMAIL } from '@/lib/constants';

export const metadata = {
  title: 'Cookie Policy',
  description: 'Pareo Cookie Policy',
};

export default function CookiesPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: March 27, 2026</p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed [&_strong]:text-foreground [&_strong]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40 [&_a:hover]:decoration-primary">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">What Are Cookies</h2>
            <p className="text-muted-foreground">
              Cookies are small text files stored on your device when you visit a website. They help
              us understand how visitors use our site.
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Cookies We Use</h2>
            <p className="text-muted-foreground">This site uses only one category of cookie:</p>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              <li>
                <strong>Analytics cookies (PostHog):</strong> Set by PostHog to track page views and
                specific user interactions (e.g. form submissions, checklist usage). Automatic click
                capture and session recording are disabled — only explicitly defined events are
                collected. These cookies are only set if you click &quot;Accept&quot; on the cookie
                banner. PostHog processes data on EU servers.
              </li>
            </ul>
            <p className="text-muted-foreground">
              We do not use essential/functional cookies, authentication cookies, or advertising
              cookies on this marketing website.
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Your Consent</h2>
            <p className="text-muted-foreground">
              When you first visit the site, a banner asks for your consent before any analytics
              cookies are set. You can accept or decline. If you decline, no analytics cookies are
              set and no data is sent to PostHog.
            </p>
            <p className="text-muted-foreground">
              You can withdraw consent at any time by clearing your browser cookies. On your next
              visit the banner will reappear and you can choose again.
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Managing Cookies</h2>
            <p className="text-muted-foreground">
              You can also control or delete cookies through your browser settings. Refer to your
              browser&apos;s help documentation for instructions.
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="text-muted-foreground">
              For questions about our use of cookies, contact us at:{' '}
              <ObfuscatedEmail encoded={Buffer.from(CONTACT_EMAIL).toString('base64')} />
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
