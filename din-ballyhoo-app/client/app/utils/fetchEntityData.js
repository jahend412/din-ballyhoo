import Cookies from "js-cookie";
import { fetchTrackUrl } from "@/app/utils/firebaseUtils";

export async function fetchEntityData(entityType, id, setEntity, setError) {
  const token = Cookies.get("token");

  try {
    const response = await fetch(`/api/v1/${entityType}s/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (response.ok && data.status === "success") {
      // Fetch the track details using track IDs
      const updatedTracks = await Promise.all(
        data.data.tracks.map(async (trackId) => {
          const trackResponse = await fetch(`/api/v1/tracks/${trackId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          const trackData = await trackResponse.json();
          const trackUrl = await fetchTrackUrl(trackData.data.url);

          return { ...trackData.data, url: trackUrl };
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
