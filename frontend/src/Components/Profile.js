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
        const data = response.data;
        setUserDetails(data);
        setTrustedPersonDetails(data.trustedPerson);
        setUpdatedUserDetails(data);
        setUpdatedTrustedPersonDetails(data.trustedPerson);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userEmail) fetchUserDetails();
  }, [userEmail]);

  const handleInputChange = (e, isTrusted = false) => {
    const { name, value } = e.target;
    if (isTrusted) {
      setUpdatedTrustedPersonDetails(prev => ({ ...prev, [name]: value }));
    } else {
      setUpdatedUserDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (updatedUserDetails?._id) {
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
      console.error("Error saving changes:", error.response?.data || error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account and trusted person's details?")) return;

    try {
      if (userDetails?.email) {
        await axios.delete(`http://localhost:8070/auth/user?email=${userDetails.email}`);
        localStorage.removeItem("userEmail");
        alert("Account deleted successfully.");
        navigate("/signup");
      } else {
        alert("No user email found.");
      }
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error);
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-black overflow-hidden">
      <video autoPlay loop muted className="absolute w-full h-full object-cover blur-sm brightness-75">
        <source src={backgroundvid} type="video/mp4" />
      </video>

      <div className="relative z-10 w-full max-w-xl p-4">
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          👤<span className="text-amber-600">U</span>ser <span className="text-amber-600">P</span>rofile
        </h1>
        <h2 className="text-lg text-gray-200 text-center mb-4">Manage Your Details and Trusted Person's</h2>

        <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20">
          <div className="flex mb-8 border border-white/20 rounded-full overflow-hidden">
            {["me", "trustedPerson"].map(tab => (
              <button
                key={tab}
                className={`w-1/2 px-6 py-2 text-lg font-semibold transition-all duration-300 ${
                  activeTab === tab ? "bg-amber-600 text-white shadow-inner" : "bg-white/20 text-white hover:bg-white/30"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "me" ? "Me" : "Trusted Person"}
              </button>
            ))}
          </div>

          {activeTab === "me" && userDetails && (
            <div className="space-y-4">
              <h3 className="text-2xl text-white font-bold text-center mb-4">Personal Details</h3>
              {isEditingMe ? (
                <>
                  {["firstName", "lastName", "email", "phone", "nic"].map(field => (
                    <input
                      key={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      value={updatedUserDetails[field]}
                      onChange={(e) => handleInputChange(e)}
                      disabled={field === "email"}
                      className="bg-white/30 text-white border border-white/20 rounded-md p-3 w-full focus:ring-2 focus:ring-amber-500 transition"
                      placeholder={field}
                    />
                  ))}
                </>
              ) : (
                <>
                  <p className="text-white"><strong className="text-amber-600">First Name:</strong> {userDetails.firstName}</p>
                  <p className="text-white"><strong className="text-amber-600">Last Name:</strong> {userDetails.lastName}</p>
                  <p className="text-white"><strong className="text-amber-600">Email:</strong> {userDetails.email}</p>
                  <p className="text-white"><strong className="text-amber-600">Phone:</strong> {userDetails.phone}</p>
                  <p className="text-white"><strong className="text-amber-600">NIC:</strong> {userDetails.nic}</p>
                </>
              )}
              <button
                className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setIsEditingMe(prev => !prev)}
              >
                {isEditingMe ? "Cancel Edit" : "Edit My Details"}
              </button>
            </div>
          )}

          {activeTab === "trustedPerson" && trustedPersonDetails && (
            <div className="space-y-4">
              <h3 className="text-2xl text-white font-bold text-center mb-4">Trusted Person Details</h3>
              {isEditingTrustedPerson ? (
                <>
                  {["firstName", "lastName", "email", "phone", "nic"].map(field => (
                    <input
                      key={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      value={updatedTrustedPersonDetails[field]}
                      onChange={(e) => handleInputChange(e, true)}
                      className="bg-white/30 text-white border border-white/20 rounded-md p-3 w-full focus:ring-2 focus:ring-amber-500 transition"
                      placeholder={field}
                    />
                  ))}
                </>
              ) : (
                <>
                  <p className="text-white"><strong className="text-amber-600">First Name:</strong> {trustedPersonDetails.firstName}</p>
                  <p className="text-white"><strong className="text-amber-600">Last Name:</strong> {trustedPersonDetails.lastName}</p>
                  <p className="text-white"><strong className="text-amber-600">Email:</strong> {trustedPersonDetails.email}</p>
                  <p className="text-white"><strong className="text-amber-600">Phone:</strong> {trustedPersonDetails.phone}</p>
                  <p className="text-white"><strong className="text-amber-600">NIC:</strong> {trustedPersonDetails.nic}</p>
                </>
              )}
              <button
                className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setIsEditingTrustedPerson(prev => !prev)}
              >
                {isEditingTrustedPerson ? "Cancel Edit" : "Edit Trusted Person"}
              </button>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
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
