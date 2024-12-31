import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo1.png" alt="Ballyhoo App" width="100" height="100" />
      </div>
      <h1 className={styles.title}>Din Ballyhoo </h1>
      <nav className={styles.navLinks}>
        <Link href={"/profile/${userId}"} className={styles.navLink}>
          Welcome, {user.name}!
        </Link>
        <Link href="/logout" className={styles.navLink}>
          Logout
        </Link>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/contact" className={styles.navLink}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
