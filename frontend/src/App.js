import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Importing Header
import Header1 from "./Components/header";
import Home from "./Components/home";


import LocationList from "./Components/LocationList";
import CrimeMap from "./Components/CrimeMap";


function App() {
  return (
    <Router>
      <div className="App">
        <Header1/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crimeMap" element={<CrimeMap />} />
          <Route path="/locationList" element={<LocationList />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;