"use client";

import Link from "next/link";
import styles from "./SecondaryHeader.module.css";

export default function SecondaryHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Din Ballyhoo</h1>
      <h2 className={styles.subtitle}>Check Out our Music</h2>
      <div className={styles.navLinks}>
        <Link href="/login" className={styles.navLink}>
          Log In
        </Link>
        <Link href="/signup" className={styles.navLink}>
          Sign Up
        </Link>
      </div>
    </header>
  );
}
