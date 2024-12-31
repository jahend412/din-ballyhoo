"use client";

import { useState } from "react";
import styles from "./SignupPage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/v1/users/signup", {
        name,
        email,
        password,
        passwordConfirm,
      });

      setSuccess("Signup successful!");
      console.log(response.data);
      router.push("/login"); // Redirect to login page
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.logoContainer}>
        <Image
          className="logo"
          src="/logo.png"
          alt="Ballyhoo App"
          width="300"
          height="300"
        />
      </div>

      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h2>Sign up to continue</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              required
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
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              placeholder="Confirm Password"
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
            Sign In
          </button>
          <a href="/terms">Terms & Conditions</a> <br />
          <a href="/privacy">Privacy Policy</a>
          <p className={styles.signupLink}>
            Do you already have an account? <a href="/signup">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
