"use client";

import { useState } from "react";
import styles from "./LoginPage.module.css";
import Header from "@/components/Header";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

      setSuccess("Login successful!");
      console.log(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h2>Login</h2>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
