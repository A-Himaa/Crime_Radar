import { useState, useEffect } from "react";
import axios from "axios";

const LocationList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/locations")
      .then(response => setLocations(response.data))
      .catch(error => console.error("Error fetching locations:", error));
  }, []);

  return (
    <div>
      <h2>Saved Locations</h2>
      <ul>
        {locations.map((location, index) => (
          <li key={index}>
            {location.name} - Lat: {location.latitude}, Lng: {location.longitude}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;