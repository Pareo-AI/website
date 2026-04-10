import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '',         priority: 1.0, changeFrequency: 'daily'   },
    { path: '/privacy', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/terms',   priority: 0.5, changeFrequency: 'monthly' },
    { path: '/cookies', priority: 0.5, changeFrequency: 'monthly' },
  ]

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
