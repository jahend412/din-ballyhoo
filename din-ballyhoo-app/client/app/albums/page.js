"use client";

import React from "react";
import styles from "./AlbumsPage.module.css";
import Card from "../../components/Card";
import { albumConfig } from "@/app/config/cardConfigs";
import { useState, useEffect } from "react";
import { fetchAlbums } from "@/app/utils/fetchEntity";
import Header from "@/components/Header";

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Fetch albums
  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const fetchedAlbums = await fetchAlbums(token);
        setAlbums(fetchedAlbums);
      } catch (err) {
        console.error("Error fetching albums:", err);
        setError("Error fetching albums");
      }
    };

    loadAlbums();
  }, [token]);

  if (error) {
    return <p>{error}</p>;
  }

  if (albums.length === 0) {
    return <p>Loading...</p>;
  }

  console.log(albums);
  return (
    <div>
      <Header />
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
