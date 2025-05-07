
import { useNavigate } from "react-router-dom";
import { BookOpen, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import bell from '../Images/bell.png';      // or correct path to bell image
import admin from '../Images/admin.png';    // or correct path to admin image
import logo from '../Images/Logo.png'; 
import React, { useState } from 'react';





const AwareAdminMain = () => {
 
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    
    <div>
      <div className="flex">
            {/*------Side Menu-----*/}
            <div
              className={`${isOpen ? "translate-x-0" : "-translate-x-full"} bg-gray-800 text-white h-screen w-64 p-4 pr-8 fixed top-0 left-0 z-40 transform transition-transform duration-300 md:translate-x-0 md:relative md:block`}>
      
              <a>
                 <img src={logo} alt="Logo" className="w-28 pt-2 -mt-4" />
              </a>
      
              <h2 className="text-xl font-bold mb-6 ml-8">Admin Panel</h2>
      
              <ul className="space-y-6 mt-5 ml-8">
                <hr className="border-gray-500"/>
      
                <li><Link to="/admin" className="hover:text-amber-500">Overview</Link></li><hr className="border-gray-500" />
                <li><Link to="/admin/crimeDetails" className="hover:text-amber-500">Reported Crimes</Link></li><hr className="border-gray-500"/>
                <li><Link to="/admin/awareadmin" className="hover:text-amber-500">Article Section</Link></li><hr className="border-gray-500" />
                <li><Link to="/Locationlist" className="hover:text-amber-500">Locations & Maps</Link></li><hr className="border-gray-500"/>
                <li><Link to="" className="hover:text-amber-500">Users</Link></li><hr className="border-gray-500"/>
              </ul>
            </div>
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
        {/* ----Header bar----- */}
        <div className="flex-1">
        <header className="fixed left-0 md:left-64 w-full md:w-[calc(100%-16rem)] bg-gray-950 bg-opacity-80 backdrop-blur-md z-40 transition-transform duration-300">
            <nav className="h-[15vh] flex justify-between items-center px-8">
            
            <h1 className="text-2xl font-semibold text-white">Welcome to Admin Dashboard!</h1>
            
            <div className="flex items-center space-x-6">
                <img src={bell} alt="notification" className="w-10 mb-3" />
                <div className="flex flex-col items-center">
                <img src={admin} alt="admin" className="w-12" />
                <p className="text-sm text-white">Admin</p>
                </div>
            </div>

            </nav>
        </header>
        <div className="overflow-y-auto h-[calc(100vh-5vh)]">
         <Outlet />
        </div>
      </div>
      
      </div>
      </div>
    </div>
  
    
  );
};


export default AwareAdminMain;
