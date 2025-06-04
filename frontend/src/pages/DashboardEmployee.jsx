import React from "react";

export default function DashboardEmployee() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-3">Welcome, Employee!</h2>
        <p className="text-gray-600 text-lg">
          Use the navigation above to add or view your profile.
        </p>
      </div>
    </div>
  );
}
