import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout?.(); // optional external logout function
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Employee Employer App</h1>
      <nav className="flex space-x-4 items-center">
        {user ? (
          <>
            {user.role === "employee" && (
              <>
                <Link to="/dashboard-employee" className="hover:underline">Dashboard</Link>
                <Link to="/add-profile" className="hover:underline">Add Profile</Link>
                <Link to="/view-profiles" className="hover:underline">View Profiles</Link>
              </>
            )}
            {user.role === "employer" && (
              <>
                <Link to="/dashboard-employer" className="hover:underline">Dashboard</Link>
                <Link to="/add-profile" className="hover:underline">Add Profile</Link>
                <Link to="/view-profiles" className="hover:underline">View Profiles</Link>
              </>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
