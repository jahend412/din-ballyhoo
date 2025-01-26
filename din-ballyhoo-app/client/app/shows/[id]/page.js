"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EntityPage from "@/components/entityPage/EntityPage";
import { fetchEntityData } from "@/app/utils/fetchEntityData";
import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ShowPage() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("tracks");
  const [activeTrack, setActiveTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchEntityData("show", id, setShow, setError);
  }, [id]);

  const handleTrackClick = (track) => {
    setActiveTrack(track);
    setPlaying(true);
  };

  const handlePlay = async () => {
    if (activeTrack) {
      try {
        await fetch(
          `${API_URL}/api/v1/tracks/${activeTrack._id}/increment-playcount`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
      } catch (error) {
        console.error("Error updating play count:", error);
      }
    }
  };

  // Fetch comments when the component mounts or when album ID changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/comments/shows/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const filteredComments = data.data.comments.filter(
            (comment) => comment.show === id
          );
          setComments(filteredComments || []);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!show) return <div>Loading...</div>;

  return (
    <EntityPage
      entity={show}
      entityType="show"
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      handleTrackClick={handleTrackClick}
      activeTrack={activeTrack}
      playing={playing}
      handlePlay={handlePlay}
      comments={comments}
      updateComments={(newComment) =>
        setComments((prevComments) => [...prevComments, newComment])
      }
    />
  );
}
