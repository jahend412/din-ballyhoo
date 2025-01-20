"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Header from "@/components/Header";
import { fetchNews } from "@/app/utils/fetchEntity";
import { newsConfig } from "@/app/config/cardConfigs";
import styles from "./NewsPage.module.css";
import Cookies from "js-cookie";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const token = Cookies.get("token");

  // Fetch news
  useEffect(() => {
    const loadNews = async () => {
      try {
        const fetchedNews = await fetchNews(token);
        setNews(fetchedNews);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Error fetching news");
      }
    };

    loadNews();
  }, [token]);

  if (error) {
    return <p>{error}</p>;
  }

  if (news.length === 0) {
    return <p>Loading...</p>;
  }

  console.log(news);
  return (
    <div>
      <Header />
      <div className={styles.newsPage}>
        <h2>News</h2>
        <div className={styles.cardContainer}>
          {news.length > 0 ? (
            news.map((news) => (
              <Card key={news._id} data={news} config={newsConfig} />
            ))
          ) : (
            <p>No news found</p>
          )}
        </div>
      </div>
    </div>
  );
}
