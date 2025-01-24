import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

export default function TrackSection({ id, dataType }) {
  const [tracks, setTracks] = useState([]);
  const [activeTrack, setActiveTrack] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch tracks based on data type (album, show, or webcast)
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchTracks = async () => {
      setLoading(true);
      setError(null); // Reset error state before each fetch

      try {
        let endpoint;

        // Determine the correct API endpoint based on the data type
        switch (dataType) {
          case "album":
            endpoint = `/api/v1/albums/${id}`;
            break;
          case "show":
            endpoint = `/api/v1/shows/${id}`;
            break;
          case "webcast":
            endpoint = `/api/v1/webcasts/${id}`;
            break;
          default:
            throw new Error("Invalid data type");
        }

        // Make the API request
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Parse the response
        const data = await response.json();

        // Check if the request was successful
        if (data.status === "success") {
          const item = data.data;
          // Check if the item has tracks
          if (item && item.tracks && item.tracks.length > 0) {
            setTracks(item.tracks); // Set the tracks for the selected item (album, show, or webcast)
          } else {
            setError("Tracks not found for this item");
          }
        } else {
          throw new Error("Failed to fetch tracks");
        }
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [id, dataType]);

  // If loading, show a loading message
  if (loading) {
    return <p>Loading tracks...</p>;
  }

  // If there is an error, show an error message
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h3>Tracks</h3>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            <button onClick={() => setActiveTrack(track)}>{track.title}</button>
          </li>
        ))}
      </ul>
      {activeTrack && (
        <ReactPlayer
          url={activeTrack.audioUrl}
          controls
          width="100%"
          height="50px"
        />
      )}
    </div>
  );
}
