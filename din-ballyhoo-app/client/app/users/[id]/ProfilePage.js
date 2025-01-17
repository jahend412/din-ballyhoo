"use client";

import React, { useState, useEffect } from "react";

export default function ProfilePage({ id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // Fetch user data when component mounts
  useEffect(() => {
    console.log("ProfilePage id:", id);

    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(`/api/v1/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Error: ${response.statusText} - Status code: ${response.status}`
          );
        }

        const responseData = await response.json();
        console.log(
          "Raw response data:",
          JSON.stringify(responseData, null, 2)
        );

        // Check for the correct nested structure
        if (responseData.status === "success" && responseData.data?.user) {
          setUser(responseData.data.user);
          setError("");
        } else {
          throw new Error("Invalid user data structure");
        }
      } catch (error) {
        setError(`Error fetching user data: ${error.message}`);
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    } else {
      setError("User ID is missing.");
      setLoading(false);
    }
  }, [id]);

  // Handle Password Update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswrodError("");

    if (newPassword !== newPasswordConfirm) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    try {
      const response = await fetch(`/api/v1/users/updatePassword`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          Password,
          passwordConfirm,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        throw new Error(data.message || "Failed to update password.");
      }

      // Update token since the API sends a new one
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setPasswordConfirm("");
      setPasswordError("");

      // Show success message
      alert("Password updated successfully.");
    } catch (error) {
      setPasswordError(error.message);
    }
  };

  // Handle profile update form submission
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    const updatedData = {
      name: newName || user.name,
      email: newEmail || user.email,
      password: newPassword,
    };

    try {
      const response = await fetch(`/api/v1/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Update user with the latest data
        setError(""); // Clear error
        setNewName("");
        setNewEmail("");
        setNewPassword("");
      } else {
        setError("Failed to update profile.");
      }
    } catch (error) {
      setError("Error updating profile.");
    }
  };

  // Render loading or error messages while fetching data
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Once data is fetched and loaded, render the user profile
  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <h2>Profile Information</h2>
          <form onSubmit={handleProfileUpdate}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={newName}
                placeholder={user.name} // Use placeholder for current name
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={newEmail}
                placeholder={user.email} // Use placeholder for current email
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div>
              <h2>Change Password</h2>
              {passwordError && (
                <p className="passwordError">{passwordError}</p>
              )}
              <form onSubmit={handlePasswordUpdate} className="passwordForm">
                <label className="passwordLabel">Current Password:</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
                <label className="passwordLabel">New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label className="passwordLabel">Confirm Password:</label>
                <input
                  type="password"
                  value={passwordConfirm}
                  placeholder="Confirm new password"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <button type="submit">Update Password</button>
              </form>
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}
