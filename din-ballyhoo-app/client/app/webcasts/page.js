"use client";

import React from "react";
import styles from "@/app/albums/AlbumsPage.module.css";
import Card from "../../components/Card";
import { webcastConfig } from "@/app/config/cardConfigs";
import { useState, useEffect } from "react";
import { fetchWebcasts } from "@/app/utils/fetchEntity";
import Header from "@/components/Header";

export default function AlbumsPage() {
  const [webcasts, setWebcasts] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Fetch webcasts
  useEffect(() => {
    const loadWebcasts = async () => {
      try {
        const fetchedWebcasts = await fetchWebcasts(token);
        setWebcasts(fetchedWebcasts);
      } catch (err) {
        console.error("Error fetching webcasts:", err);
        setError("Error fetching webcasts");
      }
    };

    loadWebcasts();
  }, [token]);

  if (error) {
    return <p>{error}</p>;
  }

  if (webcasts.length === 0) {
    return <p>No Webcasts Found</p>;
  }

  console.log(webcasts);

  return (
    <div>
      <Header />
      <div className={styles.albumsPage}>
        <h2>Webcasts</h2>
        <div className={styles.cardContainer}>
          {webcasts.length > 0 ? (
            webcasts.map((webcast) => (
              <Card key={webcast._id} data={webcast} config={webcastConfig} />
            ))
          ) : (
            <p>No webcasts found</p>
          )}
        </div>
      </div>
    </div>
  );
}
