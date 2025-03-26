import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";


const getColor = (severity) => {
  if (!severity) return "gray";
  return severity === "High" ? "red" : severity === "Medium" ? "orgnge" : "green";
};

const CrimeMap2 = function () {
  const [crimes, setCrimes] = useState([]);
  const [userLocation, setUserLocation] = useState([6.9271, 79.8612]); // Default to Colombo

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => console.error("Error getting location:", error),
        { timeout: 10000 }
      );
    }

    // Fetch crime data
    axios
      .get("http://localhost:3000/api/crimes")
      .then((response) => setCrimes(response.data))
      .catch((error) => console.error("Error fetching crime data:", error));
  }, []);

  return (
    <div className="w-[45vw] mx-auto p-2 rounded-1xl shadow-lg bg-gray-600 m-2 relative z-10">
      <MapContainer
        center={userLocation}
        zoom={12}
        className="w-full h-[500px] rounded-1xl overflow-hidden relative z-[0]"
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {crimes.map((crime, index) => (
          <CircleMarker
            key={index}
            center={[crime.latitude, crime.longitude]}
            radius={8}
            color={getColor(crime.severity)}
          >
            <Popup>
              <strong>Type:</strong> {crime.type} <br />
              <strong>Severity:</strong> {crime.severity} <br />
              <strong>Date:</strong> {new Date(crime.date).toLocaleDateString()}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CrimeMap2;
