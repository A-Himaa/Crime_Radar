import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Importing Header
import Header1 from "./Components/header";
import Home from "./Components/home";

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
import CrimeYearLineChart from "./Components/CrimeYearLineChart.jsx";
import CrimeTypePieChart from "./Components/CrimeTypePieChart.jsx";
import CrimeDashboard from "./Components/CrimeDashboard.jsx";
import CrimeMap2 from "./Components/CrimeMap2.js";



function App() {
  return (
    <Router>
      <div className="App">
        <Header1/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crimeMap" element={<CrimeMap />} />
          <Route path="/crimeMap2" element={<CrimeMap2 />} />
          <Route path="/locationList" element={<LocationList />} />
          <Route path="/locationListUser" element={<LocationListUser />} />
          <Route path="/addLocation" element={<LocationForm />} />
          <Route path="/updateLocation/:id" element={<UpdateLocation />} />
          <Route path="/crimeDashboard" element={<CrimeDashboard />} />
          <Route path="/lineChart" element={<CrimeYearLineChart />} />
          <Route path="/pieChart" element={<CrimeTypePieChart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/newreport" element={<Report />} />
          <Route path="/crimeDetails" element={<CrimeDetails />} />
          <Route path="/crimeDetails/:id" element={<ReportDetails />} />
          
        </Routes>
      </div>
    </Router> 
  );
}

export default App;