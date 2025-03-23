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

  useEffect(function () {
    axios.get("http://localhost:5000/api/crimes").then(function (response) {
      setCrimes(response.data);
    });
  }, []);

  return React.createElement(
    MapContainer,
    { center: [6.9271, 79.8612], zoom: 12, style: { height: "500px" } },
    React.createElement(TileLayer, {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }),
    crimes.map(function (crime, index) {
      return React.createElement(
        CircleMarker,
        {
          key: index,
          center: [crime.latitude, crime.longitude],
          radius: 8,
          color: getColor(crime.severity)
        },
        React.createElement(
          Popup,
          null,
          React.createElement("strong", null, "Type: "), crime.type,
          React.createElement("br"),
          React.createElement("strong", null, "Severity: "), crime.severity,
          React.createElement("br"),
          React.createElement("strong", null, "Date: "), new Date(crime.date).toLocaleDateString()
        )
      );
    })
  );
};

export default CrimeMap;
