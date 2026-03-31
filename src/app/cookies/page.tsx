import { CONTACT_EMAIL } from '@/lib/constants';

export const metadata = {
  title: 'Cookie Policy',
  description: 'Pareo Cookie Policy',
};

export default function CookiesPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Cookie Policy</h1>
          <p className="lead">Last updated: March 27, 2026</p>

          <h2>What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help
            us understand how visitors use our site.
          </p>

          <h2>Cookies We Use</h2>
          <p>This site uses only one category of cookie:</p>
          <ul>
            <li>
              <strong>Analytics cookies (PostHog):</strong> Set by PostHog to track page views and
              specific user interactions (e.g. form submissions, checklist usage). Automatic click
              capture and session recording are disabled — only explicitly defined events are
              collected. These cookies are only set if you click &quot;Accept&quot; on the cookie
              banner. PostHog processes data on EU servers.
            </li>
          </ul>
          <p>
            We do not use essential/functional cookies, authentication cookies, or advertising
            cookies on this marketing website.
          </p>

          <h2>Your Consent</h2>
          <p>
            When you first visit the site, a banner asks for your consent before any analytics
            cookies are set. You can accept or decline. If you decline, no analytics cookies are set
            and no data is sent to PostHog.
          </p>
          <p>
            You can withdraw consent at any time by clearing your browser cookies. On your next
            visit the banner will reappear and you can choose again.
          </p>

          <h2>Managing Cookies</h2>
          <p>
            You can also control or delete cookies through your browser settings. Refer to your
            browser&apos;s help documentation for instructions.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about our use of cookies, contact us at:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
