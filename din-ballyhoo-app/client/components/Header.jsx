import Link from "next/link";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Din Ballyhoo</h1>
      <nav className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/shows" className={styles.navLink}>
          Shows
        </Link>
        <Link href="/albums" className={styles.navLink}>
          Albums
        </Link>
        <Link href="/webcasts" className={styles.navLink}>
          Webcast
        </Link>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/logout" className={styles.navLink}>
          Logout
        </Link>
      </nav>
    </header>
  );
}
