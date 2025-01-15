import { useState } from "react";
import styles from "./CommentForm.module.css";

export default function CommentForm({ entityType, entityId, onCommentAdded }) {
  const token = localStorage.getItem("token");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the token is available
    if (!token) {
      setError("User is not authenticated");
      return;
    }

    // Check if entityType and entityId are defined
    if (!entityType || !entityId) {
      setError("Invalid entity type or ID");
      return;
    }

    // Check if the comment field is empty
    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/comments/${entityType}/${entityId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment: comment }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data); // Log the response to check structure

        if (data && data.data && data.data.comment) {
          onCommentAdded(entityType, entityId, data.data.comment); // Pass the single comment
          setComment(""); // Clear the input after submission
          setError(""); // Clear any previous errors
        } else {
          setError(
            `No comment returned in this response: ${
              data.message || response.statusText
            }`
          );
        }
      } else {
        const errorData = await response.json();
        setError(
          `Failed to add comment: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.largeInput}
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave A Review"
      />
      <button className={styles.submitBtn} type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post Review"}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}
