"use client";

import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import CommentSection from "@/components/commentSection/CommentSection";
import Header from "@/components/Header";
import { fetchTrackUrl } from "@/app/utils/firebaseUtils";
import styles from "@/app/EntityPageCSS/EntityPage.module.css";
import Link from "next/link";
import Cookies from "js-cookie";

export default function ShowPage({ data }) {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showToken, setShowToken] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("tracks");
  const [activeTrack, setActiveTrack] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    const fetchShowAndComments = async () => {
      try {
        // Fetch webcast data
        const showResponse = await fetch(`/api/v1/shows/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const showData = await showResponse.json();
        console.log("show Data: ", showData);

        if (showResponse.ok && showData.status === "success") {
          const updatedTracks = await Promise.all(
            showData.data.tracks.map(async (track) => {
              const url = await fetchTrackUrl(track.url);
              return { ...track, url };
            })
          );
          setShow({ ...showData.data, tracks: updatedTracks });
        } else {
          setError("Failed to fetch show");
        }

        // Fetch comments for the webcast
        const commentsResponse = await fetch(`/api/v1/comments/show/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const commentsData = await commentsResponse.json();
        if (commentsResponse.ok && commentsData.status === "success") {
          setWebcast((prevWebcast) => ({
            ...prevWebcast,
            comments: commentsData.data.comments || [], // set comments data
          }));
        } else {
          setError("Failed to fetch comments");
        }
      } catch (err) {
        console.error("Error fetching show:", err);
        setError("Error fetching show");
      }
    };
    fetchShowAndComments();
  }, [id]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleTrackClick = (track) => {
    setActiveTrack(track);
    setPlaying(true);
  };

  const handlePlay = async () => {
    if (activeTrack && albumToken) {
      try {
        await fetch(
          `${BASE_URL}/api/v1/tracks/${activeTrack._id}/increment-playcount`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        console.log(`Play count incremented for track: ${activeTrack.title}`);
      } catch (error) {
        console.error("Error updating play count:", error);
      }
    }
  };

  const updateComments = (newComment) => {
    setShow((prevShow) => ({
      ...prevShow,
      comments: [...prevShow.comments, newComment],
    }));
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!webcast) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className={styles.entityCover}>
        <Image
          src={`http://localhost:8080/${show.coverImage}`}
          alt={show.title}
          width={800}
          height={800}
          priority
        />
      </div>
      <div className={styles.entityInfo}>
        <h1>{show.title}</h1>
        <p>{show.description}</p>
        <p>{new Date(show.date).toLocaleDateString("en-us")}</p>
        <Link className={styles.videoLink} href={show.videoUrl}>
          Watch Here
        </Link>
      </div>
      <div className={styles.tabs}>
        <button
          className={activeSection === "tracks" ? styles.active : ""}
          onClick={() => handleSectionChange("tracks")}
        >
          Tracks
        </button>
        <button
          className={activeSection === "details" ? styles.active : ""}
          onClick={() => handleSectionChange("details")}
        >
          Details
        </button>
        <button
          className={activeSection === "comments" ? styles.active : ""}
          onClick={() => handleSectionChange("comments")}
        >
          Reviews {webcast.comments ? webcast.comments.length : 0}
        </button>
      </div>
      {activeSection === "tracks" && (
        <div className={styles.trackList}>
          {show.tracks.map((track, index) => (
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
        <div className={styles.entityDetails}>
          <p>{show.details}</p>
          <h3>Setlist</h3>
          <p>{show.setlist}</p>
        </div>
      )}
      {activeSection === "comments" && (
        <CommentSection
          entityType="show"
          entityId={id}
          updateComments={updateComments}
        />
      )}
      <div className={styles.trackPlayer}>
        {activeTrack && (
          <ReactPlayer
            url={activeTrack.url}
            controls
            playing={playing}
            width="100%"
            height="50px"
            onStart={handlePlay}
          />
        )}
      </div>
    </div>
  );
}
