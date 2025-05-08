import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../Images/Logo.png";
import admin from "../Images/admin.png";
import bell from "../Images/bell.png";

const Admindb = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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

      {/* ----Header bar----- */}
      <div className="flex-1">
        <header className="fixed left-0 md:left-64 w-full md:w-[calc(100%-16rem)] bg-gray-950 bg-opacity-80 backdrop-blur-md z-40 transition-transform duration-300">
            <nav className="h-[13vh] flex justify-between items-center px-8">
            
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
  );
};

export default Admindb;
