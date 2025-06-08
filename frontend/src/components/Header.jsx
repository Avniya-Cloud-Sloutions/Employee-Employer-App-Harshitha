import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout?.();
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMobileLogout = () => {
    setMenuOpen(false);
    handleLogout();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleLinks = user?.role ? (
    <>
      <Link
        to={`/dashboard-${user.role}`}
        onClick={() => setMenuOpen(false)}
        className="hover:underline"
      >
        Dashboard
      </Link>
      <Link
        to="/add-profile"
        onClick={() => setMenuOpen(false)}
        className="hover:underline"
      >
        Add Profile
      </Link>
      <Link
        to="/view-profiles"
        onClick={() => setMenuOpen(false)}
        className="hover:underline"
      >
        View Profiles
      </Link>
    </>
  ) : null;

  return (
    <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>

        {/* Title */}
        <Link
          to="/"
          className="text-xl font-extrabold text-white tracking-wide text-center md:text-left"
        >
          Employee-Employer Portal
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex space-x-6 items-center font-medium"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link to="/" className="hover:underline">
            Home
          </Link>

          {user ? (
            <>
              {roleLinks}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Mobile navigation"
          className="md:hidden px-4 pb-4 pt-2 flex flex-col space-y-3 text-sm bg-gradient-to-b from-purple-600 to-indigo-600 z-40"
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {user ? (
            <>
              {roleLinks}
              <button
                onClick={handleMobileLogout}
                className="text-left bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
