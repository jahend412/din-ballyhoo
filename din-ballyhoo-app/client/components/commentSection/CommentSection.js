import React, { useState, useEffect } from "react";
import CommentForm from "@/components/commentForm/CommentForm";
import styles from "./CommentSection.module.css";

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
  const handleCommentSubmit = async (entityType, entityId, newComment) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing. Redirecting to login.");
      return;
    }

    try {
      const response = await fetch(
        `/api/v1/comments/${entityType}/${entityId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment: newComment.comment }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("New Comment:", data);

        if (data && data.data && data.data.comment) {
          setComments((prevComments) => [
            ...prevComments,
            data.data.comment, // Add the new comment to the list
          ]);
        }
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error.message);
    }
  };

  // Add a reply
  const handleReplySubmit = async (parentId, replyText) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing. Redirecting to login.");
      return;
    }

    try {
      const response = await fetch(
        `/api/v1/comments/${entityType}/${entityId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment: replyText, parentComment: parentId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newReply = data.data.comment;

        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === parentId
              ? { ...comment, replies: [...comment.replies, newReply] }
              : comment
          )
        );
      } else {
        console.error("Failed to post reply");
      }
    } catch (error) {
      console.error("Error posting reply:", error.message);
    }
  };

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
          {comments.map((comment) => (
            <li key={comment._id} className={styles.commentItem}>
              <div className={styles.comment}>
                <p>{comment.comment}</p>
                <small>By {comment.user.name}</small>
              </div>
              <button
                onClick={() =>
                  handleReplySubmit(comment._id, "Your reply text")
                }
                className={styles.replyButton}
              >
                Reply
              </button>
              {comment.replies && comment.replies.length > 0 && (
                <ul className={styles.repliesList}>
                  {comment.replies.map((reply) => (
                    <li key={reply._id} className={styles.replyItem}>
                      <div className="styles.reply">
                        <p>{reply.comment}</p>
                        <small>By {reply.user.name}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
