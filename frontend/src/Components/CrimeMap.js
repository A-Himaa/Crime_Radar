import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const getColor = (severity) => {
  if (severity === "High") return "red";
  if (severity === "Medium") return "orange";
  return "green";
};

const CrimeMap = function () {
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/crimes")
      .then((response) => setCrimes(response.data))
      .catch((error) => console.error("Error fetching crime data:", error));
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 rounded-2xl shadow-lg bg-white">
      <h2 className="text-xl font-semibold text-center mb-4">Crime Map</h2>
      <MapContainer
        center={[6.9271, 79.8612]}
        zoom={12}
        className="w-full h-[500px] rounded-2xl overflow-hidden"
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
      <div class="relative flex justify-end p-5">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Button
  </button>
</div>

    </div>
  );
};

export default CrimeMap;
