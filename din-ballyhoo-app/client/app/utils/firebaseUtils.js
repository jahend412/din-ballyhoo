import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";

// Function to fetch the track URL from Firebase Storage
export const fetchTrackUrl = async (path) => {
  try {
    // Remove "gs://din-ballyhoo.firebasestorage.app/" prefix if present
    const storagePath = path.startsWith("gs://")
      ? path.replace("gs://din-ballyhoo.firebasestorage.app/", "")
      : path;

    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, storagePath);
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.error("Error fetching track URL:", error);
    throw error;
  }
};
