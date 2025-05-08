// src/components/CrimeMap2.jsx

import React, { useEffect, useState, useMemo, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import L from "leaflet";
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
  "Nuwara Eliya": "#808080",
  Polonnaruwa:    "#ffffff",
  Puttalam:       "#000000",
  Ratnapura:      "#1f77b4",
  Trincomalee:    "#ff7f0e",
  Vavuniya:       "#2ca02c"
};

export default function CrimeMap2() {
  const [crimes, setCrimes] = useState([]);
  const [filters, setFilters] = useState({ severity: "", type: "", district: "" });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const mapRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:8070/map/getBubbles")
      .then(res => setCrimes(res.data))
      .catch(err => console.error("Error fetching crimes:", err));
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      L.control.zoom({ position: "bottomright" }).addTo(map);
    }
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
    const filtered = crimes.filter(c => {
      if (
        !Array.isArray(c.coordinates) ||
        c.coordinates.length !== 2 ||
        typeof c.coordinates[0] !== "number" ||
        typeof c.coordinates[1] !== "number" ||
        isNaN(c.coordinates[0]) ||
        isNaN(c.coordinates[1])
      ) return false;
  
      return (
        (!appliedFilters.severity || c.severity === appliedFilters.severity) &&
        (!appliedFilters.type     || c.type     === appliedFilters.type) &&
        (!appliedFilters.district || c.district === appliedFilters.district)
      );
    });
  
    console.log("Visible crimes count:", crimes.length, "After filter:", filtered.length);
    console.log("First visible crime (if any):", filtered[0]);
  
    return filtered;
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
    <div className="mx-auto p-4 rounded-2xl shadow bg-gray-100 m-4" style={{
      boxShadow: '0 4px 12px rgba(31, 41, 55, 0.5)' // gray-800: rgb(31, 41, 55)
    }}>
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
        center={[6.9271, 79.8612]}  // Default to Colombo
        zoom={12}
        zoomControl={false}
        className="w-full h-[500px] rounded overflow-hidden mt-4"
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {visibleCrimes.map((crime, idx) => (
          <CircleMarker
            key={idx}
            center={Array.isArray(crime.coordinates)
              ? crime.coordinates
              : [crime.coordinates.latitude, crime.coordinates.longitude]}            
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
