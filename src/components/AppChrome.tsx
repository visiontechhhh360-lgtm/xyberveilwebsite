import type { SVGProps } from 'react'
import { IconGlobe } from './Icons'
import './AppChrome.css'

/**
 * Pieces of the real Xyberveil mobile app chrome, rebuilt in HTML so that
 * illustrative screens match the actual app (see src/assets/screens).
 * Design units are iOS points at 393×852.
 */

export function IosStatusBar({ time = '2:08' }: { time?: string }) {
  return (
    <div className="xa-status" aria-hidden="true">
      <span>{time}</span>
      <span className="xa-status__r">
        <svg viewBox="0 0 18 13" width="18" height="13"><path fill="currentColor" d="M9 12.5 6.3 9.7a3.8 3.8 0 0 1 5.4 0L9 12.5Zm-4.3-4.4L3 6.4a8.5 8.5 0 0 1 12 0l-1.7 1.7a6.1 6.1 0 0 0-8.6 0ZM1.4 4.8 0 3.4a12.8 12.8 0 0 1 18 0l-1.4 1.4a10.8 10.8 0 0 0-15.2 0Z" /></svg>
        <span className="xa-status__bat">100</span>
      </span>
    </div>
  )
}

const HomeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true" {...p}><path d="M12 3 2 11.5h3V21h5.5v-6h3v6H19v-9.5h3L12 3Z" /></svg>
)
const GearIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13.8 2h-3.6l-.5 2.6a7.8 7.8 0 0 0-1.9 1.1L5.3 4.8 3.5 7.9l2 1.8a7.9 7.9 0 0 0 0 2.2l-2 1.8 1.8 3.1 2.5-.9c.6.5 1.2.8 1.9 1.1l.5 2.6h3.6l.5-2.6c.7-.3 1.3-.6 1.9-1.1l2.5.9 1.8-3.1-2-1.8a7.9 7.9 0 0 0 0-2.2l2-1.8-1.8-3.1-2.5.9a7.8 7.8 0 0 0-1.9-1.1L13.8 2ZM12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" />
  </svg>
)

export function AppTabBar({ active }: { active: 'home' | 'countries' | 'settings' }) {
  const items = [
    { k: 'home', label: 'Home', Icon: HomeIcon },
    { k: 'countries', label: 'Countries', Icon: (p: SVGProps<SVGSVGElement>) => <IconGlobe width={26} height={26} {...p} /> },
    { k: 'settings', label: 'Settings', Icon: GearIcon },
  ] as const
  return (
    <div className="xa-tabs" aria-hidden="true">
      {items.map(({ k, label, Icon }) => (
        <span key={k} className={k === active ? 'is-active' : ''}>
          <Icon />
          {label}
        </span>
      ))}
      <i className="xa-tabs__home" />
    </div>
  )
}
