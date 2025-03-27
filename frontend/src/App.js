import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Importing Header
import Header1 from "./Components/header";
import Home from "./Components/home";

//Crime Report
import Report from "./Components/Report.js";
import LocationList from "./Components/LocationList";
import CrimeMap from "./Components/CrimeMap";
import CrimeDetails from "./Components/crimeDetails.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Header1/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crimeMap" element={<CrimeMap />} />
          <Route path="/locationList" element={<LocationList />} />
          <Route path="/newreport" element={<Report />} />
          <Route path="/crimedetails" element={<CrimeDetails />} />
        </Routes>
      </div>





    </Router> 
  );
}

export default App;