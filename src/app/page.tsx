import type { Metadata } from "next";
import FAQ from "@/components/marketing/FAQ";
import Features from "@/components/marketing/Features";
import Hero from "@/components/marketing/Hero";
import HowItWorks from "@/components/marketing/HowItWorks";
import ServerLocations from "@/components/marketing/ServerLocations";
import Testimonials from "@/components/marketing/Testimonials";
import TrustBadges from "@/components/marketing/TrustBadges";

export const metadata: Metadata = {
  title: "Xyber Veil VPN | Best VPN for Secure & Private Browsing",
  description:
    "Xyber Veil VPN is a secure VPN for private browsing, anonymous internet access, and fast VPN speeds. Enjoy online privacy protection with a no-log policy.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <ServerLocations />
      <Testimonials />
      <TrustBadges />
      <FAQ />
    </>
  );
}
