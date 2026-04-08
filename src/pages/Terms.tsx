import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const Terms = () => (
  <Layout>
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection>
          <h1 className="font-display text-4xl font-bold mb-8 glow-text">Terms of Service</h1>
          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Last updated:</strong> April 7, 2026</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">1. Acceptance of Terms</h2>
            <p>By accessing or using Xyber Veil's services, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">2. Service Description</h2>
            <p>Xyber Veil provides a virtual private network (VPN) service that encrypts your internet connection and masks your IP address to protect your online privacy.</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">3. Acceptable Use</h2>
            <p>You agree not to use Xyber Veil for any illegal activities. You may not use our service to transmit malware, conduct attacks, or engage in any activity that violates applicable laws.</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">4. Subscriptions & Billing</h2>
            <p>Paid subscriptions auto-renew unless cancelled before the renewal date. You may cancel at any time through your account settings. Refunds are available within 30 days of purchase.</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">5. Limitation of Liability</h2>
            <p>Xyber Veil is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of our service.</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">6. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of the service constitutes acceptance of the updated terms.</p>

            <h2 className="font-display text-lg font-bold text-foreground mt-8">7. Contact</h2>
            <p>Questions about these terms? Contact us at <span className="text-primary">legal@xyberveil.com</span>.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default Terms;
