import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
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
    navigate(`/adminuserprofile/${email}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Set header with "Crime Radar"
    doc.setFontSize(30);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 159, 28); // Orange color for header
    doc.text("Crime Radar", 20, 20); // Position of the text
  
    // Add some space below the header
    let yPosition = 40;
    
    // Add table title or any additional information
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black text color
    doc.text("User List", 20, yPosition);
  
    // Table Header
    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255); // White text for header row
    doc.setFillColor(0, 102, 204); // Blue header
    doc.rect(20, yPosition, 170, 10, "F"); // Header background
  
    doc.text("No.", 20, yPosition + 6);
    doc.text("Name", 40, yPosition + 6);
    doc.text("Email", 90, yPosition + 6);
  
    // Add the users list in a table format
    yPosition += 15;
    users.forEach((user, index) => {
      const isEvenRow = index % 2 === 0;
      doc.setTextColor(0, 0, 0); // Set text color to black
      doc.setFillColor(isEvenRow ? 245 : 255, isEvenRow ? 245 : 255, isEvenRow ? 245 : 255); // Alternate row color
  
      doc.rect(20, yPosition, 170, 8, "F"); // Row background color
  
      doc.text(`${index + 1}`, 20, yPosition + 6);
      doc.text(user.firstName || "Unknown", 40, yPosition + 6);
      doc.text(user.email, 90, yPosition + 6);
  
      yPosition += 10;
    });
  
    // Footer with signature space
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black text color
    doc.setFillColor(255, 159, 28); // Orange footer color
    doc.rect(20, doc.internal.pageSize.height - 30, 170, 20, "F"); // Footer background
  
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, doc.internal.pageSize.height - 20);
    doc.text("Signature: ____________________________", 20, doc.internal.pageSize.height - 10);
  
    // Save the document as a PDF
    doc.save("user_list.pdf");
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
        <h1 className="text-6xl lg:text-6xl font-extrabold mb-6 text-center text-white">
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
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={generatePDF}
                className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-full"
              >
                Download PDF
              </button>
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUserList;
