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
      const updatedTracks = await Promise.all(
        data.data.tracks.map(async (track) => {
          const url = await fetchTrackUrl(track.url);
          return { ...track, url };
        })
      );
      setEntity({ ...data.data, tracks: updatedTracks });
    } else {
      setError(`Failed to fetch ${entityType}`);
    }
  } catch (err) {
    console.error(`Error fetching ${entityType}:`, err);
    setError(`Error fetching ${entityType}`);
  }
}
