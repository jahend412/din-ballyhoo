"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SecondaryHeader from "@/components/SecondaryHeader";
import Image from "next/image";
import { useParams } from "next/navigation"; // Import useRouter to extract the ID from the URL
import styles from "./NewPage.module.css";
import Cookies from "js-cookie";

export default function NewPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState("");
  const [isLogged, setIsLogged] = useState(null); // Null means we haven't checked yet
  const [loading, setLoading] = useState(true); // Initially, we're loading
  const API_URL = process.env.BACKEND_URL;

  useEffect(() => {
    // Check for the token in Cookies
    const token = Cookies.get("token");

    if (token) {
      setIsLogged(true); // If token is found, user is logged in
    } else {
      setIsLogged(false); // No token, user is not logged in
    }

    setLoading(false); // Once the check is done, set loading to false
  }, []); // Run once on mount

  // Fetch news by id
  useEffect(() => {
    if (!id) return; // Wait for the id to be available

    const fetchNewsById = async () => {
      try {
        const newsResponse = await fetch(`${API_URL}/api/v1/news/${id}`, {
          method: "GET",
        });

        if (!newsResponse.ok) {
          throw new Error("Failed to fetch news");
        }

        const newsData = await newsResponse.json();
        setNews(newsData.data); // Assuming the news data is inside `data`
      } catch (error) {
        console.error("Error fetching news by id:", error);
        setError("Error fetching news by id");
      }
    };

    fetchNewsById();
  }, [id]); // Re-run effect when id changes

  // If still loading, display loading message
  if (loading) return <p>Loading...</p>;

  // If news is null or there's an error, display a message
  if (!news || error) return <p>{error || "News not found"}</p>;

  return (
    <>
      {/* Render header conditionally based on the login status */}
      {isLogged ? <Header /> : <SecondaryHeader />}
      <div className="newsPage">
        <div className={styles.entityCover}>
          {news.coverImage && (
            <Image
              src={`${API_URL}/${news.coverImage}`}
              alt={news.title || "cover image"}
              width={300}
              height={300}
              priority
            />
          )}
        </div>
        <div className={styles.entityInfo}>
          <h1>{news.title}</h1>
          <p>{new Date(news.datePosted).toLocaleDateString("en-us")}</p>
        </div>
        <div className={styles.entityContent}>
          <p>{news.content}</p>
        </div>
      </div>
    </>
  );
}
