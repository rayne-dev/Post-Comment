import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditPost.css";

function EditPost({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/posts/${id}`)
      .then((res) =>
        setFormValue({
          title: res.data.title,
          content: res.data.content,
          image: res.data.image,
        })
      )
      .catch((err) => console.error(err));
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValue({ ...formValue, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/posts/${id}`, formValue);
      setMessage("Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update post.");
    }
  };

  return (
    <div className="container edit-post">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formValue.title}
          onChange={(e) =>
            setFormValue({ ...formValue, title: e.target.value })
          }
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formValue.content}
          onChange={(e) =>
            setFormValue({ ...formValue, content: e.target.value })
          }
          required
        ></textarea>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit">Update Post</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default EditPost;
