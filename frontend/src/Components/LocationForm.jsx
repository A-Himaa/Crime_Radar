import { useState } from "react";
import axios from "axios";

const LocationForm = () => {
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");


// Function to get location using Geolocation API
const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/locations/newLocation", {
        location,
        latitude,
        longitude,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error saving location:", error);
      alert("Failed to save location.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Get Your Location</h2>
      <button
        onClick={getLocation}
        className="w-full py-2 mb-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
      >
        Get Location
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Enter the location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-4">
          <input
            type="text"
            value={latitude}
            placeholder="Latitude (N)"
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={longitude}
            placeholder="Longitude (E)"
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
        >
          Save Location
        </button>
      </form>
    </div>
  );
};

export default LocationForm;