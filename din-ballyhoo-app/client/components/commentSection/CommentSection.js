import React, { useState, useEffect } from "react";
import CommentForm from "@/components/commentForm/CommentForm";
import styles from "./CommentSection.module.css";
import Cookies from "js-cookie";

export default function CommentSection({ entityId, entityType }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false); // State for showing all comments

  // Fetch comments for the given entity
  useEffect(() => {
    const fetchComments = async () => {
      const token = Cookies.get("token");

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
    if (newComment && newComment.user && newComment.user.name) {
      setComments((prevComments) => [...prevComments, newComment]); // Add the new comment
      setError(""); // Clear errors
    } else {
      console.error(
        "Invalid comment structure or missing user data:",
        newComment
      );
    }
  };

  // Handle showing all comments
  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  // Sort comments by creation date (newest first)
  const sortedComments = comments.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Show only the first 5 comments or all based on the showAllComments state
  const commentsToShow = showAllComments
    ? sortedComments
    : sortedComments.slice(0, 5);

  return (
    <div className={styles.commentSection}>
      <h2>Comments</h2>
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
        <ul className={styles.commentsList}>
          {commentsToShow.map((comment) => (
            <li key={comment._id} className={styles.commentItem}>
              <div className={styles.comment}>
                <p>{comment.comment}</p>
                <small>By {comment.user.name}</small>
                <br />
                <small>{new Date(comment.createdAt).toLocaleString()}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!showAllComments && comments.length > 5 && (
        <button
          onClick={toggleShowAllComments}
          className={styles.showMoreButton}
        >
          See More
        </button>
      )}
    </div>
  );
}
