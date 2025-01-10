"use client";

import Link from "next/link";
import { useUserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const { user } = useUserContext();
  const { logoutUser } = useUserContext();
  const router = useRouter();

  const handleLogout = async () => {
    logoutUser();
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Din Ballyhoo</h1>
      <nav className={styles.navLinks}>
        <Link href="/profile" className={styles.navLink}>
          Welcome, {user ? user.name : "Guest"}
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
        <Link
          href="https://www.youtube.com/@dinballyhoo6740"
          className={styles.navLink}
        >
          Videos
        </Link>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/login" onClick={handleLogout} className={styles.navLink}>
          Logout
        </Link>
      </nav>
    </header>
  );
}
