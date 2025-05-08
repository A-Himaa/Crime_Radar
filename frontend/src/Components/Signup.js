import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import backgroundvid from "../Images/background.mp4";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Email validation helper
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// NIC validation helper
const isValidNIC = (nic) =>
  /^(\d{9}[vVxX]|\d{12})$/.test(nic);

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTrustedForm, setShowTrustedForm] = useState(false);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    password: "",
    confirmPassword: "",
  });

  const [trustedPersonDetails, setTrustedPersonDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (["firstName", "lastName"].includes(name)) {
      if (!/^[A-Za-z]*$/.test(value)) return;
    }

    if (name === "phone") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    if (showTrustedForm) {
      setTrustedPersonDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setUserDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, nic, password, confirmPassword } = userDetails;

    if (!firstName || !lastName || !email || !phone || !nic || !password || !confirmPassword) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Invalid email address.");
      return;
    }

    if (!isValidNIC(nic)) {
      alert("Invalid NIC format.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setShowTrustedForm(true);
  };

  const handleBackClick = () => {
    setShowTrustedForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, nic } = trustedPersonDetails;

    if (!firstName || !lastName || !email || !phone || !nic) {
      alert("Please fill in all Trusted Person fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Invalid Trusted Person email address.");
      return;
    }

    if (!isValidNIC(nic)) {
      alert("Invalid Trusted Person NIC format.");
      return;
    }

    const dataToSend = {
      userDetails,
      trustedPersonDetails,
    };

    try {
      await axios.post("http://localhost:8070/user/signup", dataToSend);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="relative flex justify-center items-center h-full bg-black">
      <div className="absolute top-0 left-0 w-full h-full">
        <video autoPlay loop muted className="w-full h-full object-cover blur-[14px]">
          <source src={backgroundvid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="relative bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[600px] z-10 mt-[20vh] mb-[5vh] border border-white/20">
        <h2 className="text-4xl font-bold text-center mb-2 text-white drop-shadow">
          {showTrustedForm ? "Trusted Person Details" : (
            <>
              <span className="text-amber-600">S</span>ign{" "}
              <span className="text-amber-600">U</span>p
            </>
          )}
        </h2>
        <p className="text-center text-lg text-gray-200 mb-4">
          {showTrustedForm ? "" : "Welcome to Crime Radar..!"}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium">
                First Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={
                  showTrustedForm ? trustedPersonDetails.firstName : userDetails.firstName
                }
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-white font-medium">
                Last Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={
                  showTrustedForm ? trustedPersonDetails.lastName : userDetails.lastName
                }
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg mt-1"
              />
            </div>
          </div>

          <label className="block text-white font-medium mt-4">
            E-mail <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={showTrustedForm ? trustedPersonDetails.email : userDetails.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg mt-1"
          />

          <label className="block text-white font-medium mt-4">
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={showTrustedForm ? trustedPersonDetails.phone : userDetails.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg mt-1"
          />

          <label className="block text-white font-medium mt-4">
            NIC <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="nic"
            value={showTrustedForm ? trustedPersonDetails.nic : userDetails.nic}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg mt-1"
          />

          {!showTrustedForm && (
            <>
              <label className="block text-white font-medium mt-4">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userDetails.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg mt-1 pr-10"
                />
                <span
                  className="absolute right-3 top-3 text-gray-300 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              <label className="block text-white font-medium mt-4">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={userDetails.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg mt-1 pr-10"
                />
                <span
                  className="absolute right-3 top-3 text-gray-300 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </>
          )}

          <div className="mt-6 flex justify-between">
            {!showTrustedForm ? (
              <div className="flex justify-end w-full">
                <button
                  onClick={handleNextClick}
                  className="bg-amber-600 hover:bg-amber-700 transition-colors text-white font-semibold py-2 px-5 rounded-lg shadow-md"
                >
                  Next
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleBackClick}
                  className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-5 py-2 rounded-lg"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 transition-colors text-white font-semibold py-2 px-5 rounded-lg shadow-md"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
