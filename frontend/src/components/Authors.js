import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Authors.css";

function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => setAuthors(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container authors-page">
      <h1>Authors</h1>
      <div className="authors-grid">
        {authors.map((author) => (
          <div key={author.id} className="author-card">
            <img
              src={author.profilePic || "/default-avatar.png"}
              alt={author.name}
              className="author-avatar"
            />
            <div className="author-info">
              <h3>{author.name}</h3>
              <p>{author.description || "No bio available."}</p>
              <p className="gender">Gender: {author.gender || "Unspecified"}</p>
              <Link to={`/profile/${author.id}`}>View Profile</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Authors;
