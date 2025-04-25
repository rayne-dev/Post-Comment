import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts?_sort=date&_order=desc")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const defaultFeatured = {
    id: "featured",
    image:
      "https://www.21kschool.com/eg/wp-content/uploads/sites/16/2023/09/Discover-the-Bright-Side-The-Surprising-Benefits-of-Online-Learning.png",
    title: "Post-Comment mini project",
    content: "share memory, stay happy and get wide communication.",
  };

  const featuredPost = posts.length > 0 ? posts[0] : defaultFeatured;
  const otherPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="container home">
      <h1>Featured Post</h1>
      <div className="featured-post">
        <img
          className="featured-image"
          src={featuredPost.image}
          alt={featuredPost.title}
        />{" "}
        <h2>{featuredPost.title}</h2>
        <p>{featuredPost.content}</p>
        <Link
          to={
            featuredPost.id === "featured"
              ? "/posts"
              : `/post/${featuredPost.id}`
          }
        >
          Read More
        </Link>
      </div>

      <h1>All Posts</h1>
      <div className="post-list">
        {otherPosts.map((post) => (
          <div key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <Link to={`/post/${post.id}`}>View Post</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
