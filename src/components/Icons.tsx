import type { SVGProps } from 'react'
import { siAndroid, siApple, siGooglechrome, siLinux } from 'simple-icons'
import type { PlatformId } from '../config/site'

type P = SVGProps<SVGSVGElement>

const Line = ({ children, ...p }: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    {children}
  </svg>
)

export const IconArrow = (p: P) => <Line {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Line>
export const IconDownload = (p: P) => <Line {...p}><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" /></Line>
export const IconPlus = (p: P) => <Line {...p}><path d="M12 5v14M5 12h14" /></Line>
export const IconChevron = (p: P) => <Line {...p}><path d="m9 6 6 6-6 6" /></Line>
export const IconCheck = (p: P) => <Line {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Line>
export const IconMenu = (p: P) => <Line {...p}><path d="M4 8h16M4 16h16" /></Line>
export const IconClose = (p: P) => <Line {...p}><path d="M6 6l12 12M18 6 6 18" /></Line>
export const IconPower = (p: P) => <Line {...p}><path d="M12 3v8" /><path d="M6.3 6.8a8 8 0 1 0 11.4 0" /></Line>
export const IconGlobe = (p: P) => (
  <Line {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3Z" /></Line>
)
export const IconPin = (p: P) => <Line {...p}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></Line>
export const IconLayers = (p: P) => <Line {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></Line>
export const IconBolt = (p: P) => <Line {...p}><path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" /></Line>
export const IconSplit = (p: P) => <Line {...p}><path d="M4 12h5c3 0 4-5 7-5h4M9 12c3 0 4 5 7 5h4" /><path d="m17 4 3 3-3 3M17 14l3 3-3 3" /></Line>
export const IconShield = (p: P) => <Line {...p}><path d="M12 3 5 6v5.5c0 4.3 3 8 7 9.5 4-1.5 7-5.2 7-9.5V6l-7-3Z" /></Line>
export const IconRoute = (p: P) => <Line {...p}><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" /></Line>
export const IconSliders = (p: P) => <Line {...p}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></Line>

/* App glyphs for the split tunneling demo (generic categories, no brands) */
export const IconBrowser = (p: P) => <Line {...p}><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></Line>
export const IconMail = (p: P) => <Line {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></Line>
export const IconChat = (p: P) => <Line {...p}><path d="M20 12a7.5 7.5 0 0 1-11 6.6L4 20l1.4-4.6A7.5 7.5 0 1 1 20 12Z" /></Line>
export const IconCode = (p: P) => <Line {...p}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></Line>
export const IconMusic = (p: P) => <Line {...p}><path d="M9 18V6l11-2v12" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="17.5" cy="16" r="2.5" /></Line>
export const IconGame = (p: P) => (
  <Line {...p}><path d="M7 8h10a4 4 0 0 1 4 4v1.5a3.5 3.5 0 0 1-6.2 2.2L14 15h-4l-.8.7A3.5 3.5 0 0 1 3 13.5V12a4 4 0 0 1 4-4Z" /><path d="M8 11v3M6.5 12.5h3M16 12h.01M18 13.5h.01" /></Line>
)

/* ---------- Platform marks ---------- */
const WINDOWS_PATH = 'M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z'

const PLATFORM_PATHS: Record<PlatformId, string> = {
  windows: WINDOWS_PATH,
  macos: siApple.path,
  ios: siApple.path,
  android: siAndroid.path,
  linux: siLinux.path,
  chrome: siGooglechrome.path,
}

export function PlatformIcon({ id, size = 22, ...p }: { id: PlatformId; size?: number } & P) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...p}>
      <path d={PLATFORM_PATHS[id]} />
    </svg>
  )
}
