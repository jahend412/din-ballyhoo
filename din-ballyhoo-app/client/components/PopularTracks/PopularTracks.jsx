import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./PopularTracks.css";

const PopularTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://localhost:8080";
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchPopularTracks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/tracks/popular`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok && data.status === "success") {
          setTracks(data.data.tracks);
        } else {
          setError("Failed to fetch popular tracks");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTracks();
  }, []);

  return (
    <div className="popular-tracks">
      <h2>Most Popular Tracks</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ol>
          {tracks.map((track, index) => (
            <li key={track._id}>
              {" "}
              <strong>{track.title}</strong> - {track.artist} ({track.playCount}{" "}
              plays)
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default PopularTracks;
