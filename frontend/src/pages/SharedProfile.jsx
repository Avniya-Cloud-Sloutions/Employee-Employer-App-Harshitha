import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SharedProfile() {
  const { id } = useParams(); // Use ID instead of email
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/view-profile-by-id/${id}`) // Updated endpoint
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!profile) return <div className="p-8 text-center text-red-500">Profile not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6">Shared Profile</h1>

        {/* Profile Photo */}
        {profile.profile_photo && (
          <div className="flex justify-center mb-6">
            <img
              src={`http://localhost:8081/uploads/${profile.profile_photo}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow"
            />
          </div>
        )}

        {/* Profile Info */}
        <div className="space-y-3 text-gray-800">
          <p><strong>Full Name:</strong> {profile.full_name}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Qualification:</strong> {profile.qualification}</p>
          <p><strong>Title:</strong> {profile.professional_title}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone Number:</strong> {profile.phone}</p>
          <p><strong>Alternate Phone:</strong> {profile.alternate_phone}</p>
          <p><strong>Experience:</strong> {profile.experience} years</p>
          <p><strong>GitHub:</strong> 
            <a
              href={profile.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline ml-2"
            >
              {profile.github_link}
            </a>
          </p>
          <p><strong>Technical Languages:</strong> {profile.technical_languages}</p>
          <p><strong>City:</strong> {profile.city}</p>
          {profile.resume && (
            <p>
              <strong>Resume:</strong>{" "}
              <a
                href={`http://localhost:8081/uploads/${profile.resume}`}
                download
                className="text-indigo-500 underline"
              >
                Download Resume
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
