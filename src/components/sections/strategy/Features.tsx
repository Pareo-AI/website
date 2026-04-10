import { useTranslations } from 'next-intl'
import { Brain, FileText, Mail, Database, Shield, Zap, CheckCircle, GitBranch } from 'lucide-react'

const icons = [Brain, FileText, Shield, Database, CheckCircle, Zap, Mail, GitBranch]

export function Features() {
  const t = useTranslations('StrategyFeatures')

  const features = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    icon: icons[i],
    title: t(`features.${i}.title`),
    description: t(`features.${i}.description`),
    technical: t(`features.${i}.technical`),
  }))

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">{t('headline')}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('subheadline')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="text-left p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
              <div className="text-xs text-primary font-mono">{feature.technical}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
