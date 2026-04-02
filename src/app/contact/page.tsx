import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import LiveChatWidget from "@/components/contact/LiveChatWidget";
import SectionHeader from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact Xyber Veil VPN | Secure VPN Support",
  description:
    "Contact Xyber Veil for secure VPN support, private browsing questions, and fast VPN speed help. Reach our team via contact form or live chat UI demo.",
};

export default function ContactPage() {
  return (
    <Reveal as="main" className="pb-12 pt-10 sm:pt-14">
      <Container>
        <SectionHeader
          eyebrow="Contact"
          title="Secure VPN help, right when you need it"
          subtitle="Questions about best VPN privacy, anonymous browsing, or online privacy protection? Send a message and we will follow up."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.8rem] glass-strong p-6 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white/85">Email support</p>
              <p className="mt-2 text-sm text-white/70">
                For secure VPN troubleshooting and private internet access questions:
              </p>
              <a
                href="mailto:support@xyberveil.example"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300/20 via-sky-400/20 to-teal-300/20 px-5 py-3 text-sm font-semibold ring-1 ring-white/10 transition hover:scale-[1.02]"
              >
                info@xyberveil.com
              </a>
              <p className="mt-3 text-xs text-white/60">
                Demo address. Replace with your production support email.
              </p>
            </div>

            <LiveChatWidget />
          </div>
        </div>
      </Container>
    </Reveal>
  );
}

