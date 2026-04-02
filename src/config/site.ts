/** Central site content and navigation — single source of truth. */

export const site = {
  name: "Xyber Veil",
  tagline: "VPN",
  description:
    "Premium secure VPN for private internet access, anonymous browsing, and fast performance.",
} as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/download", label: "Download" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerQuickLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/download", label: "Download" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Official app distribution URLs. Replace with your live Play / App Store /
 * Microsoft Store listings (or a signed Windows installer URL) before launch.
 */
export const downloadLinks = {
  android: {
    href: "https://play.google.com/store/apps/details?id=com.xyberveil.vpn",
    title: "Android",
    subtitle: "Get it on Google Play",
  },
  ios: {
    href: "https://apps.apple.com/app/xyber-veil/id0000000000",
    title: "iPhone & iPad",
    subtitle: "Download on the App Store",
  },
  windows: {
    href: "https://apps.microsoft.com/store/detail/xyber-veil/9nxxxxxxxxxx",
    title: "Windows",
    subtitle: "Get from Microsoft Store",
  },
} as const;

export const footerLegalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export const imageCdn = {
  /** Curated Unsplash assets — optimized via next/image */
  hero: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    alt: "Abstract visualization of global network connectivity and data security",
  },
  featureSecurity: {
    src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
    alt: "Digital security and encryption concept with lock icon motif",
  },
  worldMap: {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    alt: "Earth from space representing worldwide VPN server locations",
  },
  /** Small faces for testimonial cards — square crop for avatars */
  faces: [
    {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80",
      alt: "Customer portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80",
      alt: "Customer portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=128&h=128&q=80",
      alt: "Customer portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&h=128&q=80",
      alt: "Customer portrait",
    },
  ],
} as const;
