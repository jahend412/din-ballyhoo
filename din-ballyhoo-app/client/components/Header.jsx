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
        <p>Welcome, {user ? user.name : "Guest"}</p>
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
        <button
          onClick={handleLogout}
          className={`${styles.navLink} ${styles.logout}`}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
