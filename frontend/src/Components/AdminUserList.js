import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundvid from "../Images/background.mp4"; // Import the background video

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8070/auth/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleView = (email) => {
    localStorage.setItem("userEmail", email); // Save email to localStorage
    navigate(`/adminuser/${email}`);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 p-6">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full">
        <video autoPlay loop muted className="w-full h-full object-cover blur-[14px]">
          <source src={backgroundvid} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-10">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-black">
         <span className="text-4xl font-extrabold mb-8 text-center text-amber-600">U</span>ser  <span className="text-4xl font-extrabold mb-8 text-center text-amber-600">L</span>ist
        </h1>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-amber-500 text-white">
              <th className="px-8 py-4 border text-xl">First Name</th>
              <th className="px-8 py-4 border text-xl">Email</th>
              <th className="px-8 py-4 border text-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="text-center hover:bg-gray-100">
                  <td className="px-8 py-2 border font-bold text-left text-lg">{user.firstName}</td>
                  <td className="px-8 py-2 border font-bold text-left text-lg">{user.email}</td>
                  <td className="px-8 py-2 border">
                    <button
                      onClick={() => handleView(user.email)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded text-lg"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-6 text-gray-500 text-lg">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserList;
