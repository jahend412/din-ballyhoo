import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";

// Function to convert gs:// URL to https:// URL
export const fetchTrackUrl = async (path) => {
  try {
    const storageRef = ref(storage, path); // Use the initialized storage reference
    const url = await getDownloadURL(storageRef); // Get the URL of the file
    return url;
  } catch (error) {
    console.error("Error fetching track URL:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};
