import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CrimeMap2 from "./CrimeMap2";
import { FaSearch } from "react-icons/fa"; // Import Search Icon
import CrimeTypePieChart2 from "./CrimeTypePieChart2";
import CrimeYearLineChart2 from "./CrimeYearLineChart2";


const LocationListUser = () => {
  const [locations, setLocations] = useState([]);
  const componentRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getLocation() {
      axios.get("http://localhost:8070/locations/locationList")
        .then((res) => {
          console.log("Response from server: 🏁", res.data);
          setLocations(res.data);
        }).catch((err) => {
          console.error("Error fetching data: ⛔", err);
          alert(err.message);
        });
    }

    getLocation();
  }, []);


  const filteredLocation = locations
  .filter((location) =>
    location.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (location.coordinates && location.coordinates[0]?.toString().includes(searchTerm)) || // Latitude
    (location.coordinates && location.coordinates[1]?.toString().includes(searchTerm))   // Longitude
  )
  .sort((a, b) => a.locationName.localeCompare(b.locationName)); // Sort alphabetically

  return (
    <div className="p-12 bg-gradient-to-b from-stone-200 to-orange-50">
  <h1 className="text-4xl font-bold text-gray-800 text-center mb-10 mt-20 ">
    <span className="text-amber-600">I</span>NSIGHTS
  </h1>

  {/* Flex container to align Map and Table side by side */}
  <div className="flex flex-col md:flex-row gap-6">
    {/* Location List Table Section */}
    <div className="flex-1 overflow-auto" >
      {/* Search Bar */}
      <div className="flex justify-start mb-4 ml-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search Location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-2 py-2 w-full bg-gray-500 text-white rounded-full border border-transparent focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-white text-lg" />
        </div>
      </div>

      {/* Table */}
      <div ref={componentRef} 
      className="w-full md:w-[95%] mx-auto rounded-lg overflow-hidden">
        <table className="bg-gray-800 text-white w-half rounded-lg overflow-hidden" 
        style={{
          boxShadow: '0 4px 12px rgba(31, 41, 55, 0.5)' // gray-800: rgb(31, 41, 55)
      }}>
          <thead>
          <tr className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 hover:from-gray-600 hover:via-gray-500 hover:to-gray-400">
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Latitude</th>
              <th className="px-4 py-3 text-left">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocation.map((loc, index) => (
              <tr key={index} className="border-b border-gray-600 hover:bg-gray-700">
                <td className="px-4 py-2">{loc.locationName}</td>
                <td className="px-4 py-2">{loc.coordinates[0]}</td>
                <td className="px-4 py-2">{loc.coordinates[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Crime Map Section */}

    <div className="flex-1">
      {/* <CrimeBubbleChart/> */}

      <CrimeMap2/>
      <CrimeTypePieChart2/>
    </div>
    
  </div>
    
    <CrimeYearLineChart2 />
</div>

  );
};

export default LocationListUser;
