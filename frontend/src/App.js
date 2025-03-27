import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Importing Header
import Header1 from "./Components/header";
import Home from "./Components/home";

//Crime Report
import Report from "./Components/Report.js";
import LocationList from "./Components/LocationList";
import CrimeMap from "./Components/CrimeMap";
import LocationForm from "./Components/LocationForm.jsx";
import Login from "./Components/Login.js";
import Signup from "./Components/Signup.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Header1/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crimeMap" element={<CrimeMap />} />
          <Route path="/locationList" element={<LocationList />} />
          <Route path="/addLocation" element={<LocationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/newreport" element={<Report />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;