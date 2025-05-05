import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/Logo.png";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in
  const [userEmail, setUserEmail] = useState(""); // State for user email
  const navigate = useNavigate();

  // Check if the user is logged in (i.e. userEmail is saved in localStorage)
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail"); // Retrieve the email from localStorage
    if (storedEmail) {
      setUserEmail(storedEmail); // Set user email from localStorage
      setIsLoggedIn(true); // Set user as logged in if userEmail exists in localStorage
    }

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); // Only run when `lastScrollY` changes

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("userEmail"); // Remove email from localStorage
    setIsLoggedIn(false); // Update state to reflect logout
    window.location.href = "/login"; // Redirect to login page (optional)
  };

  // Handle navigation for tabs other than Home if not logged in
  const handleNavigation = (e, path) => {
    if (!isLoggedIn && path !== "/") { // Prevent navigation to other pages if not logged in
      e.preventDefault(); // Prevent default behavior
      const confirmLogin = window.confirm("You must log in to access this page. Would you like to log in?");
      if (confirmLogin) {
        navigate("/login"); // Redirect to login page
      }
    }
  };

  return (
    <header
      className={`fixed top-2 left-1/2 transform -translate-x-1/2 w-[80vw] h-[13vh] rounded-3xl bg-gray-950 bg-opacity-65 backdrop-blur-md z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="h-[15vh] flex justify-between mx-auto mr-8 ml-8">
        {/* Logo */}
        <a href="/" onClick={(e) => handleNavigation(e, "/")}>
          <img src={logo} alt="Logo" className="w-28 pt-2" />
        </a>

        {/* Navigation Links */}
        <div className="flex space-x-10 text-white text-lg items-center">
          <a
            href="/"
            className="hover:underline transition-all duration-500"
            onClick={(e) => handleNavigation(e, "/")}
          >
            HOME
          </a>
          <a
            href="/newreport"
            className="hover:underline transition-all duration-300"
            onClick={(e) => handleNavigation(e, "/newreport")}
          >
            QUICK REPORT
          </a>
          <a
            href="#"
            className="hover:underline transition-all duration-300"
            onClick={(e) => handleNavigation(e, "/stayaware")}
          >
            STAY AWARE
          </a>
          <a href="/locationList" className="hover:underline transition-all duration-300">
            INSIGHTS
          </a>

          {/* Conditionally render the "PROFILE" tab */}
          {userEmail !== "admin@example.com" && (
            <a
              href="/profile"
              className="hover:underline transition-all duration-300"
              onClick={(e) => handleNavigation(e, "/profile")}
            >
              PROFILE
            </a>
          )}

          {/* Conditional Login/Logout Button */}
          {!isLoggedIn ? (
            <a href="/login">
              <button className="border-2 p-2 px-10 hover:bg-amber-600 hover:text-white transition-colors duration-300 rounded-lg">
                LOGIN
              </button>
            </a>
          ) : (
            <button
              onClick={handleLogout}
              className="border-2 p-2 px-10 hover:bg-red-600 hover:text-white transition-colors duration-300 rounded-lg"
            >
              LOGOUT
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
