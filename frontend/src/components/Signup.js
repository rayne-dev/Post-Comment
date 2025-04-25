import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      const exists = await axios.get(
        `http://localhost:3001/users?email=${email}`
      );
      if (exists.data.length > 0) {
        setMessage("User already exists!");
        return;
      }
      const newUser = {
        name,
        email,
        password,
        description: "",
        gender,
      };
      const createRes = await axios.post(
        "http://localhost:3001/users",
        newUser
      );
      onSignup(createRes.data);
      setMessage("User registered successfully!");
      navigate("/profile");
    } catch {
      setMessage("Registration failed!");
    }
  };

  return (
    <div className="container signup">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
        </label>

        <button type="submit">Signup</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Signup;
