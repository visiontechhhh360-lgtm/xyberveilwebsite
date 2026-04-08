import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const Privacy = () => (
  <Layout>
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection>
          <h1 className="font-display text-4xl font-bold mb-8 glow-text">Privacy Policy</h1>
          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Last updated:</strong> April 7, 2026</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">1. Information We Collect</h2>
            <p>Xyber Veil collects minimal information necessary to provide our VPN service. We do <strong className="text-foreground">not</strong> log your browsing activity, connection timestamps, DNS queries, IP addresses, or any traffic data.</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">2. How We Use Information</h2>
            <p>Account information (email address) is used solely for account management, billing, and customer support. We never sell, trade, or share your personal data with third parties.</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">3. Data Security</h2>
            <p>We employ 256-bit AES encryption, perfect forward secrecy, and secure protocols to protect all data in transit. Our infrastructure is regularly audited by independent security firms.</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">4. No-Logs Policy</h2>
            <p>We maintain a strict no-logs policy. We do not monitor, record, log, store, or share any of your online activity. This policy has been independently verified and audited.</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">5. Cookies</h2>
            <p>Our website uses essential cookies only. No tracking cookies, no analytics cookies, no advertising cookies.</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">6. Contact</h2>
            <p>For privacy inquiries, contact us at <span className="text-primary">privacy@xyberveil.com</span>.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default Privacy;
