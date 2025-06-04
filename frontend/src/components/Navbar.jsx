import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="text-lg font-semibold">Employee-Employer App</div>
      <button onClick={handleLogout} className="bg-white text-blue-600 px-4 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
