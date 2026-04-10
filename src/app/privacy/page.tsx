import { getTranslations } from 'next-intl/server';
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import { CONTACT_EMAIL } from '@/lib/constants';

export async function generateMetadata() {
  const t = await getTranslations('Privacy');
  return { title: t('meta.title'), description: t('meta.description') };
}

export default async function PrivacyPage() {
  const t = await getTranslations('Privacy');

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('lastUpdated')}</p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed [&_strong]:text-foreground [&_strong]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40 [&_a:hover]:decoration-primary [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-xs">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('dataController.heading')}</h2>
            <p className="text-muted-foreground">
              Jonathan Kaleve<br />
              Baumstraße 2<br />
              80469 München, Germany<br />
              {t('dataController.email')} <ObfuscatedEmail encoded={Buffer.from(CONTACT_EMAIL).toString('base64')} />
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('dataCollect.heading')}</h2>
            <p className="text-muted-foreground">{t('dataCollect.intro')}</p>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              <li><strong>{t('dataCollect.contact.label')}</strong> {t('dataCollect.contact.body')}</li>
              <li><strong>{t('dataCollect.analytics.label')}</strong> {t('dataCollect.analytics.body')}</li>
            </ul>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('legalBasis.heading')}</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              <li><strong>{t('legalBasis.contact.label')}</strong> {t('legalBasis.contact.body')}</li>
              <li><strong>{t('legalBasis.analytics.label')}</strong> {t('legalBasis.analytics.body')}</li>
            </ul>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('usage.heading')}</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              <li><strong>{t('usage.contact.label')}</strong> {t('usage.contact.body')}</li>
              <li><strong>{t('usage.analytics.label')}</strong> {t('usage.analytics.body')}</li>
            </ul>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('processors.heading')}</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              <li>
                <strong>{t('processors.posthog.label')}</strong> — {t('processors.posthog.body')}{' '}
                <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">
                  {t('processors.posthog.policyLink')}
                </a>.
              </li>
              <li>
                <strong>{t('processors.mailgun.label')}</strong> — {t('processors.mailgun.body')}{' '}
                <a href="https://www.mailgun.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
                  {t('processors.mailgun.policyLink')}
                </a>.
              </li>
            </ul>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('retention.heading')}</h2>
            <p className="text-muted-foreground">{t('retention.body')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('rights.heading')}</h2>
            <p className="text-muted-foreground">{t('rights.intro')}</p>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              {([0, 1, 2, 3, 4, 5, 6] as const).map((i) => (
                <li key={i}>{t(`rights.items.${i}`)}</li>
              ))}
            </ul>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('contact.heading')}</h2>
            <p className="text-muted-foreground">
              {t('contact.body')}{' '}
              <ObfuscatedEmail encoded={Buffer.from(CONTACT_EMAIL).toString('base64')} />
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
