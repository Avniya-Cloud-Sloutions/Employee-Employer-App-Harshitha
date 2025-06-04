import React, { useState } from "react";
import axios from "axios";

export default function AddProfile() {
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

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length === 0) return;
    if (name === "profilePhoto") setProfilePhoto(files[0]);
    if (name === "resume") setResume(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.gender) {
      return alert("Please fill in required fields: Full Name, Email, Gender.");
    }

    try {
      setLoading(true);
      const data = new FormData();

      for (const key in formData) {
        data.append(key, formData[key]);
      }

      if (profilePhoto) data.append("profilePhoto", profilePhoto);
      if (resume) data.append("resume", resume);

      const res = await axios.post("http://localhost:8081/add-profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message || "Profile submitted successfully!");

      setFormData({
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
      setProfilePhoto(null);
      setResume(null);
    } catch (error) {
      console.error("Submit error:", error);
      alert(error.response?.data?.message || "Failed to submit profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow mt-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Add Profile</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          <Input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <Input name="age" placeholder="Age" value={formData.age} onChange={handleChange} type="number" />
          <Select name="gender" value={formData.gender} onChange={handleChange} required />

          <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <Input name="professionalTitle" placeholder="Professional Title" value={formData.professionalTitle} onChange={handleChange} />
          <Input name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} />

          <Input name="experience" placeholder="Experience (years)" value={formData.experience} onChange={handleChange} type="number" />
          <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} type="tel" />
          <Input name="alternatePhone" placeholder="Alternate Phone Number" value={formData.alternatePhone} onChange={handleChange} type="tel" />

          <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} type="email" required />
          <Input name="technicalLanguages" placeholder="Technical Languages (comma separated)" value={formData.technicalLanguages} onChange={handleChange} />
          <Input name="githubLink" placeholder="GitHub Link" value={formData.githubLink} onChange={handleChange} type="url" />
        </div>

        {/* File Inputs */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Profile Photo</label>
            <input type="file" name="profilePhoto" accept="image/*" onChange={handleFileChange} className="w-full border border-gray-300 p-2 rounded" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Resume (PDF/DOC)</label>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="w-full border border-gray-300 p-2 rounded" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10 text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Profile"}
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
