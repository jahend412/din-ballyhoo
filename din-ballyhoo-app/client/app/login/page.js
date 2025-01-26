"use client";

import { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useUserContext } from "@/app/context/UserContext"; // Import useUserContext
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const router = useRouter();
  const { loginUser } = useUserContext(); // Destructure loginUser from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email || !password) {
      setError(`Missing ${!email ? "Email" : "Password"}`);
      setLoading(false);
      return;
    }

    try {
      console.log("Sending login request...");
      const response = await axios.post(`${API_URL}/api/v1/users/login`, {
        email,
        password,
      });
      console.log("Login response:", response); // Ensure you see this

      const user = response.data.data?.user;
      const token = response.data.token;

      if (!user || !token) {
        setError("Invalid login response");
        setLoading(false);
        return;
      }

      loginUser(user, token);
      setSuccess("Login successful!");
      const frontendUrl =
        process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"; // Default to localhost for dev
      router.push(`${frontendUrl}/welcome/${user._id}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      console.error("Login error:", errorMessage); // Log the error message
      setError(errorMessage);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.logoContainer}>
        <Image
          className="logo"
          src="/logo.png"
          alt="Ballyhoo App"
          width="400"
          height="400"
        />
      </div>

      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h2>Sign in to continue</h2>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className={error && !email ? styles.invalidInput : ""}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={error && !password ? styles.invalidInput : ""}
            />
          </div>
          <div className={styles.optionContainer}>
            <div className={styles.forgotPassword}>
              <Link href="/forgotPassword">Forgot password?</Link>
            </div>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link href="/terms">Terms & Conditions</Link> <br />
          <Link href="/privacy">Privacy Policy</Link>
          <p className={styles.signupLink}>
            Don’t have an account? <Link href="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
