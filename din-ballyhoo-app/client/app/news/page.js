"use client";

import { useEffect, useState } from "react";

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch the news from your API
    fetch("http://localhost:8080/news")
      .then((res) => res.json())
      .then((data) => setNews(data.data));
  }, []);

  return (
    <div>
      <h1>Latest News</h1>
      {news.map((item) => (
        <div key={item._id}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
