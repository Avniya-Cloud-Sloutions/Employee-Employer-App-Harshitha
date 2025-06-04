import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Header */}
      <header className="bg-purple-700 text-white p-5 text-center text-3xl font-bold">
        Welcome to the Employee-Employer Portal
      </header>

      {/* About Section */}
      <section className="flex-1 p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">About Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          This portal allows employees and employers to register, log in, and connect with each other. We aim to streamline hiring and job searching efficiently through this platform.
        </p>
      </section>

      {/* Join Us Button */}
      <section className="text-center mb-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-md text-lg hover:opacity-90"
        >
          Join Us
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-center text-gray-600 p-4">
        &copy; {new Date().getFullYear()} Employee-Employer Portal. All rights reserved.
      </footer>
    </div>
  );
}
