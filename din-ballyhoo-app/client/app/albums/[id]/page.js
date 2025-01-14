"use client";

import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import CommentSection from "@/components/commentSection/CommentSection";
import TrackSection from "@/components/trackSection/TrackSection";
import Header from "@/components/Header";
import { fetchTrackUrl } from "@/app/utils/firebaseUtils";
import styles from "./AlbumPage.module.css";

export default function AlbumPage({ data }) {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [albumToken, setAlbumToken] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("tracks");
  const [activeTrack, setActiveTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAlbumAndComments = async () => {
      try {
        // Fetch album data
        const albumResponse = await fetch(`/api/v1/albums/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const albumData = await albumResponse.json();
        if (albumResponse.ok && albumData.status === "success") {
          const updatedTracks = await Promise.all(
            albumData.data.tracks.map(async (track) => {
              const url = await fetchTrackUrl(track.url);
              return { ...track, url };
            })
          );
          setAlbum({ ...albumData.data, tracks: updatedTracks });
        } else {
          setError("Failed to fetch album");
        }

        // Fetch comments for the album
        const commentsResponse = await fetch(`/api/v1/comments/album/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const commentsData = await commentsResponse.json();
        if (commentsResponse.ok && commentsData.status === "success") {
          setAlbum((prevAlbum) => ({
            ...prevAlbum,
            comments: commentsData.data.comments || [], // set comments data
          }));
        } else {
          setError("Failed to fetch comments");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAlbumAndComments();
  }, [id]);

  useEffect(() => {
    if (album) {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      setAlbumToken(token);
    }
  }, [album]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleTrackClick = (track) => {
    setActiveTrack(track);
    setPlaying(true);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!album) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <div className={styles.albumCover}>
        <Image
          src={`http://localhost:8080/${album.coverImage}`}
          alt={album.title}
          width={300}
          height={300}
          priority
        />
      </div>
      <div className={styles.albumInfo}>
        <h1>{album.title}</h1>
        <p>{album.artist}</p>
        <p>{album.releaseDate}</p>
      </div>
      <div className={styles.tabs}>
        <button
          onClick={() => handleSectionChange("tracks")}
          className={activeSection === "tracks" ? "active" : ""}
        >
          Tracks
        </button>
        <button
          onClick={() => handleSectionChange("details")}
          className={activeSection === "details" ? "active" : ""}
        >
          Details
        </button>
        <button
          onClick={() => handleSectionChange("comments")}
          className={activeSection === "comments" ? "active" : ""}
        >
          Reviews {album.comments ? album.comments.length : 0}
        </button>
      </div>
      {activeSection === "tracks" && (
        <div className={styles.trackList}>
          {album.tracks.map((track, index) => (
            <div
              key={track._id}
              className={`${styles.trackItem} ${
                activeTrack?.url === track.url ? styles.active : ""
              }`}
              onClick={() => handleTrackClick(track)}
            >
              <p>
                {index + 1}. {track.title}
              </p>
            </div>
          ))}
        </div>
      )}
      {activeSection === "details" && (
        <div className={styles.albumDetails}>
          <p>{album.details}</p>
        </div>
      )}
      {activeSection === "comments" && (
        <CommentSection entityType="album" entityId={id} />
      )}
      <div className={styles.trackPlayer}>
        {activeTrack && (
          <ReactPlayer
            url={activeTrack.url}
            controls
            playing={playing}
            width="100%"
            height="50px"
            onEnded={() => setPlaying(false)}
          />
        )}
      </div>
    </div>
  );
}
