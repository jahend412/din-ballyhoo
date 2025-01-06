"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Card from "@/components/Card";
import {
  albumConfig,
  showConfig,
  webcastConfig,
} from "@/app/config/cardConfigs";
import styles from "../WelcomePage.module.css";

export default function WelcomePage() {
  const [albums, setAlbums] = useState([]);
  const [shows, setShows] = useState([]);
  const [webcasts, setWebcasts] = useState([]);
  const [user, setUser] = useState(null);
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

    // Fetch shows
    fetch("/api/v1/shows", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setShows(data.data); // Set the shows array directly
        } else {
          console.error("Failed to fetch shows: Unexpected data structure");
        }
      })
      .catch((err) => console.error("Failed to fetch shows:", err));

    // Fetch webcasts
    fetch("/api/v1/webcasts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setWebcasts(data.data); // Set the webcasts array directly
        } else {
          console.error("Failed to fetch webcasts: Unexpected data structure");
        }
      })
      .catch((err) => console.error("Failed to fetch webcasts:", err));
  }, []);

  const params = useParams(); // Use useParams to get the dynamic route parameter
  const id = params?.id; // Ensure `id` is extracted safely

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized: No token provided");
          return;
        }

        const response = await axios.get(`/api/v1/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.data.user); // Update with the user data
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.response?.data?.message || "Error fetching user.");
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header user={user} />

      <div className="section">
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

      <div className="section">
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

      <div className="section">
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
