"use client";

import Link from "next/link";
import styles from "./Header.module.css";

export default function SecondaryHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Din Ballyhoo</h1>
      <nav className={styles.navLinks}>
        <Link href="/login" className={styles.navLink}>
          Log In
        </Link>
        <Link href="/signup" className={styles.navLink}>
          Sign Up
        </Link>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
      </nav>
    </header>
  );
}
