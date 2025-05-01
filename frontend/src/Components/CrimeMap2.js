import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import axios from "axios";
import FilterPanel from "./FilterPanel";
import "leaflet/dist/leaflet.css";

const getColor = (severity) => {
  if (!severity) return "gray";
  return severity === "High"
    ? "red"
    : severity === "Medium"
    ? "orange"
    : "green";
};

export default function CrimeMap2() {
  const [crimes, setCrimes] = useState([]);
  const [userLocation, setUserLocation] = useState([6.9271, 79.8612]);

  // 1) live selections
  const [filters, setFilters] = useState({
    severity: "",
    type: "",
    district: ""
  });
  // 2) applied selections
  const [appliedFilters, setAppliedFilters] = useState(filters);

  // fetch
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => setUserLocation([coords.latitude, coords.longitude]),
      console.error,
      { timeout: 10000 }
    );

    axios
      .get("http://localhost:3000/api/crimeDetails")
      .then(res => setCrimes(res.data))
      .catch(err => console.error("Error fetching crimes:", err));
  }, []);

  // dropdown options
  const severityOptions = ["High", "Medium", "Low"];
  const typeOptions = [
    "Violence", "Cyber", "Property", "Drug-Related", "Robbery", "Other"
  ];
  const districtOptions = [
    "Ampara","Anuradhapura","Badulla","Batticaloa","Colombo","Galle",
    "Gampaha","Hambantota","Jaffna","Kalutara","Kandy","Kegalle",
    "Kilinochchi","Kurunegala","Mannar","Matale","Matara","Moneragala",
    "Mullativu","Nuwara Eliya","Polonnaruwa","Puttalam","Ratnapura",
    "Trincomalee","Vavuniya"
  ];

  // filtered list uses appliedFilters
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

  // handlers
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };
  const applyFilters = () => {
    setAppliedFilters(filters);
  };
  const resetAll = () => {
    const empty = { severity: "", type: "", district: "" };
    setFilters(empty);
    setAppliedFilters(empty);
  };

  return (
    <div className="mx-auto p-2 rounded shadow bg-gray-100 m-4">
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
            color={getColor(crime.severity)}
          >
            <Popup>
              <strong>Type:</strong> {crime.type} <br />
              <strong>Severity:</strong> {crime.severity} <br />
              <strong>Date:</strong>{" "}
              {new Date(crime.datetime).toLocaleDateString()}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
