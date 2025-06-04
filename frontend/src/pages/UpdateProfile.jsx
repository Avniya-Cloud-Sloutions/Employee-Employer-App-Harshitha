import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    city: "",
    professionalTitle: "",
    qualification: "",
    experience: "",
    phone: "",
    alternatePhone: "",
    email: "",
    technicalLanguages: "",
    githubLink: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8081/view-profiles")
      .then((res) => {
        const profile = res.data.find((p) => p.id.toString() === id.toString());
        if (profile) {
          setFormData({
            fullName: profile.full_name || "",
            age: profile.age || "",
            gender: profile.gender || "",
            city: profile.city || "",
            professionalTitle: profile.professional_title || "",
            qualification: profile.qualification || "",
            experience: profile.experience || "",
            phone: profile.phone || "",
            alternatePhone: profile.alternate_phone || "",
            email: profile.email || "",
            technicalLanguages: profile.technical_language || "",
            githubLink: profile.github_link || "",
          });
        } else {
          alert("Profile not found.");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("Failed to load profile data.");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8081/update-profile/${id}`, formData)
      .then(() => {
        alert("Profile updated successfully");

        const user = JSON.parse(localStorage.getItem("user"));
        const role = user?.role;

        if (role === "employer") navigate("/dashboard-employer");
        else if (role === "employee") navigate("/dashboard-employee");
        else navigate("/login");
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Update failed");
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow mt-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Update Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          <Input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <Input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} />
          <Select name="gender" value={formData.gender} onChange={handleChange} required />

          <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <Input name="professionalTitle" placeholder="Professional Title" value={formData.professionalTitle} onChange={handleChange} />
          <Input name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} />

          <Input name="experience" type="number" placeholder="Experience (years)" value={formData.experience} onChange={handleChange} />
          <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <Input name="alternatePhone" placeholder="Alternate Phone" value={formData.alternatePhone} onChange={handleChange} />

          <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <Input name="technicalLanguages" placeholder="Technical Languages" value={formData.technicalLanguages} onChange={handleChange} />
          <Input name="githubLink" placeholder="GitHub Link" value={formData.githubLink} onChange={handleChange} />
        </div>

        <div className="mt-10 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

// Reusable Input Component
const Input = ({ name, value, onChange, placeholder, type = "text", required = false }) => (
  <input
    name={name}
    value={value}
    onChange={onChange}
    type={type}
    required={required}
    placeholder={placeholder}
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
);

// Reusable Select Component
const Select = ({ name, value, onChange, required = false }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
);
