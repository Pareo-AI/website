import { getTranslations } from 'next-intl/server';
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import { CONTACT_EMAIL } from '@/lib/constants';

export async function generateMetadata() {
  const t = await getTranslations('Cookies');
  return { title: t('meta.title'), description: t('meta.description') };
}

export default async function CookiesPage() {
  const t = await getTranslations('Cookies');

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('lastUpdated')}</p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed [&_strong]:text-foreground [&_strong]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40 [&_a:hover]:decoration-primary">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('whatAre.heading')}</h2>
            <p className="text-muted-foreground">{t('whatAre.body')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('weUse.heading')}</h2>
            <p className="text-muted-foreground">{t('weUse.intro')}</p>
            <ul className="space-y-2 text-muted-foreground list-disc list-outside ml-4">
              <li><strong>{t('weUse.functional.label')}</strong> {t('weUse.functional.body')}</li>
              <li><strong>{t('weUse.analytics.label')}</strong> {t('weUse.analytics.body')}</li>
            </ul>
            <p className="text-muted-foreground">{t('weUse.note')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('consent.heading')}</h2>
            <p className="text-muted-foreground">{t('consent.body1')}</p>
            <p className="text-muted-foreground">{t('consent.body2')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('managing.heading')}</h2>
            <p className="text-muted-foreground">{t('managing.body')}</p>
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
