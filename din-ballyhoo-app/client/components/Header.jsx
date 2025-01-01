import Link from "next/link";
import styles from "./Header.module.css";

export default function Header({ user }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Din Ballyhoo </h1>
      <nav className={styles.navLinks}>
        <Link href={"/profile/${userId}"} className={styles.navLink}>
          Welcome, {user.name}!
        </Link>
        <Link href="/logout" className={styles.navLink}>
          Logout
        </Link>
        <Link href="/news" className={styles.navLink}>
          News
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
        <Link href="/merch" className={styles.navLink}>
          Store
        </Link>
      </nav>
    </header>
  );
}
