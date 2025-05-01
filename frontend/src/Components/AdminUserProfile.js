import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundvid from "../Images/background.mp4";
import { useNavigate, useParams } from "react-router-dom";

const AdminUserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const { email } = useParams();

  useEffect(() => {
    if (!email) return;

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/auth/user?email=${email}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [email]);

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-gray-700">
        Loading user details...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-100 p-6">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video autoPlay loop muted className="w-full h-full object-cover blur-[12px]">
          <source src={backgroundvid} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-10 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-amber-600">User Profile</h1>

        <div className="space-y-4 text-lg text-gray-800">
          <p><strong>First Name:</strong> {userDetails.firstName}</p>
          <p><strong>Last Name:</strong> {userDetails.lastName}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Phone:</strong> {userDetails.phone}</p>
          <p><strong>NIC:</strong> {userDetails.nic}</p>
          <div>
            <strong>Trusted Person Details:</strong>
            <ul className="ml-6 list-disc">
              <li><strong>Name:</strong> {userDetails.trustedPerson?.name}</li>
              <li><strong>Phone:</strong> {userDetails.trustedPerson?.phone}</li>
              <li><strong>Relationship:</strong> {userDetails.trustedPerson?.relationship}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/adminuserlist")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Back to User List
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserProfile;
