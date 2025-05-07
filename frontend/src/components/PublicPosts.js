import React, { useEffect, useState } from "react";

const PublicPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/68034a648561e97a5002e48b/latest")
      .then((res) => res.json())
      .then((json) => {
        setPosts(json.record.posts);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
      });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Public Posts</h1>
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.image && (
              <img src={post.image} alt={post.title} width="300" />
            )}
            <p>
              <em>{post.date}</em>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default PublicPosts;
