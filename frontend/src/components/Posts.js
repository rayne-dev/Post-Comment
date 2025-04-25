import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Posts.css";

function Posts({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts?_sort=date&_order=desc")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${postId}`);
      setPosts(posts.filter((p) => p.id !== postId));
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  // chunk into rows of 4
  const rows = [];
  for (let i = 0; i < posts.length; i += 4) {
    rows.push(posts.slice(i, i + 4));
  }

  return (
    <div className="container posts-page">
      <h1>All Posts</h1>
      {rows.map((row, rowIdx) => (
        <React.Fragment key={rowIdx}>
          <div className="post-row">
            {row.map((post) => (
              <div key={post.id} className="post-card">
                <img src={post.image} alt={post.title} />
                <div className="post-content">
                  <h2>{post.title}</h2>
                  <p>{post.content.substring(0, 100)}...</p>
                  <Link className="read-more" to={`/post/${post.id}`}>
                    Read More
                  </Link>

                  {user && user.id === post.userId && (
                    <div className="owner-actions">
                      <Link to={`/edit-post/${post.id}`}>Edit</Link>
                      <button onClick={() => handleDelete(post.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {rowIdx < rows.length - 1 && <hr className="row-divider" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Posts;
