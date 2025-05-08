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
        const response = await axios.get(`http://localhost:8070/user/${userEmail}`);
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
        await axios.put(`http://localhost:8070/user/user/${updatedUserDetails._id}`, {
          updatedUserDetails,
          trustedPerson: updatedTrustedPersonDetails
        });
  
        setUserDetails(updatedUserDetails);
        setTrustedPersonDetails(updatedTrustedPersonDetails);
        setIsEditingMe(false);
        setIsEditingTrustedPerson(false);
      }
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
        await axios.delete(`http://localhost:8070/user/user?email=${userDetails.email}`);
        
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
        <video autoPlay loop muted className="w-full h-full object-cover blur-sm brightness-75">
          <source src={backgroundvid} type="video/mp4" />
        </video>
      </div>

      <div className="relative top-10 z-10 w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg tracking-wide mb-2">
        👤<span className="text-amber-600">U</span>ser <span className="text-amber-600">P</span>rofile        </h1>
        <h2 className="text-lg text-gray-200 text-center mb-4">Manage Your Details and Trusted Person's</h2>

        <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20">
          <div className="flex mb-8 rounded-full overflow-hidden border border-white/20">
            <button
              className={`w-1/2 px-6 py-2 text-lg font-semibold transition-all duration-300 ${
                activeTab === "me"
                  ? "bg-amber-600 text-white shadow-inner"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
              onClick={() => setActiveTab("me")}
            >
              Me
            </button>
            <button
              className={`w-1/2 px-6 py-2 text-lg font-semibold transition-all duration-300 ${
                activeTab === "trustedPerson"
                  ? "bg-amber-600 text-white shadow-inner"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
              onClick={() => setActiveTab("trustedPerson")}
            >
              Trusted Person
            </button>
          </div>

          {activeTab === "me" && userDetails && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white text-center drop-shadow-sm mb-4">Personal Details</h3>
              {isEditingMe ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={updatedUserDetails.firstName}
                    onChange={(e) => handleInputChange(e)}
                    className="bg-white/30 backdrop-blur-sm text-white placeholder-gray-200 border border-white/20 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={updatedUserDetails.lastName}
                    onChange={(e) => handleInputChange(e)}
                    className="bg-white/30 backdrop-blur-sm text-white placeholder-gray-200 border border-white/20 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  />
                  <input
                    type="email"
                    name="email"
                    value={updatedUserDetails.email}
                    onChange={(e) => handleInputChange(e)}
                    className="bg-white/30 backdrop-blur-sm text-white placeholder-gray-200 border border-white/20 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    disabled
                  />
                  <input
                    type="text"
                    name="phone"
                    value={updatedUserDetails.phone}
                    onChange={(e) => handleInputChange(e)}
                    className="bg-white/30 backdrop-blur-sm text-white placeholder-gray-200 border border-white/20 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  />
                  <input
                    type="text"
                    name="nic"
                    value={updatedUserDetails.nic}
                    onChange={(e) => handleInputChange(e)}
                    className="bg-white/30 backdrop-blur-sm text-white placeholder-gray-200 border border-white/20 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  />
                </>
              ) : (
                <>
                  <p className="text-lg text-white drop-shadow-sm"><strong className="text-amber-600">First Name:</strong> {userDetails.firstName}</p>
                  <p className="text-lg text-white drop-shadow-sm"><strong className="text-amber-600">Last Name:</strong> {userDetails.lastName}</p>
                  <p className="text-lg text-white drop-shadow-sm"><strong className="text-amber-600">Email:</strong> {userDetails.email}</p>
                  <p className="text-lg text-white drop-shadow-sm"><strong className="text-amber-600">Phone:</strong> {userDetails.phone}</p>
                  <p className="text-lg text-white drop-shadow-sm"><strong className="text-amber-600">NIC:</strong> {userDetails.nic}</p>
                </>
              )}
            </div>
          )}

          {activeTab === "trustedPerson" && trustedPersonDetails && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white text-center drop-shadow-sm mb-4">Trusted Person Details</h3>
              {isEditingTrustedPerson ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={updatedTrustedPersonDetails.firstName}
                    onChange={(e) => handleInputChange(e, true)}
                    className="bg-white/30 backdrop-blur-sm text-white placeholder-gray-200 border border-white/20 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  />
                  <input
                    type="email"
                    name="email"
                    value={updatedTrustedPersonDetails.email}
                    onChange={(e) => handleInputChange(e, true)}
                    className="bg-white/30 backdrop-blur-sm text-white placeholder-gray-200 border border-white/20 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  />
                </>
              ) : (
                <>
                  <p className="text-lg text-white drop-shadow-sm"><strong className="text-amber-600">First Name:</strong> {trustedPersonDetails.firstName}</p>
                  <p className="text-lg text-white drop-shadow-sm"><strong className="text-amber-600">Last Name:</strong> {trustedPersonDetails.lastName}</p>
                  <p className="text-lg text-white drop-shadow-sm"><strong className="text-amber-600">Email:</strong> {trustedPersonDetails.email}</p>
                  <p className="text-lg text-white drop-shadow-sm"><strong className="text-amber-600">Phone:</strong> {trustedPersonDetails.phone}</p>
                  <p className="text-lg text-white drop-shadow-sm"><strong className="text-amber-600">NIC:</strong> {trustedPersonDetails.nic}</p>

                </>
              )}
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md transition-all duration-300 hover:bg-green-700"
              onClick={() => {
                if (isEditingMe || isEditingTrustedPerson) {
                  handleSaveChanges();
                } else {
                  setIsEditingMe(true);
                  setIsEditingTrustedPerson(true);
                }
              }}
            >
              {isEditingMe || isEditingTrustedPerson ? "Save Changes" : "Edit"}
            </button>
            <button
              className="bg-red-600 text-white py-2 px-6 rounded-md shadow-md transition-all duration-300 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
