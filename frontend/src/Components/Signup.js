import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import backgroundvid from "../Images/background.mp4";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    const validateName = (val) => /^[A-Za-z]*$/.test(val);
    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const validatePhone = (val) => /^[0-9]{0,10}$/.test(val);
    const validateNIC = (val) => /^[0-9]{0,10}[Vv]?$/.test(val);

    let isValid = true;

    if (["firstName", "lastName"].includes(name)) {
      isValid = validateName(value);
    } else if (name === "email") {
      isValid = validateEmail(value) || value === ""; // allow empty until submit
    } else if (name === "phone") {
      isValid = validatePhone(value);
    } else if (name === "nic") {
      isValid = validateNIC(value);
    }

    if (!isValid) return;

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
    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.email ||
      !userDetails.password
    ) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setShowTrustedForm(true);
  };

  const handleBackClick = () => {
    setShowTrustedForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    const { firstName, lastName, email, phone, nic } = trustedPersonDetails;

    if (!firstName || !lastName || !email || !phone || !nic) {
      alert("Please fill in all Trusted Person fields.");
      return;
    }

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      alert("Trusted person's names must contain only letters.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address for the trusted person.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Trusted person's phone number must be exactly 10 digits.");
      return;
    }

    const dataToSend = {
      userDetails,
      trustedPersonDetails,
    };

    try {
      const response = await axios.post(
        "http://localhost:8070/user/signup",
        dataToSend
      );
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Signup failed. Please try again.");
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

      <div className="relative bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[600px] z-10 mt-[20vh] mb-[5vh] border border-white/20">
        <h2 className="text-4xl font-bold text-center mb-2 text-white drop-shadow">
          {showTrustedForm ? (
            "Trusted Person Details"
          ) : (
            <>
              {" "}
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
                  showTrustedForm
                    ? trustedPersonDetails.firstName
                    : userDetails.firstName
                }
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-gray-300 border border-white/30 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
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
                  showTrustedForm
                    ? trustedPersonDetails.lastName
                    : userDetails.lastName
                }
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-gray-300 border border-white/30 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <label className="block text-white font-medium mt-4">
            E-mail <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={
              showTrustedForm ? trustedPersonDetails.email : userDetails.email
            }
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-gray-300 border border-white/30 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required={!showTrustedForm}
          />

          <label className="block text-white font-medium mt-4">
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="phone"
            onKeyDown={(e) => {
              const key = e.key;
              const isDigit = /^[0-9]$/.test(key);
              const isBackspace = key === "Backspace";
              if (!isBackspace && !isDigit) e.preventDefault();
            }}
            minLength={10}
            maxLength={10}
            value={
              showTrustedForm ? trustedPersonDetails.phone : userDetails.phone
            }
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-gray-300 border border-white/30 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />

          <label className="block text-white font-medium mt-4">
            NIC <span className="text-red-400">*</span>
          </label>
          <input
  type="text"
  name="nic"
  value={showTrustedForm ? trustedPersonDetails.nic : userDetails.nic}
  onChange={handleInputChange}
  onKeyDown={(e) => {
    const key = e.key;
    const value = (showTrustedForm ? trustedPersonDetails.nic : userDetails.nic) || "";

    // Allow Backspace and arrow keys
    const isBackspace = key === "Backspace";
    const isArrow = key.includes("Arrow") || key === "Tab" || key === "Delete";
    if (isBackspace || isArrow) return;

    // First 9 characters must be digits
    if (value.length < 9 && !/^[0-9]$/.test(key)) {
      e.preventDefault(); // Only digits allowed for the first 9 characters
    }

    // If the 10th character is a digit, allow up to 12 characters
    else if (value.length === 9 && /^[0-9]$/.test(key)) {
      if (value.length === 9) {
        // Allow digits for the 10th character and the next characters (11th and 12th)
        if (value.length < 12 && /^[0-9]$/.test(key)) {
          // Allow max 12 characters if 10th is a digit
        }
      }
    }

    // If the 10th character is V/v, allow only 10 characters
    else if (value.length === 9 && /^[Vv]$/.test(key)) {
      if (value.length === 9) {
        // If 10th character is V/v, stop at 10th character
        if (value.length < 10 && /^[Vv]$/.test(key)) {
          // Allow max 10 characters if 10th is V/v
        }
      }
    }

    // Prevent any invalid character input
    else if (value.length > 12) {
      e.preventDefault();
    }
  }}
  maxLength={showTrustedForm ? (trustedPersonDetails.nic.length === 9 ? 10 : 12) : (userDetails.nic.length === 9 ? 10 : 12)}
  className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-gray-300 border border-white/30 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
  required
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
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-gray-300 border border-white/30 rounded-lg mt-1 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
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
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-gray-300 border border-white/30 rounded-lg mt-1 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
                <span
                  className="absolute right-3 top-3 text-gray-300 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
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
