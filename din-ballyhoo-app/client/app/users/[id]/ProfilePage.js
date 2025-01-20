"use client";

import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/alert/AlertDialog";
import "./ProfilePage.css";
import Header from "@/components/Header";
import Cookies from "js-cookie";

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
  const [deleteError, setDeleteError] = useState("");

  // Fetch user data when component mounts
  useEffect(() => {
    console.log("ProfilePage id:", id);

    const fetchUserData = async () => {
      const token = Cookies.get("token");
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

  // Handle Update User
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setError("");

    const token = Cookies.get("token");
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    const updatedData = {
      name: newName || user.name,
      email: newEmail || user.email,
    };

    try {
      const response = await fetch(`/api/v1/users/updateMe`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (response.ok && data.status === "success" && data.data?.user) {
        setUser(data.data.user);
        setError("");
        setNewName("");
        setNewEmail("");
      } else {
        setError("Failed to update profile.");
      }
    } catch (error) {
      setError("Error updating profile.");
    }
  };

  // Handle Password Update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword !== passwordConfirm) {
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
          newPassword,
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

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setDeleteError("You must be logged in.");
      return;
    }

    try {
      const response = await fetch("/api/v1/users/deleteMe", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete account");
      }

      // Clear local storage
      localStorage.removeItem("token");

      // Redirect to home page or login page
      router.push("/login");
    } catch (error) {
      setDeleteError(`Error deleting account: ${error.message}`);
    }
  };
  // Render loading or error messages while fetching data
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Once data is fetched and loaded, render the user profile
  return (
    <div>
      <Header />
      <h1>Profile</h1>
      {user ? (
        <div className="profile">
          <h2>Profile Information</h2>
          <form onSubmit={handleUpdateUser}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={newName}
                placeholder={user.name}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={newEmail}
                placeholder={user.email}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <br />
              <button type="submit">Update Profile</button>
            </div>
          </form>

          <div>
            <h2>Change Password</h2>
            {passwordError && <p className="error">{passwordError}</p>}
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
              <br />
              <button type="submit">Update Password</button>
            </form>
          </div>

          <div className="section">
            <h2>Delete Profile</h2>
            {deleteError && <p className="error">{deleteError}</p>}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                  Delete Account
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove all of your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}
