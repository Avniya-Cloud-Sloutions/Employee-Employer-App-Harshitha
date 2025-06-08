import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalProfile, setModalProfile] = useState(null); // Contact modal
  const [viewModalProfile, setViewModalProfile] = useState(null); // View details modal
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

  const totalPages = Math.ceil(profiles.length / profilesPerPage);
  const indexOfLast = currentPage * profilesPerPage;
  const indexOfFirst = indexOfLast - profilesPerPage;
  const currentProfiles = profiles.slice(indexOfFirst, indexOfLast);

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

  // Contact modal handlers
  const openContactModal = (profile) => setModalProfile(profile);
  const closeContactModal = () => setModalProfile(null);

  // View details modal handlers
  const openViewModal = (profile) => setViewModalProfile(profile);
  const closeViewModal = () => setViewModalProfile(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl text-center font-bold text-indigo-700 mb-8">Employee Profiles</h1>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white shadow-md rounded-xl p-5 border-t-4 border-indigo-600"
          >
            <h2 className="text-2xl font-semibold mb-1 capitalize">{profile.full_name}</h2>
            <p className="text-sm text-gray-700">
              <strong>Title:</strong> {profile.professional_title}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Experience:</strong> {profile.experience} yrs
            </p>
            <p className="text-sm text-gray-700">
              <strong>City:</strong> {profile.city}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> {profile.email}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Phone:</strong> {profile.phone}
            </p>

            {profile.resume && (
              <a
                href={`http://localhost:8081/uploads/${profile.resume}`}
                download
                className="text-indigo-500 underline block mt-2"
              >
                Download Resume
              </a>
            )}

            {/* Action Buttons */}
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
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">
              Contact {modalProfile.full_name}
            </h3>
            <p className="text-gray-700 mb-1">
              <strong>Email:</strong> {modalProfile.email}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Phone:</strong> {modalProfile.phone}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Alternate Phone:</strong> {modalProfile.alternate_phone || "N/A"}
            </p>
            <a
              href={`https://wa.me/${modalProfile.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              WhatsApp Chat
            </a>
            <br />
            <button
              onClick={closeContactModal}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewModalProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto text-left">
            {/* Profile Photo */}
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

            <p>
              <strong>Full Name:</strong> {viewModalProfile.full_name}
            </p>
            <p>
              <strong>Gender:</strong> {viewModalProfile.gender}
            </p>
            <p>
              <strong>Professional Title:</strong> {viewModalProfile.professional_title}
            </p>
            <p>
              <strong>Experience:</strong> {viewModalProfile.experience} years
            </p>
            <p>
              <strong>Qualification:</strong> {viewModalProfile.qualification}
            </p>
            <p>
              <strong>City:</strong> {viewModalProfile.city}
            </p>
            <p>
              <strong>Email:</strong> {viewModalProfile.email}
            </p>
            <p>
              <strong>Phone:</strong> {viewModalProfile.phone}
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              {viewModalProfile.github_link ? (
                <a
                  href={viewModalProfile.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline"
                >
                  {viewModalProfile.github_link}
                </a>
              ) : (
                "N/A"
              )}
            </p>
            <p>
              <strong>Technical Languages:</strong>{" "}
              {viewModalProfile.technical_languages || "N/A"}
            </p>

            {viewModalProfile.resume && (
              <a
                 href={`http://localhost:8081/uploads/${viewModalProfile.resume}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-indigo-600 hover:underline flex items-center mt-2"
              >
                 <span>View Resume</span>
                 <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 01-.708 1.707H16v7a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h7V3.707a1 1 0 01.293-.707z" />
                 </svg>
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
