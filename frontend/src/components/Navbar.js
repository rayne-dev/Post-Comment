import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const linkClass = ({ isActive }) =>
    isActive ? "navbar-link active" : "navbar-link";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="navbar-logo">
          Post-Comment
        </NavLink>
      </div>

      <button className="navbar-toggler" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className={linkClass}
        >
          Home
        </NavLink>
        <NavLink
          to="/posts"
          onClick={() => setMenuOpen(false)}
          className={linkClass}
        >
          Posts
        </NavLink>
        <NavLink
          to="/authors"
          onClick={() => setMenuOpen(false)}
          className={linkClass}
        >
          Authors
        </NavLink>
        {user ? (
          <>
            <NavLink
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Profile
            </NavLink>
            <NavLink
              to="/new-post"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              New Post
            </NavLink>
            <button
              className="logout-btn"
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
