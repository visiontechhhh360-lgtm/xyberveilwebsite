import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service - Xyber Veil VPN",
  description:
    "Review Xyber Veil VPN terms of service for secure VPN usage, privacy protections, and acceptable use.",
};

export default function TermsPage() {
  return (
    <main className="pb-12 pt-10 sm:pt-14">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold">Terms of Service</h1>
          <p className="mt-3 text-xs uppercase tracking-widest text-white/50">
            Effective date: March 27, 2026
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            These Terms of Service govern your use of Xyber Veil websites, applications,
            and related services. By accessing or using the service, you agree to these terms.
            If you do not agree, please discontinue use.
          </p>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">1. Eligibility and Accounts</h2>
            <p className="text-sm leading-relaxed text-white/70">
              You must be legally capable of entering into a binding agreement to use the
              service. You are responsible for maintaining accurate account information and for
              activities that occur under your account credentials.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">2. Service Description</h2>
            <p className="text-sm leading-relaxed text-white/70">
              Xyber Veil provides VPN and privacy-oriented tools designed to support secure
              browsing and internet access. Features and availability may vary by plan, location,
              and technical constraints.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">3. Acceptable Use</h2>
            <p className="text-sm leading-relaxed text-white/70">
              You agree not to use the service for unlawful, abusive, fraudulent, or harmful
              activities, including malware distribution, unauthorized access, denial-of-service
              attacks, or infringement of intellectual property rights.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">4. Subscriptions, Billing, and Renewal</h2>
            <p className="text-sm leading-relaxed text-white/70">
              Paid plans are billed according to the pricing presented at checkout. Subscription
              terms, renewal periods, taxes, and charges are disclosed during purchase and may
              vary by region.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">5. Refund Policy</h2>
            <p className="text-sm leading-relaxed text-white/70">
              Xyber Veil offers a 30-day money-back guarantee, subject to applicable refund
              conditions and verification. To request a refund, contact support through the
              official contact form with your purchase details.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">6. Intellectual Property</h2>
            <p className="text-sm leading-relaxed text-white/70">
              All trademarks, branding, software, designs, and content associated with Xyber Veil
              are protected by applicable intellectual property laws. You may not copy, modify, or
              redistribute service materials except as expressly permitted.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">7. Service Availability</h2>
            <p className="text-sm leading-relaxed text-white/70">
              We aim for reliable service but do not guarantee uninterrupted availability or
              compatibility with every network, device, or third-party platform. Planned and
              emergency maintenance may temporarily affect access.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">8. Disclaimers and Limitation of Liability</h2>
            <p className="text-sm leading-relaxed text-white/70">
              The service is provided on an &quot;as is&quot; and &quot;as available&quot; basis to the
              maximum extent permitted by law. Xyber Veil is not liable for indirect, incidental,
              consequential, or special damages arising from service use or inability to use.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">9. Suspension and Termination</h2>
            <p className="text-sm leading-relaxed text-white/70">
              We may suspend or terminate access for violations of these terms, non-payment,
              abuse, or legal compliance reasons. Termination does not limit rights or remedies
              available under law.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">10. Changes to Terms</h2>
            <p className="text-sm leading-relaxed text-white/70">
              We may update these Terms of Service from time to time. Updates become effective
              when posted on this page with a revised effective date. Continued use means you
              accept the updated terms.
            </p>
          </section>

          <div className="mt-8 rounded-[1.6rem] glass-strong p-5 ring-1 ring-white/10">
            <p className="text-sm font-semibold">Support</p>
            <p className="mt-2 text-sm text-white/70">
              If you need clarification about these terms, please use the contact form on the
              Contact page and include your account email and request details.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}

