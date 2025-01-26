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
      updateComments={(newComment) =>
        setShow((prevShow) => ({
          ...prevShow,
          comments: [...prevShow.comments, newComment],
        }))
      }
    />
  );
}
