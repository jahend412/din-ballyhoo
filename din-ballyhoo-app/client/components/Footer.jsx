import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer({ user }) {
  return (
    <div id="root">
      <footer className={styles.footer}>
        <nav className={styles.navLinks}>
          <Link href="/terms" className={styles.navLink}>
            Terms of Service
          </Link>
          <Link href="/privacy" className={styles.navLink}>
            Privacy Policy
          </Link>
          <Link href="/customer-service" className={styles.navLink}>
            Customer Service
          </Link>
          <Link href={`/profile/${user}`} className={styles.navLink}>
            Profile
          </Link>
        </nav>
        <p className={styles.copy}>
          &copy; 2025 Din Ballyhoo | Powered by Power
        </p>
      </footer>
    </div>
  );
}
