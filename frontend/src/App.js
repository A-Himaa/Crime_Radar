import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Importing Header
import Header1 from "./Components/header";
import Home from "./Components/home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Home />
        <Login/>
        <Signup/>
        <Profile/>
        <Header1 />
        
        
        {/* <Routes>
        <Route path="/home" element={<Home />} />
      </Routes> */}
      </div>
    </Router>
  );
}

export default App;
