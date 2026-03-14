import { MetadataRoute } from 'next'
import { SUPPORTED_LANGUAGES, SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  const routes = ['', '/features', '/contact', '/privacy', '/terms', '/cookies']

  const sitemap: MetadataRoute.Sitemap = []

  SUPPORTED_LANGUAGES.forEach((lang) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8
      })
    })

    if (lang === 'de') {
      sitemap.push({
        url: `${baseUrl}/${lang}/impressum`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5
      })
    }
  })

  return sitemap
}
