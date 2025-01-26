import { useState } from "react";
import { useRouter } from "next/router";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query; // Get the token from the URL

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/v1/users/resetPassword/${token}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, passwordConfirm }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px 20px" }}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
