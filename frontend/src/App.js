import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Importing Header
import Header1 from "./Components/header";
import Home from "./Components/home";

//Crime Report
import Report from "./Components/Report.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Header1/>
      </div>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newreport" element={<Report />} />
      </Routes>


    </Router> 
  );
}

export default App;