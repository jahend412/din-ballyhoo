"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUserContext } from "@/app/context/UserContext";
import {
  fetchAlbums,
  fetchShows,
  fetchWebcasts,
} from "@/app/utils/fetchEntity";
import Header from "@/components/Header";
import Card from "@/components/Card";
import {
  albumConfig,
  showConfig,
  webcastConfig,
} from "@/app/config/cardConfigs";
import styles from "../WelcomePage.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import PopularTracks from "@/components/PopularTracks/PopularTracks";

export default function WelcomePage() {
  const { user, loading } = useUserContext();
  const [albums, setAlbums] = useState([]);
  const [shows, setShows] = useState([]);
  const [webcasts, setWebcasts] = useState([]);
  const [error, setError] = useState("");
  const token = Cookies.get("token");

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

  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const fetchUser = async () => {
      if (!loading && !user) {
        setError("User is null or not logged in");
        return;
      }
    };

    fetchUser();
  }, [user, loading]);

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user found</p>;
  }

  return (
    <div>
      <Header user={user} />

      <div className="section">
        <Link href="/albums" className={styles.headLink}>
          Albums
        </Link>
        <div className={styles.cardContainer}>
          {albums.length > 0 ? (
            albums.map((album) => (
              <Card
                key={album._id}
                data={album}
                config={albumConfig}
                entityType="album"
                entityId={album.id}
                isFavInit={album.isFavorite}
                showFavIcon={true}
              />
            ))
          ) : (
            <p>No albums found</p>
          )}
        </div>
      </div>
      <div className="section">
        <Link href="/webcasts" className={styles.headLink}>
          Webcasts
        </Link>
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
            <p>Stay Tuned for the first webcast</p>
          )}
        </div>
        <div className="section">
          <Link href="/shows" className={styles.headLink}>
            Shows
          </Link>
          <div className={styles.cardContainer}>
            {shows.length > 0 ? (
              shows.map((show) => (
                <Card
                  key={show._id}
                  data={show}
                  config={showConfig}
                  entityType="show"
                  entityId={show.id}
                  isFavInit={show.isFavorite}
                  showFavIcon={true}
                />
              ))
            ) : (
              <p>Stay Tuned for the first show</p>
            )}
          </div>
        </div>
        <div className="section">
          <PopularTracks tracks={PopularTracks} />
        </div>
      </div>
    </div>
  );
}
