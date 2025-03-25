import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Importing Header
import Header1 from "./Components/header";
import Home from "./Components/home";


//Import Location Related Files
import CrimeMap from "./Components/CrimeMap";
import LocationForm from "./Components/LocationForm";


function App() {
  return (
    <Router>
      <div className="App">
        <Home />
        <Header1/>
        <CrimeMap />
        
        
        
        
      {/* <Routes>
        <Route path="/home" element={<Home />} />
      </Routes> */}
      
      
      </div>
    </Router>
    
  );
}

export default App;