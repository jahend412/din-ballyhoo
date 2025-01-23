import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
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
          <Link href="/customer" className={styles.navLink}>
            Customer Service
          </Link>
        </nav>
        <p className={styles.copy}>
          &copy; 2025 Din Ballyhoo | Powered by Power
        </p>
      </footer>
    </div>
  );
}
