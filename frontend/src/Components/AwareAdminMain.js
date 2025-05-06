import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const AwareAdminMain = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-auto relative">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[80vw] mt-[10vh]">
         {/* Back to Home Button */}
         <div className="mb-6">
          <Link
            to="/admin"
            className="text-white bg-amber-600 px-4 py-2 rounded shadow hover:bg-amber-700 transition"
          >
             Back
          </Link>
        </div>
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Awareness Admin Panel</h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Manage crime awareness articles effectively
          </p>
          
          <div className="flex flex-col gap-6 w-full max-w-md">
            <button
              onClick={() => navigate("/addarticle")}
              className="flex items-center justify-center gap-3 bg-amber-600 text-white font-semibold px-6 py-4 rounded-xl shadow-md hover:bg-amber-700 transition duration-200"
            >
              <BookOpen className="w-6 h-6" />
              Add New Article
            </button>

            <button
              onClick={() => navigate("/articles")}
              className="flex items-center justify-center gap-3 bg-amber-600 text-white font-semibold px-6 py-4 rounded-xl shadow-md hover:bg-amber-700 transition duration-200"
            >
              <Eye className="w-6 h-6" />
              View All Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwareAdminMain;
