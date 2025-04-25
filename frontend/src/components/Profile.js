import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile({ user, onProfileUpdate }) {
  const safeUser = user || {};

  const [profilePic, setProfilePic] = useState(safeUser.profilePic || "");
  const [description, setDescription] = useState(safeUser.description || "");
  const [gender, setGender] = useState(safeUser.gender || "Male");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!safeUser.id) return;
    axios
      .get(
        `http://localhost:3001/posts?userId=${safeUser.id}&_sort=date&_order=desc`
      )
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, [safeUser.id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!safeUser.id) return;

    try {
      const updated = { profilePic, description, gender };
      const res = await axios.patch(
        `http://localhost:3001/users/${safeUser.id}`,
        updated
      );
      setMessage("Profile updated successfully!");
      onProfileUpdate?.(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch {
      setMessage("Profile update failed.");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${postId}`);
      setPosts(posts.filter((p) => p.id !== postId));
    } catch {
      console.error("Delete failed");
    }
  };

  return (
    <div className="container profile">
      <h1>Edit Profile</h1>
      {!user ? (
        <>
          <h2>Please log in to edit your profile.</h2>
          <Link
            to="/login"
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Click here to login
          </Link>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-image-container">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-placeholder">No Profile Picture</div>
              )}
            </div>

            <label>
              Upload from file:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            <label>
              Or paste image URL:
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
              />
            </label>

            <textarea
              placeholder="Update your profile description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label>
              Gender:
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </label>

            <button type="submit">Save Changes</button>
          </form>
          {message && <p className="message">{message}</p>}

          <hr />

          <h2>Your Posts</h2>
          <div className="your-posts">
            {posts.length === 0 && <p>You haven’t written any posts yet.</p>}
            {posts.map((post) => (
              <div key={post.id} className="post-item">
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 100)}...</p>
                <div className="actions">
                  <Link to={`/post/${post.id}`}>View</Link>
                  <Link to={`/edit-post/${post.id}`}>Edit</Link>
                </div>
                <button onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
