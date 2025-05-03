// src/components/CrimeMap2.jsx

import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import axios from "axios";
import FilterPanel from "./FilterPanel";
import "leaflet/dist/leaflet.css";

// Severity → color
const getSeverityColor = (severity) => {
  if (!severity) return "gray";
  return severity === "High"
    ? "red"
    : severity === "Medium"
    ? "orange"
    : "green";
};

// Type → color lookup
const typeColors = {
  Violence:      "purple",
  Cyber:         "blue",
  Property:      "brown",
  "Drug-Related": "teal",
  Robbery:       "maroon",
  Other:         "gray"
};

// District → color lookup (all 25)
const districtColors = {
  Ampara:         "#e6194b",
  Anuradhapura:   "#3cb44b",
  Badulla:        "#ffe119",
  Batticaloa:     "#4363d8",
  Colombo:        "#f58231",
  Galle:          "#911eb4",
  Gampaha:        "#46f0f0",
  Hambantota:     "#f032e6",
  Jaffna:         "#bcf60c",
  Kalutara:       "#fabebe",
  Kandy:          "#008080",
  Kegalle:        "#e6beff",
  Kilinochchi:    "#9a6324",
  Kurunegala:     "#fffac8",
  Mannar:         "#800000",
  Matale:         "#aaffc3",
  Matara:         "#808000",
  Moneragala:     "#ffd8b1",
  Mullativu:      "#000075",
  "Nuwara Eliya":   "#808080",
  Polonnaruwa:    "#ffffff",
  Puttalam:       "#000000",
  Ratnapura:      "#1f77b4",
  Trincomalee:    "#ff7f0e",
  Vavuniya:       "#2ca02c"
};

export default function CrimeMap2() {
  const [crimes, setCrimes] = useState([]);
  const [userLocation, setUserLocation] = useState([6.9271, 79.8612]);

  const [filters, setFilters] = useState({ severity: "", type: "", district: "" });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setUserLocation([coords.latitude, coords.longitude]),
        console.error,
        { timeout: 10000 }
      );
    }
    axios
      .get("http://localhost:3000/report/crimeDetails")
      .then(res => setCrimes(res.data))
      .catch(err => console.error("Error fetching crimes:", err));
  }, []);

  const severityOptions = ["High", "Medium", "Low"];
  const typeOptions     = ["Violence", "Cyber", "Property", "Drug-Related", "Robbery", "Other"];
  const districtOptions = Object.keys(districtColors);

  const getMarkerColor = (crime) => {
    if (appliedFilters.severity) {
      return getSeverityColor(crime.severity);
    }
    if (appliedFilters.type) {
      return typeColors[crime.type] || "black";
    }
    if (appliedFilters.district) {
      return districtColors[crime.district] || "black";
    }
    return getSeverityColor(crime.severity);
  };

  const visibleCrimes = useMemo(() => {
    return crimes.filter(c => {
      if (!Array.isArray(c.coordinates) || c.coordinates.length !== 2) return false;
      return (
        (!appliedFilters.severity || c.severity === appliedFilters.severity) &&
        (!appliedFilters.type     || c.type     === appliedFilters.type) &&
        (!appliedFilters.district || c.district === appliedFilters.district)
      );
    });
  }, [crimes, appliedFilters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };
  const applyFilters = () => setAppliedFilters(filters);
  const resetAll = () => {
    const empty = { severity: "", type: "", district: "" };
    setFilters(empty);
    setAppliedFilters(empty);
  };

  return (
    <div className="mx-auto p-4 rounded shadow bg-gray-100 m-4">
      <FilterPanel
        severityOptions={severityOptions}
        typeOptions={typeOptions}
        districtOptions={districtOptions}
        filters={filters}
        onChange={handleFilterChange}
        onFilter={applyFilters}
        onReset={resetAll}
      />

      <MapContainer
        center={userLocation}
        zoom={12}
        className="w-full h-[500px] rounded overflow-hidden mt-4"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {visibleCrimes.map((crime, idx) => (
          <CircleMarker
            key={idx}
            center={crime.coordinates}
            radius={8}
            color={getMarkerColor(crime)}
          >
            <Popup>
              <strong>Type:</strong> {crime.type}<br/>
              <strong>Severity:</strong> {crime.severity}<br/>
              <strong>District:</strong> {crime.district}<br/>
              <strong>Date:</strong> {new Date(crime.datetime).toLocaleDateString()}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

