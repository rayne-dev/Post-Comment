import PublicPosts from "./components/PublicPosts"; 
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Import from components folder
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Posts from "./components/Posts";
import PostDetail from "./components/PostDetail";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Authors from "./components/Authors";
import AuthorProfile from "./components/AuthorProfile";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleSignup = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/public-posts" element={<PublicPosts />} />
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts user={user} />} />
        <Route path="/post/:id" element={<PostDetail user={user} />} />
        <Route path="/new-post" element={<NewPost user={user} />} />
        <Route path="/edit-post/:id" element={<EditPost user={user} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route
          path="/profile"
          element={
            <Profile user={user} onProfileUpdate={handleProfileUpdate} />
          }
        />
        <Route path="/authors" element={<Authors />} />
        <Route path="/profile/:id" element={<AuthorProfile />} />
      </Routes>
      <footer>
        <p>developed by @phyozinko</p>
      </footer>
    </>
  );
}

export default App;
