import React from "react";

export default function DashboardEmployer() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-yellow-600 mb-3">Welcome, Employer!</h2>
        <p className="text-gray-600 text-lg">
          Use the top navigation bar to add, view, and manage employee profiles.
        </p>
      </div>
    </div>
  );
}
