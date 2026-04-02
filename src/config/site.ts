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
  { href: "/contact", label: "Contact" },
] as const;

export const footerQuickLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

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
