"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const UserContext = createContext();

const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromToken = async () => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded = parseJwt(token);
        const userId = decoded.id;

        const response = await axios.get(`/api/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const loginUser = (user, token) => {
    Cookies.set("token", token);
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
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access to the user context
const useUserContext = () => {
  return useContext(UserContext);
};

// Export the provider and the custom hook
export { UserProvider, useUserContext };
