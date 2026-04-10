import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Apply locale routing only to the root marketing page and its German equivalent.
  // All other routes (strategy, card, api, legal pages, etc.) are excluded.
  matcher: [
    '/((?!_next|api|strategy|card|regulation-sweeper|privacy|terms|cookies|contact|engineering|features|fit-check|pitch-deck|opengraph-image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
