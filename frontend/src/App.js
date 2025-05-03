import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

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
import ReportDetails from "./Components/reportDetails.js";

import LocationForm from "./Components/LocationForm.jsx";
import Login from "./Components/Login.js";
import Signup from "./Components/Signup.js";
import Profile from "./Components/Profile.js";
import UpdateLocation from "./Components/UpdateLocation.jsx";



function App() {
  const location = useLocation();
  const path = location.pathname;

  const hideHeader =
  path.startsWith("/admin") || path === "/crimeDetails" || path.startsWith("/crimeDetails/");



  return (
    <>
      {!hideHeader && <Header1 />}

        <div className="App">
        
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/admin" element={<Admindb />}>
          <Route index element={<Overview />} />
          <Route path="crimeDetails" element={<CrimeDetails />} />
          <Route path="crimeDetails/:id" element={<ReportDetails />} />
        </Route>


          <Route path="/crimeMap" element={<CrimeMap />} />
          <Route path="/locationList" element={<LocationList />} />
          <Route path="/locationListUser" element={<LocationListUser />} />
          <Route path="/addLocation" element={<LocationForm />} />
          <Route path="/updateLocation/:id" element={<UpdateLocation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/newreport" element={<Report />} />
          <Route path="/crimeDetails/:id" element={<ReportDetails />} />
          
        </Routes>
      </div>
    
    </>
  );
}

export default App;