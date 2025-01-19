"use client";

import Link from "next/link";
import Card from "@/components/Card";
import { newsConfig } from "@/app/config/cardConfigs";
import { useState, useEffect } from "react";

export default function Home() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/v1/news");
        const data = await res.json();

        if (data.status === "success") {
          setNews(data); // Store the entire response object
        } else {
          setError("Failed to fetch news data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="home-container">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <h1 className="home-title">Din Ballyhoo</h1>
      <h2 className="home-subtitle"> News </h2>
      <div className="home-news">
        {news.data && news.data.length > 0 ? (
          news.data.map((newsItem) => (
            <Card key={newsItem._id} data={newsItem} config={newsConfig} />
          ))
        ) : (
          <p>No news found</p>
        )}
      </div>
      <h2 className="home-subtitle"> Log in to check out our Music </h2>
      <div className="home-links">
        <Link href="/login" className="home-link">
          Log In
        </Link>
        <Link href="/signup" className="home-link">
          Sign Up
        </Link>
      </div>
    </main>
  );
}
