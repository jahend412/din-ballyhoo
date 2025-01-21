"use client";

import React from "react";
import styles from "@/app/albums/AlbumsPage.module.css";
import Card from "../../components/Card";
import { webcastConfig } from "@/app/config/cardConfigs";
import { useState, useEffect } from "react";
import { fetchWebcasts } from "@/app/utils/fetchEntity";
import Header from "@/components/Header";
import Cookies from "js-cookie";

export default function AlbumsPage() {
  const [webcasts, setWebcasts] = useState([]);
  const [error, setError] = useState("");
  const token = Cookies.get("token");

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
              <Card
                key={webcast._id}
                data={webcast}
                config={webcastConfig}
                entityType="webcast"
                entityId={webcast.id}
                isFavInit={webcast.isFavorite}
                showFavIcon={true}
              />
            ))
          ) : (
            <p>No webcasts found</p>
          )}
        </div>
      </div>
    </div>
  );
}
