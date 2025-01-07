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
    const token = localStorage.getItem("token");

    // Fetch albums
    fetch("/api/v1/albums", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched albums:", data);
        if (data.status === "success") {
          // Ensure coverImage has a leading slash
          const updatedAlbums = data.data.map((album) => {
            if (album.coverImage && !album.coverImage.startsWith("/")) {
              album.coverImage = `/${album.coverImage}`; // Add leading slash
            }
            return album;
          });
          setAlbums(updatedAlbums); // Set the albums array with updated coverImage paths
        } else {
          console.error("Failed to fetch albums: Unexpected data structure");
        }
      })
      .catch((err) => console.error("Failed to fetch albums:", err));
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
