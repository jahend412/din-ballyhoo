"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WelcomePage() {
  const params = useParams(); // Use useParams to get the dynamic route parameter
  const id = params?.id; // Ensure `id` is extracted safely

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized: No token provided");
          return;
        }

        const response = await axios.get(`/api/v1/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.data.user);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching user.");
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header user={user} />
      <h1>Welcome, {user.name}!</h1>
      <Footer />
    </div>
  );
}
