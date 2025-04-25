import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./AuthorProfile.css";

function AuthorProfile() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((res) => setAuthor(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`http://localhost:3001/posts?userId=${id}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!author)
    return (
      <div className="container">
        <p>Loading author...</p>
      </div>
    );

  return (
    <div className="container author-profile">
      <div className="profile-header">
        {author.profilePic ? (
          <img
            src={author.profilePic}
            alt={author.name}
            className="profile-picture"
          />
        ) : (
          <div className="profile-picture placeholder">No Profile Picture</div>
        )}
        <h1>{author.name}</h1>
      </div>
      <p>{author.description || "No description provided."}</p>
      <h2>Posts by {author.name}</h2>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <Link to={`/post/${post.id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorProfile;
