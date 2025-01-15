export const fetchAlbums = async (token) => {
  try {
    const response = await fetch("/api/v1/albums", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.status === "success") {
      // Ensure coverImage has a leading slash
      return data.data.map((album) => {
        if (album.coverImage && !album.coverImage.startsWith("/")) {
          album.coverImage = `/${album.coverImage}`;
        }
        return album;
      });
    } else {
      console.error("Failed to fetch albums: Unexpected data structure");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    return [];
  }
};

export const fetchShows = async (token) => {
  try {
    const response = await fetch("/api/v1/shows", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.status === "success") {
      return data.data;
    } else {
      console.error("Failed to fetch shows: Unexpected data structure");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch shows:", error);
    return [];
  }
};

export const fetchWebcasts = async (token) => {
  try {
    const response = await fetch("/api/v1/webcasts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.status === "success") {
      return data.data;
    } else {
      console.error("Failed to fetch webcasts: Unexpected data structure");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch webcasts:", error);
    return [];
  }
};
