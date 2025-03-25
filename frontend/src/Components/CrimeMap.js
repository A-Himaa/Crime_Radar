import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import LocationForm from "./LocationForm";

const getColor = (severity) => {
  if (severity === "High") return "red";
  if (severity === "Medium") return "orange";
  return "green";
};

const CrimeMap = function () {
  const [crimes, setCrimes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/crimes")
      .then((response) => setCrimes(response.data))
      .catch((error) => console.error("Error fetching crime data:", error));
  }, []);

  return (
    <div className="w-[90vw] mx-auto p-6 rounded-1xl shadow-lg bg-gray-100 m-2 relative">
      <MapContainer
        center={[6.9271, 79.8612]}
        zoom={12}
        className="w-full h-[500px] rounded-1xl overflow-hidden"
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

      <div className="relative flex justify-end p-5">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowForm(true)}
        >
          New Location
        </button>
      </div>

      {/* Show the location form when button is clicked */}
      {showForm && <LocationForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default CrimeMap;
