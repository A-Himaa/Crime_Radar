import { useState } from "react";
import axios from "axios";

function LocationForm({ onClose }) {
  const [locationName, setLocationName] = useState("");
  const [coordinates, setCoordinates] = useState(["",""]);
  

  // Function to get location using Geolocation API
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Fetched Coordinates:", position.coords.latitude, position.coords.longitude);
          setCoordinates([
            position.coords.latitude.toString(), 
            position.coords.longitude.toString()
          ]);
        },
        (error) => {
          console.error("Error getting location: ⛔", error);
          alert("Unable to retrieve location. ⛔");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. ⛔");
    }
  };

  // Function to send location data
  function sendLocation(e) {
    e.preventDefault();

    if(!coordinates[0] || !coordinates[1]){
      alert("Please get the location before submitting. *️⃣");
      return;
    }

    const formattedCoordinates = [
      parseFloat(coordinates[0]), 
      parseFloat(coordinates[1])
    ];

    const newLocation = {
      locationName, // Correcting the reference
      coordinates: formattedCoordinates,
    };

    console.log("Sending Data: ", newLocation); //Debugging

    axios.post("http://localhost:8070/locations/addLocation", newLocation)
      .then(() => {
        alert("Location Added ✅");
        onClose();
      })
      .catch((err) => {
        alert("Failed to save location ⛔");
        console.error(err);
      });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700"> New Location </h2>

            <button onClick={getLocation} className="w-full py-2 mb-4 bg-gray-500 text-white font-semibold rounded hover:bg-gray-800 transition"> Get Location </button>
            
            <form onSubmit={sendLocation} className="space-y-4">
                <div>
                  <input type="text" placeholder="Enter the location" value={locationName} onChange={(e) => setLocationName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>

                <div className="flex space-x-4">
                  <input type="text" value={coordinates[0]} placeholder="Latitude (N)" readOnly className="w-full px-4 py-2 border border-gray-300 rounded-lg"/>
                  <input type="text" value={coordinates[1]} placeholder="Longitude (E)" readOnly className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>

                <button type="submit" className="w-full py-2 bg-amber-500 text-white font-semibold rounded hover:bg-amber-600 transition">
                  Save Location
                </button>
            </form>

            <button className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}> Close </button>
        </div>
    </div>
  );
}

export default LocationForm;
