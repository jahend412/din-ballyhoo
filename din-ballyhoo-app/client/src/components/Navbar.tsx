import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaShoppingCart } from "react-icons/fa";
import styles from "../styles/Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      {/* Logo Section */}
      <div className={styles.logo}>
        <Link href="/">
          <a>Din Ballyhoo</a>
        </Link>
      </div>

      {/* Navigation Items */}
      <div className={styles.navItems}>
        {/* Social Links */}
        <div className={styles.socialLinks}>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter className={styles.icon} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF className={styles.icon} />
          </a>
        </div>

        {/* Login Button */}
        <button className={styles.loginButton}>Login</button>

        {/* Cart Icon */}
        <button className={styles.cartButton} aria-label="Cart">
          <FaShoppingCart className={styles.icon} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
