import type { MouseEvent } from 'react'

/** Placeholder tokens look like DOWNLOAD_LINK_WINDOWS / SUPPORT_LINK. */
export const isPlaceholder = (href: string) => /^[A-Z][A-Z0-9_]+$/.test(href)

/**
 * Props for links that may still hold a placeholder token. Placeholders keep
 * their href (easy to find/replace) but don't navigate to a broken URL.
 */
export function linkProps(href: string) {
  if (!isPlaceholder(href)) {
    const external = /^https?:\/\//.test(href)
    return external ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }
  }
  return {
    href,
    'data-placeholder': 'true',
    title: 'Link not configured yet',
    onClick: (e: MouseEvent) => e.preventDefault(),
  }
}
