import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Import icons
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import backgroundvid from "../Images/background.mp4";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate(); // Hook to navigate

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login data to the backend
      const response = await axios.post("http://localhost:8070/auth/login", {
        email,
        password,
      });

      // If login is successful, handle the response
      if (response.data.success) {
        // Check if the credentials match the admin credentials
        if (email === "admin@example.com" && password === "admin123") {
          navigate("/admin"); // Redirect to admin page
        } else {
          navigate("/home"); // Redirect to home page for normal users
        }
      }
    } catch (error) {
      // Handle errors if login fails (e.g., invalid credentials)
      console.error("Login error", error);
      setErrorMessage("Invalid email or password.");
      setTimeout(() => {
        setErrorMessage(""); // This will hide the error message after 4 seconds
      }, 4000);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-black overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <video autoPlay loop muted className="w-full h-full object-cover blur-[14px]">
          <source src={backgroundvid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Form Container */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-96 z-10">
        <h2 className="text-5xl font-bold text-center mb-2">Login</h2>
        <p className="text-center text-xl text-gray-600 mb-4">Welcome Back! Login to get started</p>

        {/* Error message */}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700">Username</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="example@gmail.com"
            className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
          />

          <label className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="********"
              className="w-full p-2 border border-gray-300 rounded mt-1 pr-10"
            />
            <span
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="text-right text-sm text-blue-600 mt-2 cursor-pointer">
            Forgot Password?
          </div>

          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded mr-5">
            Login
          </button>
        </form>

        {/* <p className="text-center mt-4 text-sm">
          Not registered yet? <span onClick={() => navigate("/signup")} className="text-blue-600 cursor-pointer">Create an Account</span>
        </p> */}
        <p className="text-center mt-4 text-sm">Not registered yet ? <a href="/signup" className="text-blue-600 ">Create an account</a></p>
      </div>
    </div>
  );
};

export default Login;
