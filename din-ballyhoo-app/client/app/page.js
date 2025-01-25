"use client";

import Link from "next/link";
import Card from "@/components/Card";
import { newsConfig } from "@/app/config/cardConfigs";
import { useState, useEffect } from "react";
import SecondaryHeader from "@/components/SecondaryHeader";
API_URL = process.env.BACKEND_URL;

export default function Home() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/news`);
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
    <>
      <SecondaryHeader />
      <main className="home-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <h2 className="home-subtitle"> News </h2>
        <div className="home-news">
          {news.data && news.data.length > 0 ? (
            news.data.map((newsItem) => (
              <Card
                key={newsItem._id}
                data={newsItem}
                config={newsConfig}
                entityType="news"
                entityId={news.id}
                isFavInit={false}
                showFavoriteIcon={false}
              />
            ))
          ) : (
            <p>No news found</p>
          )}
        </div>
      </main>
    </>
  );
}
