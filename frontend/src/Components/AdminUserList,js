import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundvid from "../Images/background.mp4";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8070/user/users");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load users.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleView = (email) => {
    localStorage.setItem("userEmail", email);
    navigate(`/userprofile/${email}`);
  };

  // Filtered users based on search query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-black p-6">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover blur-[14px]"
        >
          <source src={backgroundvid} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl bg-white/10 backdrop-blur-md rounded-lg shadow-2xl p-10">
        <h1 className="text-6xl lg:text-7xl font-extrabold mb-6 text-center text-white">
          <span className="text-amber-600">U</span>ser
          <span className="text-amber-600"> L</span>ist
        </h1>

        {/* Search Box */}
        <div className="mb-6 flex justify-end">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Loading/Error */}
        {loading ? (
          <p className="text-center text-white text-lg">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-600 text-lg">{error}</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-white text-lg">
            No matching users found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white/80 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {user.firstName?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-800">
                      {user.firstName || "Unknown"}
                    </div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleView(user.email)}
                  className="mt-auto bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-full"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserList;
