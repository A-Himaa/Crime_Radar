import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundvid from "../Images/background.mp4";
import { useNavigate } from "react-router-dom"; 


const Profile = () => {
  const [activeTab, setActiveTab] = useState("me");
  const [userDetails, setUserDetails] = useState(null);
  const [trustedPersonDetails, setTrustedPersonDetails] = useState(null);
  const [isEditingMe, setIsEditingMe] = useState(false);
  const [isEditingTrustedPerson, setIsEditingTrustedPerson] = useState(false);
  const [updatedUserDetails, setUpdatedUserDetails] = useState(null);
  const [updatedTrustedPersonDetails, setUpdatedTrustedPersonDetails] = useState(null);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/auth/user?email=${userEmail}`);
        setUserDetails(response.data);
        setTrustedPersonDetails(response.data.trustedPerson);
        setUpdatedUserDetails(response.data);
        setUpdatedTrustedPersonDetails(response.data.trustedPerson);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userEmail) fetchUserDetails();
  }, [userEmail]);

  const handleInputChange = (e, isTrustedPerson = false) => {
    const { name, value } = e.target;
    if (isTrustedPerson) {
      setUpdatedTrustedPersonDetails({
        ...updatedTrustedPersonDetails,
        [name]: value,
      });
    } else {
      setUpdatedUserDetails({
        ...updatedUserDetails,
        [name]: value,
      });
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (updatedUserDetails && updatedUserDetails._id) {
        await axios.put(`http://localhost:8070/auth/user/${updatedUserDetails._id}`, updatedUserDetails);
      }

      if (updatedTrustedPersonDetails && updatedTrustedPersonDetails._id) {
        await axios.put(`http://localhost:8070/auth/user/${updatedTrustedPersonDetails._id}`, updatedTrustedPersonDetails);
      }

      setUserDetails(updatedUserDetails);
      setTrustedPersonDetails(updatedTrustedPersonDetails);
      setIsEditingMe(false);
      setIsEditingTrustedPerson(false);
    } catch (error) {
      console.error("Error saving changes:", error.response ? error.response.data : error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account and trusted person's details?");
  
    if (!confirmDelete) return; // Stop if user cancels
  
    try {
      if (userDetails?.email) {
        // Delete the user using their email
        await axios.delete(`http://localhost:8070/auth/user?email=${userDetails.email}`);
        
        // Clear state and update UI
        setUserDetails(null);
        setTrustedPersonDetails(null);
        localStorage.removeItem("userEmail"); // Remove saved email if needed
  
        alert("Account and trusted person's details deleted successfully!");
        navigate("/signup");
      } else {
        alert("Error: No user email found.");
      }
    } catch (error) {
      console.error("Error deleting user:", error.response ? error.response.data : error);
      alert("Failed to delete account. Please try again.");
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <video autoPlay loop muted className="w-full h-full object-cover blur-[14px]">
          <source src={backgroundvid} type="video/mp4" />
        </video>
      </div>

      <div className="relative top-10 z-10 w-full max-w-xl">
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center">
          <span className="text-amber-600">U</span>ser <span className="text-amber-600">D</span>etails
          <h2 className="text-lg text-gray-100 mb-0 text-center">
            Manage Your Details and Trusted Person's
          </h2>
        </h1>

        <div className="bg-white shadow-xl rounded-lg p-6 mt-6">
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

          {activeTab === "me" && userDetails && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Personal Details</h3>
              {isEditingMe ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={updatedUserDetails.firstName}
                    onChange={(e) => handleInputChange(e)}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={updatedUserDetails.lastName}
                    onChange={(e) => handleInputChange(e)}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={updatedUserDetails.email}
                    onChange={(e) => handleInputChange(e)}
                    className="border p-2 w-full mb-2"
                    disabled
                  />
                  <input
                    type="text"
                    name="phone"
                    value={updatedUserDetails.phone}
                    onChange={(e) => handleInputChange(e)}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="text"
                    name="nic"
                    value={updatedUserDetails.nic}
                    onChange={(e) => handleInputChange(e)}
                    className="border p-2 w-full mb-2"
                  />
                </>
              ) : (
                <>
                  <p className="text-lg text-gray-800"><strong>First Name:</strong> {userDetails.firstName}</p>
                  <p className="text-lg text-gray-800"><strong>Last Name:</strong> {userDetails.lastName}</p>
                  <p className="text-lg text-gray-800"><strong>Email:</strong> {userDetails.email}</p>
                  <p className="text-lg text-gray-800"><strong>Phone:</strong> {userDetails.phone}</p>
                  <p className="text-lg text-gray-800"><strong>NIC:</strong> {userDetails.nic}</p>
                </>
              )}
            </div>
          )}

          {activeTab === "trustedPerson" && trustedPersonDetails && (
            <div className="space-y-4">
              <h3 className="text-2xl text-gray-800 mb-4 text-center font-bold">Trusted Person Details</h3>
              {isEditingTrustedPerson ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={updatedTrustedPersonDetails.firstName}
                    onChange={(e) => handleInputChange(e, true)}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={updatedTrustedPersonDetails.email}
                    onChange={(e) => handleInputChange(e, true)}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={updatedTrustedPersonDetails.phone}
                    onChange={(e) => handleInputChange(e, true)}
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="text"
                    name="nic"
                    value={updatedTrustedPersonDetails.nic}
                    onChange={(e) => handleInputChange(e, true)}
                    className="border p-2 w-full mb-2"
                  />
                </>
              ) : (
                <>
                  <p className="text-lg text-gray-800"><strong>First Name:</strong> {trustedPersonDetails.firstName}</p>
                  <p className="text-lg text-gray-800"><strong>Email:</strong> {trustedPersonDetails.email}</p>
                  <p className="text-lg text-gray-800"><strong>Phone:</strong> {trustedPersonDetails.phone}</p>
                  <p className="text-lg text-gray-800"><strong>NIC:</strong> {trustedPersonDetails.nic}</p>
                </>
              )}
            </div>
          )}

          {(isEditingMe || isEditingTrustedPerson) && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSaveChanges}
                className="bg-green-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Buttons (Edit & Delete) */}
          <div className="flex space-x-4 justify-center mt-6">
            {!isEditingMe && !isEditingTrustedPerson && (
              <button
                onClick={() => {
                  setIsEditingMe(true);
                  setIsEditingTrustedPerson(true);
                }}
                className="bg-green-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-green-700"
              >
                Edit
              </button>
            )}

            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
