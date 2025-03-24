import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


//Importing Header
import Header1 from "./Components/header";
import Home from "./Components/home";
import CrimeMap from "./Components/CrimeMap";

function App() {
  return (
    <Router>
      <div className="App">
        <Home />
        <Header1/>

      {/* <Routes>
        <Route path="/home" element={<Home />} />
      </Routes> */}
      <Routes>
        <Route path="/riskScope" element={<CrimeMap/>} />
      </Routes>
      
      </div>
    </Router>
    
  );
}

export default App;