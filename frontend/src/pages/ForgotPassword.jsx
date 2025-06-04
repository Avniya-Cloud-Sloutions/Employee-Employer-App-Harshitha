import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/forgot-password", {
        email,
        newPassword
      });

      if (response.data.status === "success") {
        setMessage("✅ Password reset successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(response.data.message || "⚠️ Something went wrong");
      }
    } catch (error) {
      console.error("Reset error:", error);
      setMessage("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>

        {message && (
          <p className="text-sm mt-3 text-center text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
