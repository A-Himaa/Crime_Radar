import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import backgroundvid from "../Images/background.mp4";
import axios from "axios"; // Ensure axios is installed
import { useNavigate } from "react-router-dom"; // Import useNavigate

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

  // Handle input change for both forms
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
      !userDetails.firstName || !userDetails.lastName || !userDetails.email || !userDetails.password
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
  
    // Clean up the userDetails (remove confirmPassword before sending to the backend)
    const { confirmPassword, ...cleanedUserDetails } = userDetails;
  
    // Log cleaned user details and trusted person details for debugging
    console.log("Cleaned user details:", cleanedUserDetails);
    console.log("Trusted person details:", trustedPersonDetails);
  
    // Prepare data to send to the backend
    const dataToSend = {
      userDetails,
      trustedPersonDetails,
      primaryKey: userDetails.email, // Email as primary key
    };
  
    console.log("Sending data to backend:", dataToSend);
  
    try {
      const response = await axios.post(
        "http://localhost:8070/auth/signup",
        dataToSend
      );
      console.log("Form submitted successfully:", response.data);
      alert("Signup successful!");
      navigate("/login"); // Redirect to login page

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="relative flex justify-center items-center h-full bg-black">
     {/* Video Background */}
           <div className="absolute top-0 left-0 w-full h-full">
             <video autoPlay loop muted className="w-full h-full object-cover blur-[14px]">
               <source src={backgroundvid} type="video/mp4" />
               Your browser does not support the video tag.
             </video>
           </div> 

      <div className="relative bg-white p-8 rounded-lg shadow-lg w-[600px] z-10 mt-[20vh] mb-[5vh]">
        <h2 className="text-4xl font-bold text-center mb-2">
          {showTrustedForm ? ("Trusted Person Details") : (
            <> <span className="text-amber-600">S</span>ign <span className="text-amber-600">U</span>p</>
          )}
        </h2>
        <p className="text-center text-xl text-gray-600 mb-4">
          {showTrustedForm ? "" : "Welcome to Crime Radar..!"}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">
                First Name <span className="text-red-700">*</span>
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
              <label className="block text-gray-700">
                Last Name <span className="text-red-700">*</span>
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

          <label className="block text-gray-700 mt-4">
            E-mail <span className="text-red-700">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={
              showTrustedForm ? trustedPersonDetails.email : userDetails.email
            }
            onKeyDown={(e) => {
              const key = e.key;
              const isEmailLetter = /^[a-zA-Z0-9._+@-]$/.test(key);
              const isBackspace = key === "Backspace";
              const isValid = isBackspace || isEmailLetter;
            }}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-gray-300 border border-white/30 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required={!showTrustedForm}
          />
          {/* Phone number------------------------------------------------- */}
          <label className="block text-gray-700 mt-4">
            Phone <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="phone"
            onKeyDown={(e) => { 
              const key = e.key;
              const isDigit = /^[0-9]$/.test(key);
              const isBackspace = key === "Backspace";
              const isValid = isBackspace || isDigit;
              if (!isValid) {
                e.preventDefault();
              }
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


          {/* NIC-------------------------------------------------------- */}
          <label className="block text-gray-700 mt-4">
            NIC <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="nic"
            onKeyDown={(e) => {
              const key = e.key;
              const isnicDigit = /^[0-9Vv]$/.test(key);
              const isBackspace = key === "Backspace";
              const isValid = isBackspace || isnicDigit;
              if (!isValid) {
                e.preventDefault();
              }
            }}
            value={showTrustedForm ? trustedPersonDetails.nic : userDetails.nic}
            onChange={handleInputChange}
            placeholder="19858788965 / 855478947V"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />

          {!showTrustedForm && (
            <>
              <label className="block text-gray-700 mt-4">
                Password <span className="text-red-700">*</span>
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
