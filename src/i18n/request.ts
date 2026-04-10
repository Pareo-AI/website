import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value === 'de' ? 'de' : 'en'
  const messages =
    locale === 'de'
      ? (await import('../../messages/de.json')).default
      : (await import('../../messages/en.json')).default
  return { locale, messages }
})
