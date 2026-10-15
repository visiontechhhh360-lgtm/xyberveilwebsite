import { LegalPage } from '../components/LegalPage'

const Terms = () => (
  <LegalPage title="Terms of Service" docTitle="Terms of Service — Xyberveil VPN">
    <p className="legal__meta">
      Current as of 08 July 2025
    </p>
    <p className="legal__intro">
      Learn how we handle your personal data and protect your information.
    </p>

    <section className="legal__section">
      <h2>Terms of Service</h2>
      <p>
        These Terms of Use govern access to the digital VPN service provided by QyBitz Solutions, as well as the rights and obligations of the parties.
      </p>
    </section>

    <section className="legal__section">
      <h2>1. Scope</h2>
      <p>
        The Company provides the User with a non-material digital VPN service designed to ensure secure and private Internet access, under these Terms.
      </p>
    </section>

    <section className="legal__section">
      <h2>2. Restrictions</h2>
      <p>
        Users are prohibited from using the service for:
      </p>
      <ul className="legal__list">
        <li>unlawful activities;</li>
        <li>distribution of malware;</li>
        <li>sending spam;</li>
        <li>interfering with third-party systems or networks;</li>
        <li>bypassing restrictions in countries where VPN use is prohibited;</li>
        <li>for any purposes that contradict these Terms.</li>
      </ul>
    </section>

    <section className="legal__section">
      <h2>3. Liability</h2>
      <p>
        The service is provided "as is." The Company shall not be liable for access restrictions or other consequences related to the use of VPN in specific jurisdictions. The User is solely responsible for ensuring that VPN usage is legal in their location. The Company is not responsible for the actions of third-party services used to access the VPN or to process payments.
      </p>
    </section>

    <section className="legal__section">
      <h2>4. Subscription & Billing</h2>
      <p>
        Access to premium features may require an active subscription. Subscriptions are billed on a recurring basis (e.g., weekly, monthly, or annually) depending on the plan selected at the time of purchase. Payments are processed securely through authorized platforms such as the Apple App Store, Google Play Store, or other third-party payment gateways.
      </p>
      <p>
        Users are responsible for managing their subscriptions through the platform from which the subscription was purchased. Subscription fees may be subject to applicable taxes and currency exchange rates based on the user’s location.
      </p>
    </section>

    <section className="legal__section">
      <h2>5. Refund Policy</h2>
      <p>
        All payments made for subscriptions are generally non-refundable. However, refund requests may be considered on a case-by-case basis in accordance with the refund policy of the platform through which the subscription was purchased (e.g., App Store or Play Store policies).
      </p>
      <p>
        For subscriptions purchased directly through our website, users may contact our support team within 7 days of purchase to request a refund, which will be reviewed in good faith.
      </p>
    </section>

    <section className="legal__section">
      <h2>6. End User License Agreement (EULA)</h2>
      <p>
        By accessing, downloading, or using our mobile application, you acknowledge that you are entering into a license agreement governed by Apple’s Standard End User License Agreement (EULA).
      </p>
      <p>
        You can review Apple’s Standard EULA at:
        <br />
        <a
          href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
        </a>
      </p>
    </section>

    <section className="legal__section">
      <h2>7. Final Provisions</h2>
      <p>
        Continued use of the service constitutes full acceptance of these Terms. The Company reserves the right to update these Terms. The current version is always available on the website.
      </p>
    </section>
  </LegalPage>
)

export default Terms
