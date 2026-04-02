import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy - Xyber Veil VPN",
  description:
    "Read the privacy policy for Xyber Veil VPN, including our secure VPN approach, data practices, and no-log policy statements.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pb-12 pt-10 sm:pt-14">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold">Privacy Policy</h1>
          <p className="mt-3 text-xs uppercase tracking-widest text-white/50">
            Effective date: March 27, 2026
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            This Privacy Policy explains how Xyber Veil collects, uses, and protects
            information when you visit our website, contact support, or use our services.
            By using the service, you agree to the practices described in this policy.
          </p>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p className="text-sm leading-relaxed text-white/70">
              We may collect account and contact information you provide directly, such as
              your name, email address, country, and messages submitted through support forms.
              We may also collect operational diagnostics required to maintain service quality
              and security.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">2. How We Use Information</h2>
            <p className="text-sm leading-relaxed text-white/70">
              We use information to provide customer support, process subscriptions and payments,
              improve platform performance, prevent abuse, and communicate important account or
              policy updates.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">3. No-Log Commitment</h2>
            <p className="text-sm leading-relaxed text-white/70">
              Xyber Veil is designed with a privacy-first, no-activity-log approach for browsing
              behavior. We do not sell browsing activity to third parties. Any essential technical
              logs used for platform reliability are minimized and retained only as long as needed
              for security and operations.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">4. Cookies and Analytics</h2>
            <p className="text-sm leading-relaxed text-white/70">
              We may use cookies or similar technologies for session handling, preferences, and
              anonymous usage analytics. You can control cookie settings through your browser.
              Disabling certain cookies may impact website functionality.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">5. Data Sharing and Processors</h2>
            <p className="text-sm leading-relaxed text-white/70">
              We may share limited data with trusted processors such as payment providers,
              infrastructure hosts, fraud-prevention tools, and customer support tools. These
              providers are contractually required to protect your information and process it only
              for authorized purposes.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">6. Data Retention</h2>
            <p className="text-sm leading-relaxed text-white/70">
              We retain personal data only for as long as required to provide services, resolve
              disputes, satisfy legal obligations, and enforce agreements. Retention periods depend
              on data type and legal requirements in your region.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">7. Security Measures</h2>
            <p className="text-sm leading-relaxed text-white/70">
              We use technical and organizational safeguards designed to protect your information,
              including encryption, access controls, and monitoring against unauthorized access.
              No system is completely risk-free, but we continuously improve our controls.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">8. Your Privacy Rights</h2>
            <p className="text-sm leading-relaxed text-white/70">
              Depending on your location, you may have rights to access, correct, delete, or
              restrict processing of your personal data. You may also request a copy of your data
              or object to certain processing activities.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">9. International Transfers</h2>
            <p className="text-sm leading-relaxed text-white/70">
              If data is transferred across borders, we implement reasonable safeguards and legal
              mechanisms to protect personal information in accordance with applicable laws.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">10. Updates to This Policy</h2>
            <p className="text-sm leading-relaxed text-white/70">
              We may update this Privacy Policy to reflect legal, operational, or product changes.
              Material updates will be posted on this page with a revised effective date.
            </p>
          </section>

          <div className="mt-8 rounded-[1.6rem] glass-strong p-5 ring-1 ring-white/10">
            <p className="text-sm font-semibold">Contact Us</p>
            <p className="mt-2 text-sm text-white/70">
              For privacy-related requests, please use the contact form on the Contact page.
              For more queries, please fill out the form. Our team will reach out to you shortly.
              Thank you.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}

