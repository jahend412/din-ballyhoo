import Cookies from "js-cookie";
import { fetchTrackUrl } from "@/app/utils/firebaseUtils";

export async function fetchEntityData(entityType, id, setEntity, setError) {
  const token = Cookies.get("token");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/${entityType}s/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();

    if (response.ok && data.status === "success") {
      // Log tracks to see what they look like

      // Filter out null track IDs before proceeding
      const validTracks = data.data.tracks.filter((trackId) => trackId != null);

      if (validTracks.length === 0) {
        setError("No valid tracks found.");
        return;
      }

      // Fetch the track details using track IDs
      const updatedTracks = await Promise.all(
        validTracks.map(async (trackId) => {
          try {
            const trackResponse = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${trackId}`,
              {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            const trackData = await trackResponse.json();

            // Handle error if track fetch failed
            if (trackData.status !== "success") {
              throw new Error(`Failed to fetch track ${trackId}`);
            }

            const trackUrl = trackData.data.url
              ? await fetchTrackUrl(trackData.data.url)
              : null;
            return { ...trackData.data, url: trackUrl };
          } catch (error) {
            console.error(`Error fetching track ${trackId}:`, error);
            return null; // Or a default value like an empty track object
          }
        })
      );

      setEntity({ ...data.data, tracks: updatedTracks });
    } else {
      setError(`Failed to fetch ${entityType}`);
    }
  } catch (error) {
    console.error(`Error fetching ${entityType}:`, error);
    setError(`Error fetching ${entityType}`);
  }
}
