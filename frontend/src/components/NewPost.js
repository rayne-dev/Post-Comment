import React, { useState } from "react";
import axios from "axios";
import "./NewPost.css";

function NewPost({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [message, setMessage] = useState("");

  if (!user) {
    return (
      <div className="container">
        <p>Please log in to create a new post.</p>
      </div>
    );
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImageFile(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const img =
      imageURL.trim() || imageFile || "https://via.placeholder.com/600x400";

    const newPost = {
      title,
      content,
      image: img,
      date: new Date().toISOString(),
      userId: user.id,
    };

    try {
      await axios.post("http://localhost:3001/posts", newPost);
      setMessage("Post created successfully!");
      setTitle("");
      setContent("");
      setImageFile("");
      setImageURL("");
    } catch {
      setMessage("Failed to create post.");
    }
  };

  return (
    <div className="container new-post">
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit} className="new-post-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label>
          Image URL:
          <input
            type="url"
            placeholder="https://example.com/your-image.jpg"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </label>

        <p className="or-text">— OR —</p>

        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>

        {(imageURL.trim() || imageFile) && (
          <div className="image-preview">
            <img src={imageURL.trim() || imageFile} alt="Preview" />
          </div>
        )}

        <button type="submit">Post</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default NewPost;
