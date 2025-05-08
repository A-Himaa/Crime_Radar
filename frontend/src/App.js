import {Route, Routes, useLocation } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';


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
import ViewDetails from "./Components/viewDetails.js";
import UpdateCrimeReport from "./Components/updateReport.js";

import AddArticle from "./Components/AddArticle.js";
import ViewArticles from './Components/ViewArticles.js';
import EditArticle from "./Components/EditArticle.js";
import AwareAdminMain from "./Components/AwareAdminMain.js";
import ViolentCrimes from "./Components/ViolentCrimes.js";
import CyberCrimes from "./Components/CyberCrimes.js";
import PropertyCrimes from "./Components/PropertyCrimes.js";
import DrugRelatedCrimes from "./Components/DrugRelatedCrimes.js";
import RobberyCrimes from "./Components/RobberyCrimes.js";

import ReportDetails from "./Components/reportDetails.js";


import LocationForm from "./Components/LocationForm.jsx";
import Login from "./Components/Login.js";
import Signup from "./Components/Signup.js";
import Profile from "./Components/Profile.js";
import AdminUserProfile from "./Components/AdminUserProfile.js";


import AdminUserList from "./Components/AdminUserList.js";

import UpdateLocation from "./Components/UpdateLocation.jsx";
import CrimeYearLineChart from "./Components/CrimeYearLineChart.jsx";
import CrimeTypePieChart from "./Components/CrimeTypePieChart.jsx";
import CrimeDashboard from "./Components/CrimeDashboard.jsx";
import CrimeMap2 from "./Components/CrimeMap2.js";

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
          <Route path="/addarticle" element={<AddArticle />} />
          <Route path="/articles" element={<ViewArticles />} />
          <Route path="/updatearticle/:id" element={<EditArticle />} />
          <Route path="/admin/awareadmin" element={<AwareAdminMain />} />
          <Route path="/violence" element={<ViolentCrimes />} />
          <Route path="/cyber" element={<CyberCrimes />} />
          <Route path="/property" element={<PropertyCrimes />} />
          <Route path="/drug" element={<DrugRelatedCrimes />} />
          <Route path="/robbery" element={<RobberyCrimes />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminuserlist" element={<AdminUserList />} />
          <Route path="/adminuserprofile/:email" element={<AdminUserProfile />} />

          



          <Route path="/newreport" element={<Report />} />
          <Route path="/crimeDetails/:id" element={<ReportDetails />} />
          <Route path="/view/:id" element={<ViewDetails />} />
          <Route path="/updateCrime/:id" element={<UpdateCrimeReport />} />

        </Routes>
      </div>
    
    </>
  );
}

export default App;