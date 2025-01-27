"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { showConfig } from "@/app/config/cardConfigs";
import { fetchShows } from "@/app/utils/fetchEntity";
import styles from "@/app/albums/AlbumsPage.module.css";
import Cookies from "js-cookie";

export default function ShowPage() {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState("");
  const token = Cookies.get("token");

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
    <AuthenticatedLayout>
      <div>
        <div className={styles.albumsPage}>
          <h2>Shows</h2>
          <div className={styles.cardContainer}>
            {shows.length > 0 ? (
              shows.map((show) => (
                <Card
                  key={show._id}
                  data={show}
                  config={showConfig}
                  entityType="album"
                  entityId={show.id}
                  isFavInit={show.isFavorite}
                  showFavIcon={true}
                />
              ))
            ) : (
              <p>No shows found</p>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
