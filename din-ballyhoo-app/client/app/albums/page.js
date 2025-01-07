"use client";

import React from "react";
import styles from "./AlbumsPage.module.css";
import Card from "../../components/Card";
import { albumConfig } from "@/app/config/cardConfigs";
import { useState, useEffect } from "react";

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Please log in.");
          return;
        }

        const response = await fetch("/api/v1/albums", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch albums");
        }

        const data = await response.json();
        setAlbums(data.data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      }
    };

    fetchAlbums();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (albums.length === 0) {
    return <p>Loading...</p>;
  }

  console.log(albums);
  return (
    <div>
      <div className={styles.albumsPage}>
        <h2>Albums</h2>
        <div className={styles.cardContainer}>
          {albums.length > 0 ? (
            albums.map((album) => (
              <Card key={album._id} data={album} config={albumConfig} />
            ))
          ) : (
            <p>No albums found</p>
          )}
        </div>
      </div>
    </div>
  );
}
