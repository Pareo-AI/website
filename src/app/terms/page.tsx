import { getTranslations } from 'next-intl/server';
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import { CONTACT_EMAIL } from '@/lib/constants';

export async function generateMetadata() {
  const t = await getTranslations('Terms');
  return { title: t('meta.title'), description: t('meta.description') };
}

export default async function TermsPage() {
  const t = await getTranslations('Terms');

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('lastUpdated')}</p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed [&_strong]:text-foreground [&_strong]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40 [&_a:hover]:decoration-primary">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('acceptance.heading')}</h2>
            <p className="text-muted-foreground">{t('acceptance.body')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('description.heading')}</h2>
            <p className="text-muted-foreground">{t('description.body')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('obligations.heading')}</h2>
            <p className="text-muted-foreground">{t('obligations.intro')}</p>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              {([0, 1, 2, 3] as const).map((i) => (
                <li key={i}>{t(`obligations.items.${i}`)}</li>
              ))}
            </ul>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('ip.heading')}</h2>
            <p className="text-muted-foreground">{t('ip.body')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('liability.heading')}</h2>
            <p className="text-muted-foreground">{t('liability.intro')}</p>
            <ul className="space-y-3 text-muted-foreground list-disc list-outside ml-4">
              {([0, 1, 2] as const).map((i) => (
                <li key={i}>{t(`liability.items.${i}`)}</li>
              ))}
            </ul>
            <p className="text-muted-foreground">{t('liability.note')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('termination.heading')}</h2>
            <p className="text-muted-foreground">{t('termination.body')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('dataProcessing.heading')}</h2>
            <p className="text-muted-foreground">
              {t('dataProcessing.body1')}{' '}
              <a href="/privacy">{t('dataProcessing.privacyLink')}</a>.
            </p>
            <p className="text-muted-foreground">{t('dataProcessing.body2')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('governingLaw.heading')}</h2>
            <p className="text-muted-foreground">{t('governingLaw.body')}</p>
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
