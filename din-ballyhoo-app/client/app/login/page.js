"use client";

import { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await axios.post("/api/v1/users/login", {
        email,
        password,
      });
      console.log("Response:", response.data);
      const user = response.data.data?.user; // Get the user ID and name from the response

      if (!user) {
        setError("User not found");
        return;
      }

      const { _id, name } = user; // Get the user ID from the response
      const token = response.data.token; // Get the token from the response

      // Optionally, store token in localStorage or cookies
      localStorage.setItem("token", token);
      localStorage.setItem("userId", _id); // Store user ID

      setSuccess("Login successful!");
      console.log("Login Success:", response.data);

      // Now that the client has mounted, redirect to the user's page
      if (isClient && _id) {
        console.log("Redirecting to:", _id); // Debugging log to check _id
        router.push(`/welcome/${_id}`); // Redirect to user's home page
      } else {
        setError("Unable to redirect, user ID is missing");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      console.error("Error:", error);
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
            />
          </div>
          <div className={styles.optionContainer}>
            <div className={styles.rememberMeContainer}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div className={styles.forgotPassword}>
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
          <Link href="/terms">Terms & Conditions</Link> <br />
          <a href="/privacy">Privacy Policy</a>
          <p className={styles.signupLink}>
            Don`t have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
