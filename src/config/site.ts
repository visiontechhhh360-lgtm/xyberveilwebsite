/**
 * Xyberveil — single source of truth for product content.
 *
 * Every statement on the site is driven from this file. Only CONFIRMED
 * product information lives here. Anything unknown is an explicit
 * placeholder so it can be replaced later without touching UI code.
 */

import homeScreen from '../assets/screens/app-home.webp'
import settingsScreen from '../assets/screens/app-settings.webp'
import countriesScreen from '../assets/screens/app-countries.webp'
import homePopup from '../assets/screens/app-home-popup.webp'
import countriesPane from '../assets/screens/app-countries-pane.webp'
import deskDashboard from '../assets/screens/desk-dashboard.webp'
import deskSettings from '../assets/screens/desk-settings.webp'
import deskWelcome from '../assets/screens/desk-welcome.webp'

export type PlatformId = 'windows' | 'macos' | 'ios' | 'android' | 'linux' | 'chrome'

export interface Platform {
  id: PlatformId
  name: string
  /** Short label used in compact UI (tabs, chips). */
  short: string
  /** What kind of mockup to show for this platform. */
  device: 'desktop' | 'phone' | 'browser'
  /** Replace with the real download / store URL. */
  href: string
  cta: string
  /** Neutral one-liner — no unconfirmed claims. */
  blurb: string
  /** Hue used to tint the download stage when this platform is active. */
  tint: string
}

export const PRODUCT = {
  name: 'Xyberveil',
  /** Confirmed: "30+ available locations". */
  locationsLabel: '30+',
  locationsCount: 30,
} as const

/**
 * DOWNLOAD LINKS — replace the placeholder tokens below with real URLs.
 * The UI renders them exactly as provided.
 */
export const DOWNLOAD_LINKS: Record<PlatformId, string> = {
  windows: 'DOWNLOAD_LINK_WINDOWS',
  macos: 'DOWNLOAD_LINK_MACOS',
  ios: 'DOWNLOAD_LINK_IOS',
  android: 'DOWNLOAD_LINK_ANDROID',
  linux: 'DOWNLOAD_LINK_LINUX',
  chrome: 'DOWNLOAD_LINK_CHROME',
}

export const PLATFORMS: Platform[] = [
  {
    id: 'windows',
    name: 'Windows',
    short: 'Windows',
    device: 'desktop',
    href: DOWNLOAD_LINKS.windows,
    cta: 'Download for Windows',
    blurb: 'The Xyberveil desktop app for Windows PCs.',
    tint: '#38c9d6',
  },
  {
    id: 'macos',
    name: 'macOS',
    short: 'macOS',
    device: 'desktop',
    href: DOWNLOAD_LINKS.macos,
    cta: 'Download for macOS',
    blurb: 'The Xyberveil desktop app for Mac.',
    tint: '#c9d2e3',
  },
  {
    id: 'ios',
    name: 'iOS',
    short: 'iOS',
    device: 'phone',
    href: DOWNLOAD_LINKS.ios,
    cta: 'Get Xyberveil for iOS',
    blurb: 'Xyberveil for iPhone.',
    tint: '#8c86ff',
  },
  {
    id: 'android',
    name: 'Android',
    short: 'Android',
    device: 'phone',
    href: DOWNLOAD_LINKS.android,
    cta: 'Get Xyberveil for Android',
    blurb: 'Xyberveil for Android devices.',
    tint: '#4fd6b8',
  },
  {
    id: 'linux',
    name: 'Linux',
    short: 'Linux',
    device: 'desktop',
    href: DOWNLOAD_LINKS.linux,
    cta: 'Download for Linux',
    blurb: 'The Xyberveil app for Linux.',
    tint: '#6f68f2',
  },
  {
    id: 'chrome',
    name: 'Chrome Extension',
    short: 'Chrome',
    device: 'browser',
    href: DOWNLOAD_LINKS.chrome,
    cta: 'Add to Chrome',
    blurb: 'The Xyberveil extension for the Chrome browser.',
    tint: '#5ab8f0',
  },
]

/**
 * PROTOCOLS — confirmed: WireGuard, VLESS, Amnezia.
 * Listed in the order provided — not a ranking.
 */
export const PROTOCOLS = [
  { id: 'wireguard', name: 'WireGuard' },
  { id: 'vless', name: 'VLESS' },
  { id: 'amnezia', name: 'Amnezia' },
] as const

