import { getTranslations } from 'next-intl/server';
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';
import { CONTACT_EMAIL } from '@/lib/constants';

export async function generateMetadata() {
  const t = await getTranslations('Impressum');
  return { title: t('meta.title'), description: t('meta.description') };
}

export default async function ImpressumPage() {
  const t = await getTranslations('Impressum');

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed [&_strong]:text-foreground [&_strong]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40 [&_a:hover]:decoration-primary">

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('responsible.heading')}</h2>
            <p className="text-muted-foreground">
              Jonathan Kaleve<br />
              Baumstraße 2<br />
              80469 München<br />
              {t('responsible.country')}
            </p>
            <p className="text-muted-foreground">
              {t('responsible.email')}{' '}
              <ObfuscatedEmail encoded={Buffer.from(CONTACT_EMAIL).toString('base64')} />
            </p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('funding.heading')}</h2>
            <p className="text-muted-foreground">{t('funding.body')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('liability.heading')}</h2>
            <p className="text-muted-foreground">{t('liability.content')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('links.heading')}</h2>
            <p className="text-muted-foreground">{t('links.content')}</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{t('dispute.heading')}</h2>
            <p className="text-muted-foreground">
              {t('dispute.odr')}{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr
              </a>
              {t('dispute.odrSuffix')}
            </p>
            <p className="text-muted-foreground">{t('dispute.noObligation')}</p>
          </section>

        </div>
      </div>
    </div>
  );
}
