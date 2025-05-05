import React, { useState } from "react";
import backgroundvid from "../Images/background.mp4"; // Background video

const Profile = () => {
  // Manage active tab
  const [activeTab, setActiveTab] = useState("me");

  // Sample data for "Me" and "Trusted Person"
  const userDetails = {
    firstName: "Sivashangar",
    lastName: "Sivakumar",
    email: "chiyaan0825.com",
    phone: "0766320825",
    nic: "200123800327"
  };

  const trustedPersonDetails = {
    name: "Perers KATM",
    email: "tavini123@gmail.com",
    phone: "0704285474",
    nic: "200128557896"
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
        <> <span className="text-amber-600">U</span>ser <span className="text-amber-600">D</span>etails</>
        <h2 className="text-lg text-gray-100 mb-0 text-center">
          Manage Your Details and Trusted Person's
        </h2>
        </h1>
        

        {/* Profile Details Container */}
        <div className="bg-white shadow-xl rounded-lg p-6 mt-6 ">
          {/* Tabs Navigation */}
          <div className="flex mb-8 border">
            <button
              className={`w-1/2 px-6 py-2 text-lg font-medium ${
                activeTab === "me"
                  ? "bg-amber-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } focus:outline-none rounded-l-lg`}
              onClick={() => setActiveTab("me")}
            >
              Me
            </button>
            <button
              className={`w-1/2 px-6 py-2 text-lg font-medium ${
                activeTab === "trustedPerson"
                  ? "bg-amber-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } focus:outline-none rounded-r-lg`}
              onClick={() => setActiveTab("trustedPerson")}
            >
              Trusted Person
            </button>
          </div>

          {/* Me Content */}
          {activeTab === "me" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Personal Details
              </h3>
              <br></br>
              <div className="flex space-x-8">
                <div className="flex-1">
                  <div>
                    <label className="block text-gray-600 font-bold ">
                      First Name
                    </label>
                    <p className="text-lg text-gray-800">
                      {userDetails.firstName}
                    </p>
                  </div>
                  <br></br>
                  <div>
                    <label className="block text-gray-600 font-bold">
                      Email
                    </label>
                    <p className="text-lg text-gray-800">{userDetails.email}</p>
                  </div>
                  <br></br>
                  <div>
                    <label className="block text-gray-600 font-bold">
                      NIC
                    </label>
                    <p className="text-lg text-gray-800">{userDetails.nic}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div>
                    <div>
                      <label className="block text-gray-600 font-bold">
                        Last Name
                      </label>
                      <p className="text-lg text-gray-800">
                        {userDetails.lastName}
                      </p>
                    </div>
                    <br></br>
                    <div>
                    <label className="block text-gray-600 font-bold">
                      Phone
                    </label>
                    <p className="text-lg text-gray-800">{userDetails.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trusted Person Content */}
          {activeTab === "trustedPerson" && (
            <div className="space-y-4">
            <h3 className="text-2xl  text-gray-800 mb-4 text-center font-bold">
              Personal Details
            </h3>
            <div className="flex space-x-8">
              <div className="flex-1">
                
                <div>
                  <label className="block text-gray-600 font-bold">Name</label>
                  <p className="text-lg text-gray-800">{trustedPersonDetails.name}</p>
                </div>
                <br></br>
                <div>
                  <label className="block text-gray-600 font-bold">Email</label>
                  <p className="text-lg text-gray-800">{trustedPersonDetails.email}</p>
                </div>
              </div>
              <div className="flex-1 ">
                <div>
                  <label className="block text-gray-600 font-bold">Phone</label>
                  <p className="text-lg text-gray-800">{trustedPersonDetails.phone}</p>
                </div>
                <br></br>
                <div>
                  <label className="block text-gray-600 font-bold">NIC</label>
                  <p className="text-lg text-gray-800">{trustedPersonDetails.nic}</p>
                </div>
              </div>
            </div>
          </div>
          
          )}

          {/* Edit and Delete Buttons */}
          <div className="flex space-x-4 justify-center mt-6">
            <button className="bg-green-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-green-700 focus:outline-none">
              Edit
            </button>
            <button className="bg-red-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-red-700 focus:outline-none">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
