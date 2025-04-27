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
import UpdateLocation from "./Components/UpdateLocation.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Header1/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crimeMap" element={<CrimeMap />} />
          <Route path="/locationList" element={<LocationList />} />
          <Route path="/locationListUser" element={<LocationListUser />} />
          <Route path="/addLocation" element={<LocationForm />} />
          <Route path="/updateLocation/:id" element={<UpdateLocation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addarticle" element={<AddArticle />} />
          <Route path="/articles" element={<ViewArticles />} />
          <Route path="/updatearticle/:id" element={<EditArticle />} />
          <Route path="/awareadmin" element={<AwareAdminMain />} />
          <Route path="/violence" element={<ViolentCrimes />} />
          <Route path="/cyber" element={<CyberCrimes />} />
          <Route path="/property" element={<PropertyCrimes />} />
          <Route path="/drug" element={<DrugRelatedCrimes />} />
          <Route path="/robbery" element={<RobberyCrimes />} />
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