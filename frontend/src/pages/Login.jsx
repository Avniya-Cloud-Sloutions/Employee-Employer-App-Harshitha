import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Forgot password states
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotRole, setForgotRole] = useState("employee");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8081/Login", {
        email,
        password,
        role,
      });

      if (res.data.status === "success") {
        const userData = { email, role };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        navigate(role === "employee" ? "/dashboard-employee" : "/dashboard-employer");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during login.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/forgot-password", {
        email: forgotEmail,
        role: forgotRole,
        newPassword,
      });

      alert(res.data.message || "Password updated successfully.");
      setShowForgotModal(false);
      setForgotEmail("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      console.error(err);
      alert("Failed to update password.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 relative">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <label className="block mb-3">
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="employee">Employee</option>
            <option value="employer">Employer</option>
          </select>
        </label>

        <label className="block mb-3">
          Email:
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter your email"
          />
        </label>

        <label className="block mb-4">
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter your password"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white p-2 rounded hover:opacity-90"
        >
          Login
        </button>

        <p
          onClick={() => setShowForgotModal(true)}
          className="mt-3 text-center text-sm text-blue-600 cursor-pointer hover:underline"
        >
          Forgot Password?
        </p>
      </form>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 relative">
            <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
            <form onSubmit={handleForgotPassword}>
              <label className="block mb-3">
                Role:
                <select
                  value={forgotRole}
                  onChange={(e) => setForgotRole(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                  <option value="employee">Employee</option>
                  <option value="employer">Employer</option>
                </select>
              </label>

              <label className="block mb-3">
                Email:
                <input
                  type="email"
                  value={forgotEmail}
                  required
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Enter your registered email"
                />
              </label>

              <label className="block mb-3">
                New Password:
                <input
                  type="password"
                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Enter new password"
                />
              </label>

              <label className="block mb-4">
                Confirm New Password:
                <input
                  type="password"
                  value={confirmNewPassword}
                  required
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Confirm new password"
                />
              </label>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
