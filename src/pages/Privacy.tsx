import { LegalPage } from '../components/LegalPage'

const Privacy = () => (
  <LegalPage title="Privacy Policy" docTitle="Privacy Policy — Xyberveil VPN">
    <p className="legal__meta">
      Current as of 08 July 2025
    </p>
    <p className="legal__intro">
      Learn how we handle your personal data and protect your information.
    </p>
    <p className="legal__intro">
      This Privacy Policy outlines the principles of personal and technical data processing carried out by QyBitz Solutions within the scope of its digital VPN service.
    </p>

    <section className="legal__section">
      <h2>1. Data Processed</h2>
      <p>
        <strong>Email address:</strong> used solely for sending a one-time OTP code, not stored or linked to the user's activity.
      </p>
      <p>
        <strong>Technical data</strong> (e.g., device type, browser) may be temporarily used to ensure proper interface display and service functionality, without being associated with an individual user.
      </p>
    </section>

    <section className="legal__section">
      <h2>2. No-Log Policy</h2>
      <p>
        The Company adheres to a strict No-Log policy. We do not collect, store, or process the following:
      </p>
      <ul className="legal__list">
        <li>IP addresses</li>
        <li>DNS queries</li>
        <li>Connection routes</li>
        <li>Timestamps</li>
        <li>Traffic volume</li>
      </ul>
    </section>

    <section className="legal__section">
      <h2>3. Data Retention</h2>
      <p>
        The Company does not store personal data.
      </p>
      <p>
        Email is processed only at the moment of sending the one-time OTP code.
      </p>
      <p>
        Google authentication data (such as the email address or authentication token) is used only for the purpose of login and is not stored or linked to any user activity.
      </p>
      <p>
        Technical data is deleted after the session ends and is not stored in any databases.
      </p>
    </section>

    <section className="legal__section">
      <h2>4. Data Disclosure to Third Parties</h2>
      <p>
        The Company may share limited technical data with payment providers or contractors when necessary for service delivery. Such data does not include any personally identifiable information and is used solely to fulfill specific technical requirements.
      </p>
    </section>

    <section className="legal__section">
      <h2>5. User Responsibility</h2>
      <p>
        Users are solely responsible for ensuring that the use of the service complies with the laws and regulations of their jurisdiction, including VPN usage and data protection requirements.
      </p>
    </section>

    <section className="legal__section">
      <h2>6. Contact</h2>
      <p>
        For any questions regarding personal data processing, users may contact the Company through the email address provided on the website.
      </p>
    </section>
  </LegalPage>
)

export default Privacy
