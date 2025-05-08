import React, { useEffect, useState, useMemo, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip} from "react-leaflet";
// import L from "leaflet";
import axios from "axios";
// import FilterPanel from "./FilterPanel";
import "leaflet/dist/leaflet.css";
import hardcodedLocations from './hardcodedLocations';


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

// const dummyCrimes = hardcodedLocations.map(loc => ({
//   locationName: loc.locationName,
//   coordinates: loc.coordinates,
//   crimeCount: Math.floor(Math.random() * 50) + 1
// }));

const CrimeMap2 = () => {
  // const [crimeData, setCrimeData] = useState([]);
  const [reportedDistricts, setReportedDistricts] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:8070/report/crimeDetails")
      .then((res) => {
        const reports = res.data;
        const districts = [...new Set(reports.map(r => r.district))];
        setReportedDistricts(districts);
        console.log("Reported districts:", districts); 
      });
  }, []);
  
  // ✅ Define filteredReports properly before using
  const filteredReports = reportedDistricts.filter(
    (report) => report.district && report.type
  );
  
  // Filter only those locations that match reported districts
  const visibleLocations = hardcodedLocations.filter(loc =>
    reportedDistricts.includes(loc.locationName.toLowerCase())  // Convert to lowercase
  );
  

  return (
    <MapContainer center={[7.8731, 80.7718]} zoom={7} style={{ height: "80vh", width: "100%", boxShadow: '0 4px 4px rgba(31, 41, 55, 0.5)'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {visibleLocations.map((loc, index) => (
        <CircleMarker
          key={index}
          center={loc.coordinates}
          radius={10} // You can change this dynamically with crime count
          fillColor="red"
          color="#fff"
          weight={1}
          opacity={1}
          fillOpacity={0.5}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            <span>{loc.locationName}</span>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default CrimeMap2;