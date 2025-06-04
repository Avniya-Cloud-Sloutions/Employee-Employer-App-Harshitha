import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[\w.-]+@(gmail\.com|yahoo\.com|outlook\.com|protonmail\.com|[\w-]+\.(com|in))$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Invalid email. Must end in gmail.com, yahoo.com, etc.");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must have at least 6 characters and 1 special character.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/Signup", {
        email, password, role
      });

      alert(res.data.message);

      if (res.data.status === "success") {
        navigate("/login"); // Redirect to Login after successful signup
      }
    } catch (err) {
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        console.error(err);
        alert("Signup failed. Is the backend running?");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>

        <label className="block mb-2">
          Email:
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2">
          Password:
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className="block mb-4">
          Role:
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="employer">Employer</option>
          </select>
        </label>

        <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white p-2 rounded hover:opacity-90">
          Sign Up
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
