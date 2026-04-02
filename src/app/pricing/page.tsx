import type { Metadata } from "next";
import ComparisonTable from "@/components/pricing/ComparisonTable";
import MoneyBack from "@/components/pricing/MoneyBack";
import PricingPlans from "@/components/pricing/PricingPlans";
import SectionHeader from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Xyber Veil Pricing | Best Secure VPN Plans",
  description:
    "Choose the best VPN with secure VPN pricing. Compare monthly and yearly plans for fast VPN speed, private browsing, anonymous internet access, and online privacy protection.",
};

export default function PricingPage() {
  return (
    <Reveal as="main" className="pb-12 pt-10 sm:pt-14">
      <Container>
        <SectionHeader
          eyebrow="Pricing"
          title="Plans built for fast VPN speed and privacy"
          subtitle="From a free trial to yearly value: secure VPN protection for private internet access and anonymous browsing."
        />

        <PricingPlans />
        <ComparisonTable />
      </Container>
      <MoneyBack />
    </Reveal>
  );
}

