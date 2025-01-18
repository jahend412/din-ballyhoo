"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import Header from "@/components/Header";
import { showConfig } from "@/app/config/cardConfigs";
import { fetchShows } from "@/app/utils/fetchEntity";
import styles from "./ShowsPage.module.css";

export default function ShowPage() {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Fetch shows
  useEffect(() => {
    const loadShows = async () => {
      try {
        const fetchedShows = await fetchShows(token);
        setShows(fetchedShows);
      } catch (err) {
        console.error("Error fetching shows:", err);
        setError("Error fetching shows");
      }
    };

    loadShows();
  }, [token]);

  return (
    <div>
      <Header />
      <div className={styles.showsPage}>
        <h2>Shows</h2>
        <div className={styles.cardContainer}>
          {shows.length > 0 ? (
            shows.map((show) => (
              <Card key={show._id} data={show} config={showConfig} />
            ))
          ) : (
            <p>No shows found</p>
          )}
        </div>
      </div>
    </div>
  );
}
