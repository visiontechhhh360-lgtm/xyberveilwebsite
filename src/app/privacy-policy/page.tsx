import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy - QyBitz Solutions VPN",
  description:
    "Learn how QyBitz Solutions VPN handles personal data and protects user information under a strict No-Log policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pb-12 pt-10 sm:pt-14">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold">Privacy Policy</h1>
          <p className="mt-3 text-xs uppercase tracking-widest text-white/50">
            Current as of 08 July 2025
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Learn how we handle your personal data and protect your information.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            This Privacy Policy outlines the principles of personal and technical data processing carried out by QyBitz Solutions within the scope of its digital VPN service.
          </p>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">1. Data Processed</h2>
            <p className="text-sm leading-relaxed text-white/70">
              <strong>Email address:</strong> used solely for sending a one-time OTP code, not stored or linked to the user's activity.
            </p>
            <p className="text-sm leading-relaxed text-white/70 mt-2">
              <strong>Technical data</strong> (e.g., device type, browser) may be temporarily used to ensure proper interface display and service functionality, without being associated with an individual user.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">2. No-Log Policy</h2>
            <p className="text-sm leading-relaxed text-white/70">
              The Company adheres to a strict No-Log policy. We do not collect, store, or process the following:
              <ul className="list-disc ml-5 mt-2">
                <li>IP addresses</li>
                <li>DNS queries</li>
                <li>Connection routes</li>
                <li>Timestamps</li>
                <li>Traffic volume</li>
              </ul>
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">3. Data Retention</h2>
            <p className="text-sm leading-relaxed text-white/70">
              The Company does not store personal data.
            </p>
            <p className="text-sm leading-relaxed text-white/70 mt-2">
              Email is processed only at the moment of sending the one-time OTP code.
            </p>
            <p className="text-sm leading-relaxed text-white/70 mt-2">
              Google authentication data (such as the email address or authentication token) is used only for the purpose of login and is not stored or linked to any user activity.
            </p>
            <p className="text-sm leading-relaxed text-white/70 mt-2">
              Technical data is deleted after the session ends and is not stored in any databases.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">4. Data Disclosure to Third Parties</h2>
            <p className="text-sm leading-relaxed text-white/70">
              The Company may share limited technical data with payment providers or contractors when necessary for service delivery. Such data does not include any personally identifiable information and is used solely to fulfill specific technical requirements.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">5. User Responsibility</h2>
            <p className="text-sm leading-relaxed text-white/70">
              Users are solely responsible for ensuring that the use of the service complies with the laws and regulations of their jurisdiction, including VPN usage and data protection requirements.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">6. Contact</h2>
            <p className="text-sm leading-relaxed text-white/70">
              For any questions regarding personal data processing, users may contact the Company through the email address provided on the website.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}