/**
 * ANTI-TRACKER — confirmed feature. The description below is the wording
 * used inside the Xyberveil app's own Settings screen.
 */
export const ANTI_TRACKER = {
  name: 'Anti-Tracker',
  inAppDescription: 'Help reduce online tracking and enhance your browsing privacy.',
}

/**
 * REAL APP SCREENS. Phone mockups (iOS + Android) use the iOS captures
 * (590×1280); laptop/desktop mockups (Windows, macOS, Linux) use the desktop
 * app captures (frameless 1200×672 window, cropped from
 * src/assets/Screenshot 2026-09-22 at *.png).
 */

export const SCREENS = {
  home: homeScreen,
  settings: settingsScreen,
  countries: countriesScreen,
  /** Home screen without status bar and tab bar (extension popup, desktop pane). */
  homePopup,
  /** Countries list without status bar and tab bar (desktop pane). */
  countriesPane,
  desktop: {
    dashboard: deskDashboard,
    settings: deskSettings,
    welcome: deskWelcome,
  },
}

/**
 * LOCATIONS — Xyberveil provides 30+ locations (confirmed).
 * Real location names were not provided, so nodes are abstract.
 * Fill `LOCATION_NAMES` with verified names to label the nodes.
 */
export const LOCATION_NAMES: string[] = []

export const locationLabel = (i: number) =>
  LOCATION_NAMES[i] ?? `Location ${String(i + 1).padStart(2, '0')}`

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Locations', href: '#locations' },
  { label: 'Downloads', href: '#downloads' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Support', href: 'SUPPORT_LINK' },
] as const

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: 'PRIVACY_POLICY_LINK' },
  { label: 'Terms of Service', href: 'TERMS_OF_SERVICE_LINK' },
] as const

/** Add real URLs here to show social links in the footer. Empty = hidden. */
export const SOCIAL_LINKS: { label: string; href: string }[] = []

export const FEATURES = [
  {
    id: 'locations',
    kicker: 'Locations',
    title: '30+ locations',
    body: 'Choose where your VPN connection goes from more than 30 available locations.',
  },
  {
    id: 'protocols',
    kicker: 'Protocols',
    title: 'Multiple protocols',
    body: 'Choose between WireGuard, VLESS and Amnezia to decide how your connection works.',
  },
  {
    id: 'autoconnect',
    kicker: 'Auto Connect',
    title: 'Connect automatically',
    body: 'Turn on Auto Connect and Xyberveil connects for you — no need to start the VPN by hand.',
  },
  {
    id: 'split',
    kicker: 'Split Tunneling',
    title: 'Split Tunneling',
    body: 'Decide which apps use the VPN while other traffic follows your normal connection.',
  },
] as const

export const FAQS = [
  {
    q: 'What is Xyberveil?',
    a: 'Xyberveil is a VPN service. It routes your internet traffic through a VPN connection and is available on Windows, macOS, iOS, Android, Linux and as a Chrome Extension.',
  },
  {
    q: 'Which platforms does Xyberveil support?',
    a: 'Xyberveil is available for Windows, macOS, iOS, Android and Linux, and as a Chrome Extension.',
  },
  {
    q: 'How many locations are available?',
    a: 'Xyberveil currently provides 30+ locations to connect to.',
  },
  {
    q: 'Does Xyberveil support multiple VPN protocols?',
    a: 'Yes. Xyberveil supports WireGuard, VLESS and Amnezia.',
  },
  {
    q: 'What is Auto Connect?',
    a: 'Auto Connect is a Xyberveil feature that connects the VPN automatically, so you don’t have to start the connection manually each time. More details will be available soon.',
  },
  {
    q: 'What is Split Tunneling?',
    a: 'Split Tunneling lets you choose which apps send their traffic through the Xyberveil VPN, while other traffic uses your normal internet connection.',
  },
  {
    q: 'What is Anti-Tracker?',
    a: 'Anti-Tracker is a setting in the Xyberveil app that helps reduce online tracking and enhance your browsing privacy. More details will be available soon.',
  },
  {
    q: 'Where can I download Xyberveil?',
    a: 'You can download Xyberveil from the Downloads section on this page — choose your platform to get the right version.',
  },
  {
    q: 'Does Xyberveil have a Chrome Extension?',
    a: 'Yes. Xyberveil is available as a Chrome Extension alongside the apps for Windows, macOS, iOS, Android and Linux.',
  },
] as const
