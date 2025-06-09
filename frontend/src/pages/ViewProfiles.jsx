import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalProfile, setModalProfile] = useState(null);
  const [viewModalProfile, setViewModalProfile] = useState(null);

  // Search filters
  const [searchName, setSearchName] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const profilesPerPage = 6;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:8081/view-profiles")
      .then((res) => setProfiles(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load profiles.");
      });
  }, []);

  // Filter logic
  const filteredProfiles = profiles.filter((profile) =>
    (profile.full_name || "").toLowerCase().includes(searchName.toLowerCase()) &&
    (profile.professional_title || "").toLowerCase().includes(searchTitle.toLowerCase()) &&
    (profile.email || "").toLowerCase().includes(searchEmail.toLowerCase()) &&
    (profile.city || "").toLowerCase().includes(searchCity.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);
  const indexOfLast = currentPage * profilesPerPage;
  const indexOfFirst = indexOfLast - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirst, indexOfLast);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        await axios.delete(`http://localhost:8081/delete-profile/${id}`);
        setProfiles((prev) => prev.filter((p) => p.id !== id));
        alert("Profile deleted.");
      } catch (err) {
        console.error(err);
        alert("Failed to delete.");
      }
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/update-profile/${id}`;
  };

  const handleShare = (id) => {
    const profileURL = `${window.location.origin}/shared-profile/${id}`;
    navigator.clipboard.writeText(profileURL);
    alert("Profile link copied!");
  };

  const openContactModal = (profile) => setModalProfile(profile);
  const closeContactModal = () => setModalProfile(null);

  const openViewModal = (profile) => setViewModalProfile(profile);
  const closeViewModal = () => setViewModalProfile(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl text-center font-bold text-indigo-700 mb-8">Employee Profiles</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Name"
          className="px-4 py-2 rounded border"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Title"
          className="px-4 py-2 rounded border"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Email"
          className="px-4 py-2 rounded border"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by City"
          className="px-4 py-2 rounded border"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
      </div>

      {/* Profiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white shadow-md rounded-xl p-5 border-t-4 border-indigo-600"
          >
            <h2 className="text-2xl font-semibold mb-1 capitalize">{profile.full_name}</h2>
            <p><strong>Title:</strong> {profile.professional_title}</p>
            <p><strong>Experience:</strong> {profile.experience} yrs</p>
            <p><strong>City:</strong> {profile.city}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>

            {profile.resume && (
              <a
                href={`http://localhost:8081/uploads/${profile.resume}`}
                download
                className="text-indigo-500 underline block mt-2"
              >
                Download Resume
              </a>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => openViewModal(profile)}
                className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-600"
              >
                View
              </button>
              <button
                onClick={() => handleShare(profile.id)}
                className="bg-teal-500 text-white text-sm px-3 py-1 rounded-full hover:bg-teal-600"
              >
                Share
              </button>
              <button
                onClick={() => openContactModal(profile)}
                className="bg-yellow-400 text-black text-sm px-3 py-1 rounded-full hover:bg-yellow-500"
              >
                Contact
              </button>
              {user?.role === "employer" && (
                <button
                  onClick={() => handleDelete(profile.id)}
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded-full hover:bg-red-600"
                >
                  Delete
                </button>
              )}
              {user?.email === profile.email && (
                <button
                  onClick={() => handleUpdate(profile.id)}
                  className="bg-purple-500 text-white text-sm px-3 py-1 rounded-full hover:bg-purple-600"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 bg-white border rounded hover:bg-gray-200"
        >
          Prev
        </button>
        <span className="font-medium text-indigo-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-1 bg-white border rounded hover:bg-gray-200"
        >
          Next
        </button>
      </div>

      {/* Contact Modal */}
      {modalProfile && (
       <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-700 text-center">
              Contact {modalProfile.full_name}
          </h3>

       <div className="space-y-3 text-left">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-800">{modalProfile.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Phone:</span>
          <span className="text-gray-800">{modalProfile.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Alternate Phone:</span>
          <span className="text-gray-800">{modalProfile.alternate_phone || "N/A"}</span>
        </div>
       </div>

      <a
        href={`https://wa.me/${modalProfile.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
      >
        <img
          src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
          alt="WhatsApp"
          className="w-5 h-5"
        />
        WhatsApp 
      </a>

      <button
        onClick={closeContactModal}
        className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Close
      </button>
    </div>
  </div>
)}


      {/* View Modal */}
      {viewModalProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto text-left">
            {viewModalProfile.profile_photo && (
              <div className="flex justify-center mb-4">
                <img
                  src={`http://localhost:8081/uploads/${viewModalProfile.profile_photo}`}
                  alt={`${viewModalProfile.full_name}'s Profile`}
                  className="w-32 h-32 object-cover rounded-full border-4 border-indigo-600"
                />
              </div>
            )}
            <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
              {viewModalProfile.full_name}'s Profile
            </h3>
            <p><strong>Full Name:</strong> {viewModalProfile.full_name}</p>
            <p><strong>Gender:</strong> {viewModalProfile.gender}</p>
            <p><strong>Title:</strong> {viewModalProfile.professional_title}</p>
            <p><strong>Experience:</strong> {viewModalProfile.experience} yrs</p>
            <p><strong>Qualification:</strong> {viewModalProfile.qualification}</p>
            <p><strong>City:</strong> {viewModalProfile.city}</p>
            <p><strong>Email:</strong> {viewModalProfile.email}</p>
            <p><strong>Phone:</strong> {viewModalProfile.phone}</p>
            <p><strong>GitHub:</strong> {
              viewModalProfile.github_link ? (
                <a
                  href={viewModalProfile.github_link}
                  className="text-indigo-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {viewModalProfile.github_link}
                </a>
              ) : "N/A"
            }</p>
            <p><strong>Technical Languages:</strong> {viewModalProfile.technical_languages || "N/A"}</p>
            {viewModalProfile.resume && (
              <a
                href={`http://localhost:8081/uploads/${viewModalProfile.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline flex items-center mt-2"
              >
                <span>View Resume</span>
              </a>
            )}
            <button
              onClick={closeViewModal}
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
