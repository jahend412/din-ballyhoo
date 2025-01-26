"use client";

import Image from "next/image";
import styles from "./TermsPage.module.css";

export default function TermsOfUse() {
  return (
    <main className={styles.termsContainer}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src="/logo.png"
          alt="Ballyhoo App"
          width="400"
          height="400"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>Terms of Use</div>
        <div className={styles.lastUpdated}>Last updated: 1/1/2025</div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>1. Acceptance of Terms</div>
          <div className={styles.sectionText}>
            By accessing or using the Din Ballyhoo app, you agree to be bound by
            these Terms of Use and our Privacy Policy. If you do not agree, do
            not use the app.
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>2. Use of the Service</div>
          <div className={styles.sectionText}>
            The Din Ballyhoo app provides users with the ability to check out
            all of their products. You agree to use the app in accordance with
            all applicable laws and regulations.
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>3. User Accounts</div>
          <div className={styles.sectionText}>
            To access certain features, you may need to create an account. You
            are responsible for maintaining the confidentiality of your account
            information.
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            4. Payments and Subscriptions
          </div>
          <div className={styles.sectionText}>
            If the app offers paid features, you agree to pay all fees
            associated with your account. Subscription details, including
            renewal and cancellation policies, will be outlined during purchase.
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>5. Intellectual Property</div>
          <div className={styles.sectionText}>
            All content, trademarks, and intellectual property related to the
            app are owned by Din Ballyhoo. You may not use, copy, or distribute
            any content without prior written permission.
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>6. Prohibited Conduct</div>
          <div className={styles.sectionText}>
            You agree not to engage in any activity that disrupts or interferes
            with the app`s operation or infringes on the rights of others.
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>7. Termination</div>
          <div className={styles.sectionText}>
            We reserve the right to suspend or terminate your account for any
            violation of these Terms or for any other reason at our sole
            discretion.
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>8. Limitation of Liability</div>
          <div className={styles.sectionText}>
            Din Ballyhoo is not liable for any damages resulting from the use or
            inability to use the app, to the extent permitted by law.
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>9. Changes to Terms</div>
          <div className={styles.sectionText}>
            We may update these Terms of Use from time to time. Continued use of
            the app constitutes your acceptance of the updated terms.
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>10. Governing Law</div>
          <div className={styles.sectionText}>
            These Terms are governed by the laws of United States, without
            regard to its conflict of laws principles.
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>11. Contact Us</div>
          <div className={styles.sectionText}>
            If you have any questions about these Terms, please contact us at
            din-ballyhoo@gmail.com.
          </div>
        </div>

        <div className={styles.sectionTitle}>
          Thank you for using Din Ballyhoo!
        </div>
      </div>
    </main>
  );
}
