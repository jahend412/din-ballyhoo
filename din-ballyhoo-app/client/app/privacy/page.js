import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-title">Privacy Policy</h1>
      <p className="privacy-policy-intro">
        Din Ballyhoo values your privacy. This Privacy Policy outlines how we
        collect, use, and protect your personal information.
      </p>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-heading">1. Information We Collect</h2>
        <ul className="privacy-policy-list">
          <li className="privacy-policy-item">
            Personal identification information (e.g., name, email address,
            etc.)
          </li>
          <li className="privacy-policy-item">
            Payment information for purchases and donations
          </li>
          <li className="privacy-policy-item">
            Usage data, including app activity and preferences
          </li>
        </ul>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-heading">
          2. How We Use Your Information
        </h2>
        <p className="privacy-policy-text">
          We use the information to improve our app, provide customer support,
          process transactions, and communicate updates.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-heading">3. Sharing Your Information</h2>
        <p className="privacy-policy-text">
          We do not sell your personal information. We may share it with service
          providers to facilitate our services or as required by law.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-heading">
          4. Security of Your Information
        </h2>
        <p className="privacy-policy-text">
          We take reasonable measures to protect your data from unauthorized
          access or disclosure. However, no method of transmission is 100%
          secure.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-heading">5. Your Rights</h2>
        <p className="privacy-policy-text">
          You have the right to access, update, or delete your personal
          information. Please contact us if you wish to exercise these rights.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2 className="privacy-policy-heading">6. Updates to This Policy</h2>
        <p className="privacy-policy-text">
          We may update this Privacy Policy from time to time. We will notify
          you of significant changes by posting a notice in the app.
        </p>
      </section>

      <p className="privacy-policy-footer">
        If you have any questions about this Privacy Policy, please contact us
        at support@dinballyhoo.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
