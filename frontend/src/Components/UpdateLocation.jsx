import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateLocation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [locationName, setLocationName] = useState("");
  const [coordinates, setCoordinates] = useState(["", ""]);

  // Fetch existing data
  useEffect(() => {
    axios.get(`http://localhost:8070/locations/getLocation/${id}`)
      .then((res) => {
        const location = res.data.locationData;
        setLocationName(location.locationName);
        setCoordinates([
          location.coordinates[0].toString(),
          location.coordinates[1].toString()
        ]);
      })
      .catch((err) => {
        console.error("Error fetching location: ", err);
        alert("Error fetching location data ⛔");
      });
  }, [id]);

  // Update coordinates using Geolocation API
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Updated Coordinates:", position.coords.latitude, position.coords.longitude);
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

  // Send updated data
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!coordinates[0] || !coordinates[1]) {
      alert("Please get the location before updating. *️⃣");
      return;
    }

    const updatedLocation = {
      locationName,
      latitude: parseFloat(coordinates[0]),
      longitude: parseFloat(coordinates[1])
    };

    axios.put(`http://localhost:8070/locations/updateLocation/${id}`, updatedLocation)
      .then(() => {
        alert("Location updated successfully ✅");
        navigate("/locationList");
      })
      .catch((err) => {
        console.error("Update failed: ", err);
        alert("Failed to update location ⛔");
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Update Location</h2>

        <button
          onClick={getLocation}
          className="w-full py-2 mb-4 bg-gray-500 text-white font-semibold rounded hover:bg-gray-800 transition"
        >
          Get Current Location
        </button>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter the location"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex space-x-4">
            <input
              type="text"
              value={coordinates[0]}
              placeholder="Latitude (N)"
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={coordinates[1]}
              placeholder="Longitude (E)"
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-amber-500 text-white font-semibold rounded hover:bg-amber-600 transition"
          >
            Update Location
          </button>
        </form>

        <button
          className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/locationList")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UpdateLocation;
