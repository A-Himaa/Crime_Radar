import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Importing Header
import Header1 from "./Components/header";
import Home from "./Components/home";



function App() {
  return (
    <Router>
      <div className="App">
        <Home />
        <Header1/>
      </div>
    </Router> 
  );
}

export default App;