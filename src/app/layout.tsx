import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import PageFade from "@/components/motion/PageFade";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Xyber Veil VPN — Secure, Fast Private Browsing",
    template: "%s | Xyber Veil",
  },
  description:
    "Xyber Veil VPN delivers secure VPN protection, private browsing, anonymous internet access, and fast VPN speeds with military-grade encryption.",
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cyber font-sans text-white scroll-smooth">
        <div className="relative flex min-h-screen flex-col">
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-cyber" />
            <div className="cyber-grid absolute inset-0 opacity-[0.14]" />
            <div className="vignette absolute inset-0" />
            <div className="scanlines absolute inset-0" />
            <div className="noise absolute inset-0" />
            <div className="aurora-layer absolute left-1/2 top-[-20%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-300/20 via-sky-400/20 to-teal-300/20 blur-3xl" />
            <div className="aurora-layer absolute -bottom-24 left-[-20%] h-[520px] w-[900px] rounded-full bg-gradient-to-r from-teal-300/10 via-cyan-400/15 to-sky-400/15 blur-3xl" />
          </div>

          <Navbar />
          <div className="flex-1">
            <PageFade>{children}</PageFade>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
