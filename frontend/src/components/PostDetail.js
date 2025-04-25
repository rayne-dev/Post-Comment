import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css";

export default function PostDetail({ user }) {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data: p } = await axios.get(
          `http://localhost:3001/posts/${id}`
        );
        setPost(p);
        const { data: a } = await axios.get(
          `http://localhost:3001/users/${p.userId}`
        );
        setAuthor(a);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  const loadComments = async () => {
    try {
      const { data: raw } = await axios.get(
        `http://localhost:3001/comments?postId=${id}`
      );
      const filtered = raw.filter((c) => String(c.postId) === id);
      const enriched = await Promise.all(
        filtered.map(async (c) => {
          const { data: u } = await axios.get(
            `http://localhost:3001/users/${c.userId}`
          );
          return { ...c, user: u };
        })
      );
      setComments(enriched);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage("Please log in to comment.");
      return;
    }
    try {
      await axios.post("http://localhost:3001/comments", {
        postId: id,
        userId: user.id,
        content: commentText,
        date: new Date().toISOString(),
      });
      setCommentText("");
      setMessage("Comment added.");
      await loadComments();
    } catch (e) {
      console.error(e);
      setMessage("Failed to add comment.");
    }
  };

  const handleDeleteComment = async (cid, uid) => {
    if (user?.id !== uid) return;
    try {
      await axios.delete(`http://localhost:3001/comments/${cid}`);
      await loadComments();
    } catch (e) {
      console.error(e);
    }
  };

  if (!post) return <p>Loading…</p>;

  return (
    <div className="container post-detail">
      <h1>{post.title}</h1>
      <img src={post.image} alt={post.title} className="detail-image" />
      <p>{post.content}</p>
      {author && <p>By: {author.name}</p>}

      <div className="comments-section">
        <h2>Comments</h2>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((c) => (
          <div key={c.id} className="comment">
            <img
              src={c.user.profilePic || "/default-avatar.png"}
              alt={c.user.name}
              className="comment-avatar"
            />
            <div className="comment-content">
              <strong>{c.user.name}</strong>
              <p>{c.content}</p>
            </div>
            {user?.id === c.userId && (
              <button
                className="comment-delete"
                onClick={() => handleDeleteComment(c.id, c.userId)}
              >
                Delete
              </button>
            )}
          </div>
        ))}

        {user ? (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              placeholder="Write a comment…"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <button type="submit">Add Comment</button>
          </form>
        ) : (
          <p>Please log in to comment.</p>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
