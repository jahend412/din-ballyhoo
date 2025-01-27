"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const { user } = useUserContext();
  const { logoutUser } = useUserContext();
  const router = useRouter();
  const id = user ? user._id : null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      logoutUser();
      router.push("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Din Ballyhoo</h1>

      <button
        className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
        <Link href={`/users/${id}`} className={styles.navLink}>
          Welcome, {user ? user.name : "Guest"}
        </Link>
        <Link href="/news" className={styles.navLink}>
          News
        </Link>
        <Link
          href="https://www.youtube.com/@dinballyhoo6740"
          className={styles.navLink}
        >
          Videos
        </Link>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href={`/welcome/${id}`} className={styles.navLink}>
          Home
        </Link>
        <Link href="/" onClick={handleLogout} className={styles.navLink}>
          Logout
        </Link>
      </nav>
    </header>
  );
}
