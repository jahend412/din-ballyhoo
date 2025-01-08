"use client";

import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user from Cookies if available
    const savedUser = Cookies.get("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // Expires in 7 days
    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
  };

  const logoutUser = () => {
    setUser(null);
    Cookies.remove("user");
    Cookies.remove("token");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
