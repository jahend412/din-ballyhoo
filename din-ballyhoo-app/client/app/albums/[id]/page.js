"use client";

import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function AlbumPage({ data }) {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [albumToken, setAlbumToken] = useState(null);
  const [error, setError] = useState("");
  const backendBaseUrl = "http://localhost:8080";

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

    fetchAlbum();
  }, [id]);

  useEffect(() => {
    if (album) {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      setAlbumToken(token);
    }
  }, [album]);

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
      <p>{album.label}</p>
      {/* <Image
        className="album-cover"
        src={`${backendBaseUrl}${data.coverImage}`}
        alt={data[titleField] || "Album cover"}
        width={300}
        height={300}
        unoptimized // Disable image optimization for external URLs like Firebase
        priority
      /> */}
      {album.tracks.map((track) => (
        <div key={track._id}>
          <h3>{track.title}</h3>
          <ReactPlayer url={track.audio} controls />
        </div>
      ))}
      <h2>Description</h2>
      <p>{album.description}</p>
    </div>
  );
}
