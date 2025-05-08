import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import CrimeMap2 from './Components/CrimeMap2';



//Importing Header
import Header1 from "./Components/header";
import Home from "./Components/home";
import Admindb from "./Components/admindb.js";
import Overview from "./Components/overview.js";

//Crime Report 
import Report from "./Components/Report.js";
import LocationList from "./Components/LocationList";
import LocationListUser from "./Components/LocationListUser.jsx"
import CrimeMap from "./Components/CrimeMap";
import CrimeDetails from "./Components/crimeDetails.js";

import AddArticle from "./Components/AddArticle.js";
import ViewArticles from './Components/ViewArticles.js';
import EditArticle from "./Components/EditArticle.js";
import AwareAdminMain from "./Components/AwareAdminMain.js";
import ViolentCrimes from "./Components/ViolentCimes.js";
import CyberCrimes from "./Components/CyberCrimes.js";
import PropertyCrimes from "./Components/PropertyCrimes.js";
import DrugRelatedCrimes from "./Components/DrugRelatedCrimes.js";
import RobberyCrimes from "./Components/RobberyCrimes.js";

import ReportDetails from "./Components/reportDetails.js";


import LocationForm from "./Components/LocationForm.jsx";

import Login from "./Components/Login.js";
import Signup from "./Components/Signup.js";
import Profile from "./Components/Profile.js";

import AdminUserList from "./Components/AdminUserList.js";
import AdminUserProfile from "./Components/AdminUserProfile.js";


import UpdateLocation from "./Components/UpdateLocation.jsx";
import CrimeYearLineChart from "./Components/CrimeYearLineChart.jsx";
import CrimeTypePieChart from "./Components/CrimeTypePieChart.jsx";
import CrimeDashboard from "./Components/CrimeDashboard.jsx";
import CrimeMap2 from "./Components/CrimeMap2.js";
import CrimeBubbleChart from "./Components/CrimeBubbleChart.jsx";


function App() {
  const location = useLocation();
  const path = location.pathname;

  const hideHeader =
  path.startsWith("/admin") || path === "/crimeDetails" || path.startsWith("/crimeDetails/");


  const [crimes, setCrimes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/crimeDetails")
      .then(res => setCrimes(res.data))
      .catch(err => console.error("Error fetching crimes:", err));
  }, []);

  return (
    
      <div className="App">
        <Header1/>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/admin" element={<Admindb />}>
          <Route index element={<Overview />} />
          <Route path="crimeDetails" element={<CrimeDetails />} />
          <Route path="crimeDetails/:id" element={<ReportDetails />} />
          
        </Route>


          <Route path="/crimeMap" element={<CrimeMap />} />
          <Route path="/crimeMap2" element={<CrimeMap2 />} />
          <Route path="/locationList" element={<LocationList />} />
          <Route path="/locationListUser" element={<LocationListUser />} />
          <Route path="/addLocation" element={<LocationForm />} />


          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminuserlist" element={<AdminUserList />} />
          <Route path="/userprofile/:email" element={<AdminUserProfile />} />


          



          <Route path="/newreport" element={<Report />} />
          <Route path="/crimeDetails/:id" element={<ReportDetails />} />
          
        </Routes>
      </div>
  
  );
}

export default App;
