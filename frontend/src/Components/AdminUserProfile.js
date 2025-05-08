import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundvid from "../Images/background.mp4";
import { useNavigate, useParams } from "react-router-dom";
import { User, Mail, Phone, IdCard, Users } from "lucide-react"; // icons from lucide-react

const AdminUserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [trustedPersonDetails, setTrustedPersonDetails] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // For delete modal visibility
  const navigate = useNavigate();
  const { email } = useParams();

  useEffect(() => {
    if (!email) return;

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/user?email=${email}`);
        setUserDetails(response.data);
        setTrustedPersonDetails(response.data.trustedPerson || {}); // Ensure it's not null or undefined
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [email]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true); // Just show the modal
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8070/user/user?email=${email}`);
  
      if (response.status === 200) {
        console.log("User and related data deleted successfully");
        setShowDeleteModal(false); // Close the modal after deletion
        navigate("/adminuserlist"); // Navigate after deletion
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); // Close modal if cancel is clicked
  };

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-gray-700">
        Details are not found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex justify-center items-center px-4 py-10">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover blur-[12px] brightness-[0.4]"
        >
          <source src={backgroundvid} type="video/mp4" />
        </video>
      </div>

      {/* Profile Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 p-10 md:p-14 shadow-2xl animate-fade-in">
        <h1 className="text-4xl md:text-5xl  font-bold text-center  mb-10">
          👤           <span className="text-amber-600">U</span>ser <span className="text-amber-600">D</span>etails
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white text-lg leading-relaxed">
          <div className="space-y-4">
            <p className="flex items-center gap-2 text-xl font-semibold text-amber-600 mb-2">
              User's Details:
            </p>
            <p className="flex items-center gap-2">
              <User className="text-amber-600" />{" "}
              <span>
                <strong>First Name:</strong> {userDetails.firstName}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <User className="text-amber-600" />{" "}
              <span>
                <strong>Last Name:</strong> {userDetails.lastName}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="text-amber-600" />{" "}
              <span>
                <strong>Email:</strong> {userDetails.email}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="text-amber-600" />{" "}
              <span>
                <strong>Phone:</strong> {userDetails.phone}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <IdCard className="text-amber-600" />{" "}
              <span>
                <strong>NIC:</strong> {userDetails.nic}
              </span>
            </p>
          </div>

          <div className="space-y-4">
            <p className="flex items-center gap-2 text-xl font-semibold text-amber-600 mb-2">
              Trusted Person's Details:
            </p>
            <ul className="space-y-3 pl-2">
              {trustedPersonDetails.firstName ? (
                <>
                  <p className="flex items-center gap-2">
                    <User className="text-amber-600" />{" "}
                    <span>
                      <strong>First Name:</strong> {trustedPersonDetails.firstName}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="text-amber-600" />{" "}
                    <span>
                      <strong>Phone:</strong> {trustedPersonDetails.phone}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <IdCard className="text-amber-600" />{" "}
                    <span>
                      <strong>NIC:</strong> {trustedPersonDetails.nic}
                    </span>
                  </p>
                </>
              ) : (
                <p className="text-red-500">No trusted person details available.</p>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center space-x-4">
          <button
            onClick={() => navigate("/adminuserlist")}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition duration-300"
          >
            Back to User List
          </button>

          <button
            onClick={handleDeleteClick} // Just show the delete confirmation modal
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition duration-300"
          >
            Delete
          </button>

          <button
            onClick={() => navigate("/adminuserlist")}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition duration-300"
          >
            View Crime List
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl text-black font-semibold mb-4">Are you sure you want to delete this user?</h2>
            <div className="flex justify-between">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserProfile;
