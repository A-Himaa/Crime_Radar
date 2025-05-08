import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Importing icons
import axios from "axios"; // Importing axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate for routing
import backgroundvid from "../Images/background.mp4"; // Video background

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate(); // Navigate hook for routing

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(""); // Reset error message before submitting
    console.log("Submitting login request:", { email, password });

    try {
      // Send login request to the server
      const response = await axios.post("http://localhost:8070/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      if (response.data.success) {
        setErrorMessage("Login successful!"); // Success message
        // Store JWT token, user email, and role in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("role", response.data.role);

        // Navigate based on user role
        setTimeout(() => {
          if (response.data.role === "admin") {
            navigate("/admin"); // Redirect admin to admin page
          } else {
            navigate("/profile"); // Redirect user to profile page
          }
        }, 2000);
      } else {
        setErrorMessage("Unexpected error! Please try again."); // Show error message for any other failure
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setErrorMessage("Invalid email or password."); // Show error message if login fails

      setTimeout(() => {
        setErrorMessage(""); // Clear error message after a while
      }, 2000);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-full bg-black">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover blur-[14px]"
        >
          <source src={backgroundvid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Form Container */}
      <div className="relative bg-white/30 backdrop-blur-lg p-8 rounded-lg shadow-lg w-96 z-10 mt-[20vh] mb-[19vh] border border-white/20">
        <h2 className="text-5xl font-bold text-center mb-2">
          <span className="text-amber-600">L</span>ogin
        </h2>
        <p className="text-center text-xl text-black mb-4">Welcome Back! Login to get started</p>

        {/* Error message */}
        {errorMessage && (
          <p className="text-green-400 font-bold text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block text-black">Username</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="example@gmail.com"
            className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-gray-300 border border-white/30 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <label className="block text-black">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="***********"
              className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-gray-300 border border-white/30 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <span
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="text-right text-sm text-blue-300 mt-2 cursor-pointer p-2">
            Forgot Password?
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold py-2 px-4 rounded-lg mr-5 transition-all shadow-lg hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Not registered yet?{" "}
          <a href="/signup" className="text-blue-300">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
