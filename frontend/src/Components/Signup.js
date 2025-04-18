import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import backgroundvid from "../Images/background.mp4";
import axios from "axios"; // Ensure axios is installed
import { useNavigate } from "react-router-dom"; // Import useNavigate


const Signup = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTrustedForm, setShowTrustedForm] = useState(false);

  // User details state
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    password: "",
    confirmPassword: "",
  });

  // Trusted Person details state
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

  // Move to the second form (Trusted Person Details)
  const handleNextClick = (e) => {
    e.preventDefault();
    if (!userDetails.email || !userDetails.password || !userDetails.confirmPassword) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setShowTrustedForm(true);
  };

  // Go back to the user details form
  const handleBackClick = () => {
    setShowTrustedForm(false);
  };

  // Submit both forms together
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine both forms using user email as the primary key
    const dataToSend = {
      userDetails,
      trustedPersonDetails,
      primaryKey: userDetails.email, // Email as primary key
    };

    console.log("Sending data to backend:", dataToSend); // Add logging here to check data

    try {
      const response = await axios.post("http://localhost:8070/auth/signup", dataToSend); // Ensure the correct URL
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
        <h2 className="text-5xl font-bold text-center mb-2">
          {showTrustedForm ? ("Trusted Person Details") : (
            <> <span className="text-amber-600 text-5xl">S</span>ign <span className="text-amber-600 text-5xl">U</span>p</>
          )}
        </h2>
        <p className="text-center text-xl text-gray-600 mb-4">
          {showTrustedForm
            ? ""
            : "Welcome to Crime Radar..!"}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name <span className="text-red-700">*</span></label>
              <input
                type="text"
                name="firstName"
                value={
                  showTrustedForm
                    ? trustedPersonDetails.firstName
                    : userDetails.firstName
                }
                onChange={handleInputChange}
                placeholder=""
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name <span className="text-red-700">*</span></label>
              <input
                type="text"
                name="lastName"
                value={
                  showTrustedForm
                    ? trustedPersonDetails.lastName
                    : userDetails.lastName
                }
                onChange={handleInputChange}
                placeholder="Smith"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
          </div>

          <label className="block text-gray-700 mt-4">E-mail <span className="text-red-700">*</span></label>
          <input
            type="email"
            name="email"
            value={
              showTrustedForm ? trustedPersonDetails.email : userDetails.email
            }

            onKeyDown={(e) => {
              const key = e.key;
              const isEmailLetter = /^[a-zA-Z0-9._+@-]$/.test(key)
              const isBackspace = key === 'Backspace';
              const isValid = isBackspace || isEmailLetter;

            }}
            onChange={handleInputChange}
            placeholder="example@gmail.com"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required={!showTrustedForm} // Required only in the first form
          />
          {/* Phone number------------------------------------------------- */}
          <label className="block text-gray-700 mt-4">Phone <span className="text-red-700">*</span></label>
          <input
            type="text"
            name="phone"
            onKeyDown={(e) => { 
              const key = e.key;
              const isDigit =  /^[0-9]$/.test(key);
                            const isBackspace = key === 'Backspace';
                            const isValid = isBackspace || isDigit;
                            if(!isValid){
                                e.preventDefault();
                            }
            }}  
            minLength={10}
            maxLength={10}

            value={
              showTrustedForm ? trustedPersonDetails.phone : userDetails.phone
            }
            onChange={handleInputChange}
            placeholder="077-1234567"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />


          {/* NIC-------------------------------------------------------- */}
          <label className="block text-gray-700 mt-4">NIC <span className="text-red-700">*</span></label>
          <input
            type="text"
            name="nic"
            onKeyDown={(e) => {
              const key = e.key;
              const isnicDigit = /^[0-9Vv]$/.test(key);
              const isBackspace = key === 'Backspace';
              const isValid = isBackspace || isnicDigit;
              if(!isValid){
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
              <label className="block text-gray-700 mt-4">Password <span className="text-red-700">*</span></label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userDetails.password}
                  onChange={handleInputChange}
                  placeholder="********"
                  className="w-full p-2 border border-gray-300 rounded mt-1 pr-10"
                  required
                />
                <span
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              <label className="block text-gray-700 mt-4">
                Confirm Password <span className="text-red-700">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={userDetails.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="********"
                  className="w-full p-2 border border-gray-300 rounded mt-1 pr-10"
                  required
                />
                <span
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
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

          <div className="mt-4 flex justify-between">
            {!showTrustedForm ? (
              <div className="flex justify-end w-full">
                <button
                  onClick={handleNextClick}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded mr-5"
                >
                  Next
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleBackClick}
                  className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded mr-5"
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
