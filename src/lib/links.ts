import type { MouseEvent } from 'react'

/** Current page route: '/', '/privacy-policy' or '/terms-of-service' (trailing slash ignored). */
export const currentRoute = () => window.location.pathname.replace(/\/+$/, '') || '/'

/** In-page anchors (#features) point back to the home page when on another route. */
export const homeHref = (href: string) => (href.startsWith('#') && currentRoute() !== '/' ? `/${href}` : href)

/** Placeholder tokens look like DOWNLOAD_LINK_WINDOWS / SUPPORT_LINK. */
export const isPlaceholder = (href: string) => /^[A-Z][A-Z0-9_]+$/.test(href)

/**
 * Props for links that may still hold a placeholder token. Placeholders keep
 * their href (easy to find/replace) but don't navigate to a broken URL.
 */
export function linkProps(href: string) {
  if (!isPlaceholder(href)) {
    const external = /^https?:\/\//.test(href)
    return external ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href: homeHref(href) }
  }
  return {
    href,
    'data-placeholder': 'true',
    title: 'Link not configured yet',
    onClick: (e: MouseEvent) => e.preventDefault(),
  }
}
