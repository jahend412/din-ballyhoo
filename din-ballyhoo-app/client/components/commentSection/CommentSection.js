import React, { useState, useEffect } from "react";
import CommentForm from "@/components/commentForm/CommentForm";
import styles from "./CommentSection.module.css";

export default function CommentSection({ entityId, entityType }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false); // State for showing all comments

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
              </div>
              <button
                onClick={() =>
                  handleReplySubmit(comment._id, "Your reply text")
                }
                className={styles.replyButton}
              >
                {comment.replies && comment.replies.length > 0
                  ? `Replies ${comment.replies.length}`
                  : "Reply"}
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
