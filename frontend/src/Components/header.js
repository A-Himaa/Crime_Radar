import { useState, useEffect } from "react";
import logo from "../Images/Logo.png";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
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
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-2 left-1/2 transform -translate-x-1/2 w-[80vw] h-[13vh] rounded-3xl bg-gray-950 bg-opacity-65 backdrop-blur-md z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>

      <nav className="h-[15vh] flex justify-between mx-auto mr-8 ml-8">

        {/* Logo */}
        <a href="/">
          <img src={logo} alt="Logo" className="w-28 pt-2" />
        </a>

        {/* Navigation Links */}
        <div className="flex space-x-10 text-white text-lg items-center">
          <a href="/" className="hover:underline transition-all duration-500">
            HOME
          </a>
          <a href="/newreport" className="hover:underline transition-all duration-300">
            QUICK REPORT
          </a>
          <a href="#" className="hover:underline transition-all duration-300">
            STAY AWARE
          </a>
          <a href="/locationList" className="hover:underline transition-all duration-300">
            INSIGHTS
          </a>

          {/* Login Button */}
          <a href="/login">
            <button className="border-2 p-2 px-10 hover:bg-amber-800 hover:text-white transition-colors duration-300 rounded-lg">
              LOGIN
            </button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
