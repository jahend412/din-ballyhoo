import React, { useState, useEffect } from "react";
import CommentForm from "@/components/commentForm/CommentForm";
// import "./CommentSection.css";

export default function CommentSection({ entityId, entityType }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch comments for the given entity
  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token is missing. Redirecting to login.");
        return; // Exit if no token is found
      }

      try {
        setLoading(true);
        const response = await fetch(
          `/api/v1/comments/${entityType}/${entityId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [entityId, entityType]);

  // Add a comment
  // Handle the comment added from CommentForm
  const handleCommentSubmit = (entityType, entityId, newComment) => {
    // Simply update the comments array with the new comment
    if (newComment && newComment.user) {
      setComments((prevComments) => [...prevComments, newComment]);
    }
    setError(""); // Clear any previous errors
  };
  return (
    <div className="comment-section">
      <CommentForm
        entityType={entityType}
        entityId={entityId}
        onCommentAdded={handleCommentSubmit}
      />
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <div className="comment">
                <p>{comment.comment}</p>
                <small>By {comment.user.name}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
