"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EntityPage from "@/components/entityPage/EntityPage";
import { fetchEntityData } from "@/app/utils/fetchEntityData";
import Cookies from "js-cookie";

export default function WebcastPage() {
  const { id } = useParams();
  const [webcast, setWebcast] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("tracks");
  const [activeTrack, setActiveTrack] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    fetchEntityData("webcast", id, setWebcast, setError);
  }, [id]);

  const handleTrackClick = (track) => {
    setActiveTrack(track);
    setPlaying(true);
  };

  const handlePlay = async () => {
    if (activeTrack) {
      try {
        await fetch(`/api/v1/tracks/${activeTrack._id}/increment-playcount`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
      } catch (error) {
        console.error("Error updating play count:", error);
      }
    }
  };

  if (error) return <div>{error}</div>;
  if (!webcast) return <div>Loading...</div>;

  return (
    <EntityPage
      entity={webcast}
      entityType="webcast"
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      handleTrackClick={handleTrackClick}
      activeTrack={activeTrack}
      playing={playing}
      handlePlay={handlePlay}
      updateComments={(newComment) =>
        setWebcast((prevWebcast) => ({
          ...prevWebcast,
          comments: [...prevWebcast.comments, newComment],
        }))
      }
    />
  );
}
