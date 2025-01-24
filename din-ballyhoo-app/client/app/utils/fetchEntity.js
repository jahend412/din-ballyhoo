import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080";

// Fetch albums
export const fetchAlbums = async () => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      return [];
    }

    const response = await fetch(`${BASE_URL}/api/v1/albums`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.status === "success") {
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

// Fetch Shows
export const fetchShows = async () => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      return [];
    }

    const response = await fetch(`${BASE_URL}/api/v1/shows`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.status === "success") {
      return data.data.map((show) => {
        if (show.coverImage && !show.coverImage.startsWith("/")) {
          show.coverImage = `/${show.coverImage}`;
        }
        return show;
      });
    } else {
      console.error("Failed to fetch shows: Unexpected data structure");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch shows:", error);
    return [];
  }
};

// Fetch webcasts
// Fetch Shows
export const fetchWebcasts = async () => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      return [];
    }

    const response = await fetch(`${BASE_URL}/api/v1/webcasts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.status === "success") {
      return data.data.map((webcast) => {
        if (webcast.coverImage && !webcast.coverImage.startsWith("/")) {
          webcast.coverImage = `/${webcast.coverImage}`;
        }
        return webcast;
      });
    } else {
      console.error("Failed to fetch shows: Unexpected data structure");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch shows:", error);
    return [];
  }
};

// Fetch News
export const fetchNews = async () => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      return [];
    }

    const response = await fetch(`${BASE_URL}/api/v1/news`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.status === "success") {
      return data.data.map((news) => {
        if (news.coverImage && !news.coverImage.startsWith("/")) {
          news.coverImage = `/${news.coverImage}`;
        }
        return news;
      });
    } else {
      console.error("Failed to fetch shows: Unexpected data structure");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch shows:", error);
    return [];
  }
};
