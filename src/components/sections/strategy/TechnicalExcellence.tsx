import { useTranslations } from 'next-intl'
import { Code2, Lock, Zap, GitBranch, Database, Shield } from 'lucide-react'

export function TechnicalExcellence() {
  const t = useTranslations('StrategyTechnicalExcellence')

  const icons = [Code2, Zap, Database, GitBranch, Lock, Shield]

  const capabilities = [0, 1, 2, 3, 4, 5].map((i) => ({
    icon: icons[i],
    title: t(`capabilities.${i}.title`),
    description: t(`capabilities.${i}.description`),
    detail: t(`capabilities.${i}.detail`),
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability) => (
            <div key={capability.title} className="p-6 rounded-lg border bg-card hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <capability.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{capability.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{capability.description}</p>
              <p className="text-xs text-primary font-medium">{capability.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg bg-muted/50 border">
          <h3 className="text-lg font-semibold mb-3">{t('auditTitle')}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t('auditBody')}
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {[0, 1, 2, 3].map((i) => (
              <li key={i}>• <span className="font-medium">{t(`auditList.${i}`)}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
