"use client";

import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import CommentSection from "@/components/commentSection/CommentSection";

export default function AlbumPage({ data }) {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [albumToken, setAlbumToken] = useState(null);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAlbum = async () => {
      try {
        const response = await fetch(`/api/v1/albums/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (response.ok && data.status === "success") {
          setAlbum(data.data);
        } else {
          setError("Failed to fetch album");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch the album
    fetchAlbum();
  }, [id]);

  useEffect(() => {
    if (album) {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      setAlbumToken(token);
    }
  }, [album]);

  // Delete a comment from the album

  // Fetch the favorites for the album

  // Add the album to favorites

  // Remove the album from favorites
  if (error) {
    return <p>{error}</p>;
  }

  if (!album) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{album.title}</h1>
      <p>{album.artist}</p>
      <p>{album.releaseDate}</p>
      <p>{album.genre}</p>
      <p>{album.producer}</p>

      <CommentSection entityId={album._id} entityType="album" />
    </div>
  );
}
