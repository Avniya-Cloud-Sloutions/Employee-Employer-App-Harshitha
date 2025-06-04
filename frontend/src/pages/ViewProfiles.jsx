import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewProfiles() {
  const [profiles, setProfiles] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:8081/view-profiles")
      .then((res) => {
        setProfiles(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load profiles.");
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        await axios.delete(`http://localhost:8081/delete-profile/${id}`);
        setProfiles((prev) => prev.filter((profile) => profile.id !== id));
        alert("Profile deleted successfully.");
      } catch (err) {
        console.error(err);
        alert("Failed to delete profile.");
      }
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/update-profile/${id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Employee Profiles</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white shadow-md rounded-lg p-4 relative"
          >
            <h2 className="text-xl font-semibold mb-2">{profile.fullName}</h2>
            <p><strong>Age:</strong> {profile.age}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>City:</strong> {profile.city}</p>
            <p><strong>Title:</strong> {profile.professionalTitle}</p>
            <p><strong>Qualification:</strong> {profile.qualification}</p>
            <p><strong>Experience:</strong> {profile.experience} years</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Alt Phone:</strong> {profile.alternatePhone}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Languages:</strong> {profile.technicalLanguages}</p>
            <p><strong>GitHub:</strong>{" "}
              <a
                href={profile.githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {profile.githubLink}
              </a>
            </p>

            {profile.profilePhoto && (
              <img
                src={`http://localhost:8081/uploads/${profile.profilePhoto}`}
                alt="Profile"
                className="mt-2 w-24 h-24 rounded-full object-cover"
              />
            )}

            {profile.resume && (
              <div className="mt-2">
                <a
                  href={`http://localhost:8081/uploads/${profile.resume}`}
                  download
                  className="text-green-600 underline"
                >
                  Download Resume
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 space-x-2">
              {user?.role === "employer" && (
                <button
                  onClick={() => handleDelete(profile.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
              {user?.email === profile.email && (
                <button
                  onClick={() => handleUpdate(profile.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
