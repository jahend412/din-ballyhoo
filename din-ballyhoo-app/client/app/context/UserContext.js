"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const UserContext = createContext();

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromToken = async () => {
    if (typeof window === "undefined") return; // Ensure function runs only on client side

    const token = Cookies.get("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const decoded = parseJwt(token);
      if (!decoded) throw new Error("Invalid token");

      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        console.warn("Token has expired");
        Cookies.remove("token");
        setUser(null);
        setLoading(false);
        return;
      }

      const userId = decoded.id;
      const response = await axios.get(`/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.data.user);
    } catch (error) {
      console.error("Error fetching user or decoding token:", error);
      setUser(null);
    }
    setLoading(false);
  };

  const loginUser = (user, token) => {
    Cookies.set("token", token, {
      secure: true,
      sameSite: "strict",
      expires: 7,
    });

    setUser(user);
  };

  const logoutUser = () => {
    Cookies.remove("token");
    setUser(null);
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, logoutUser, loginUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access to the user context
const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
