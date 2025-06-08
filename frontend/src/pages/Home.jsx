import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowUp,
  FaUserTie,
  FaUsers,
  FaCheckCircle,
  //FaBriefcase
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-purple-50 to-indigo-100 relative overflow-x-hidden">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 text-center text-4xl font-extrabold shadow-md tracking-wide">
        Welcome to the Employee-Employer Portal
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-indigo-700"
        >
          Connecting Talent with Opportunity
        </motion.h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Find the right job or hire the right candidate – all in one place.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition duration-300"
        >
          Get Started
        </button>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-gradient-to-r from-indigo-50 to-purple-100 text-center">
        <h2 className="text-3xl font-bold text-indigo-800 mb-8">Why Choose Our Portal?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaUserTie className="text-4xl text-indigo-600 mb-4 mx-auto" />
            <h3 className="font-semibold text-xl mb-2">For Employers</h3>
            <p>Access a wide talent pool and manage profiles with ease.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaUsers className="text-4xl text-purple-600 mb-4 mx-auto" />
            <h3 className="font-semibold text-xl mb-2">For Employees</h3>
            <p>Showcase your skills and connect with top recruiters.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaCheckCircle className="text-4xl text-green-600 mb-4 mx-auto" />
            <h3 className="font-semibold text-xl mb-2">Verified & Secure</h3>
            <p>Secure and verified profiles for reliable connections.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-indigo-800 mb-10">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-10 px-6">
          <div className="max-w-xs bg-indigo-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">1. Sign Up</h3>
            <p>Register as an employee or employer to get started.</p>
          </div>
          <div className="max-w-xs bg-indigo-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">2. Create Profile</h3>
            <p>Employees add qualifications; employers list requirements.</p>
          </div>
          <div className="max-w-xs bg-indigo-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">3. Connect</h3>
            <p>Employers view & shortlist; employees apply directly.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 py-12 text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to explore?</h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          Join Us Now
        </button>
      </section>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
        aria-label="Scroll to Top"
      >
        <FaArrowUp />
      </button>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-bold text-lg mb-2">Employee-Employer Portal</h3>
            <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Location</h3>
            <p className="flex justify-center md:justify-start items-center gap-2 text-sm">
              <FaMapMarkerAlt /> 123 Tech Street, Hyderabad, India
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Support</h3>
            <p className="flex justify-center md:justify-start items-center gap-2 text-sm">
              <FaPhoneAlt /> <a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a>
            </p>
            <p className="flex justify-center md:justify-start items-center gap-2 text-sm">
              <FaEnvelope /> <a href="mailto:support@employerportal.com" className="hover:underline">support@employerportal.com</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
