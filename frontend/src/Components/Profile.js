import React, { useState } from "react";
import backgroundvid from "../Images/background.mp4"; // Background video

const Profile = () => {
  // Manage active tab
  const [activeTab, setActiveTab] = useState("me");

  // Sample data for "Me" and "Trusted Person"
  const userDetails = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
  };

  const trustedPersonDetails = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+0987654321",
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-black overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover blur-[14px]"
        >
          <source src={backgroundvid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl">
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center">
          User Profile
        </h1>
        <h2 className="text-lg text-gray-100 mb-0 text-center">
          Manage your details and trusted persons
        </h2>

        {/* Profile Details Container */}
        <div className="bg-white shadow-xl rounded-lg p-6 mt-6">

          {/* Tabs Navigation */}
          <div className="flex mb-8 border">
            <button
              className={`w-1/2 px-6 py-2 text-lg font-medium ${
                activeTab === "me" ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700"
              } focus:outline-none rounded-l-lg`}
              onClick={() => setActiveTab("me")}
            >
              Me
            </button>
            <button
              className={`w-1/2 px-6 py-2 text-lg font-medium ${
                activeTab === "trustedPerson" ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700"
              } focus:outline-none rounded-r-lg`}
              onClick={() => setActiveTab("trustedPerson")}
            >
              Trusted Person
            </button>
          </div>

          {/* Me Content */}
          {activeTab === "me" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personal Details</h3>
              <div>
                <label className="block text-gray-600">First Name</label>
                <p className="text-lg text-gray-800">{userDetails.firstName}</p>
              </div>
              <div>
                <label className="block text-gray-600">Last Name</label>
                <p className="text-lg text-gray-800">{userDetails.lastName}</p>
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <p className="text-lg text-gray-800">{userDetails.email}</p>
              </div>
              <div>
                <label className="block text-gray-600">Phone</label>
                <p className="text-lg text-gray-800">{userDetails.phone}</p>
              </div>
            </div>
          )}

          {/* Trusted Person Content */}
          {activeTab === "trustedPerson" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Trusted Person Details</h3>
              <div>
                <label className="block text-gray-600">Name</label>
                <p className="text-lg text-gray-800">{trustedPersonDetails.name}</p>
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <p className="text-lg text-gray-800">{trustedPersonDetails.email}</p>
              </div>
              <div>
                <label className="block text-gray-600">Phone</label>
                <p className="text-lg text-gray-800">{trustedPersonDetails.phone}</p>
              </div>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          <div className="flex space-x-4 justify-center mt-6">
            <button className="bg-green-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-green-700 focus:outline-none">
              Edit
            </button>
            <button className="bg-red-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-red-700 focus:outline-none">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
