"use client";

import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import CommentForm from "@/components/commentForm/CommentForm";

export default function AlbumPage({ data }) {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [albumToken, setAlbumToken] = useState(null);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");

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

  // Fetch the comments for the album
  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token is missing. Redirecting to login.");
        return; // Exit if no token is found
      }

      try {
        const response = await fetch(`/api/v1/comments/album/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Comment Response:", data);

          if (data && data.data && Array.isArray(data.data.comments)) {
            setComments(data.data.comments); // Set the array of comments
          } else {
            console.error("No comments found or incorrect data format");
            setComments([]); // Set empty array if no comments
          }
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    fetchComments();
  }, [id]);

  // Add a comment to the album
  const handleCommentSubmit = async (entityType, entityId, commentText) => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/comments/${entityType}/${entityId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment: commentText }),
          credentials: "include",
        }
      );

      console.log("Response Status:", response.status);
      const data = await response.json();
      console.log("Comment Response Data:", data);

      if (response.ok) {
        // Now, we handle the response assuming it contains a single comment
        if (data && data.data && data.data.comment) {
          const newComment = data.data.comment;

          // Assuming you have a state to store comments, adjust based on actual structure
          setComment((prevComments) => [...prevComments, newComment]); // Append the new comment
          setError(""); // Clear any previous errors
        } else {
          setError("No comment returned in the response");
        }
      } else {
        setError("Failed to add comment");
      }
    } catch (error) {
      setError(error.message);
    }
  };

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

      <h3>Comments</h3>
      {/* Check if there are any comments */}
      {comments.length > 0 ? (
        <div>
          {comments.map((comment) => (
            <div key={comment._id}>
              <p>
                <strong>{comment.user.name}</strong> commented:
              </p>
              <p>{comment.comment}</p>
              <p>
                <small>{new Date(comment.createdAt).toLocaleString()}</small>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments yet.</p>
      )}

      <CommentForm
        onCommentAdded={handleCommentSubmit} // Pass the submit handler here
        entityType="album" // Pass the type of entity as a string
        entityId={album._id} // Pass the album ID here
      />
    </div>
  );
}
