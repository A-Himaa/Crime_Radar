import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
import { Link } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";
import CrimeMap2 from "./CrimeMap2";
import { FaSearch } from "react-icons/fa"; // Import Search Icon
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



const LocationList = () => {
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

  const onDeleteClick = async (locationId) => {
    const confirmed = window.confirm('Are you sure you want to delete this location❓');
    if (confirmed) {
      await axios.delete(`http://localhost:8070/locations/delete/${locationId}`);
      alert('Location Deleted Successfully');
      window.location.reload();
    }
  };

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: "Location List",
  //   onAfterPrint: () => alert("Location List Downloaded!! ✅")
  // });

  const downloadLocationPDF = (locations) => {
    const doc = new jsPDF();

    //Header
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Crime Awareness System", 14,20);

    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text("Location List Report", 14, 30);
    doc.setLineWidth(0.5);
    doc.line(14, 32, 196, 32); // underline

    //Table
    const tableColumn = ["#", "Location Name", "Latitude", "Longitude"];
    const tableRows = [];

    locations.forEach((loc, index) => {
      const row = [
        index + 1,
        loc.locationName,
        loc.coordinates[0],
        loc.coordinates[1]
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: {
        fontSize: 11,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [217, 119, 6], // amber
        textColor: 0,
        halign: "left",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });
  
    // Footer
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generated on ${date}`, 14, doc.internal.pageSize.height - 10);
  
    doc.save("Location_List_Report.pdf");

  }


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
    <span className="text-amber-600">L</span>ocation <span className="text-amber-600">L</span>ist
  </h1>

  {/* Flex container to align Map and Table side by side */}
  <div className="flex flex-row gap-6">
    {/* Location List Table Section */}
    <div className="w-1/2 overflow-x-auto">
      {/* Search Bar */}
      <div className="flex justify-end mb-4">
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
      <div ref={componentRef} className="overflow-x-auto">
        <table className="bg-gray-800 text-white w-full rounded-lg overflow-hidden">
          <thead>
          <tr className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 hover:from-gray-600 hover:via-gray-500 hover:to-gray-400">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Latitude</th>
              <th className="px-4 py-3 text-left">Longitude</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocation.map((loc, index) => (
              <tr key={loc.id} className="border-b border-gray-600 hover:bg-gray-700">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{loc.locationName}</td>
                <td className="px-4 py-2">{loc.coordinates[0]}</td>
                <td className="px-4 py-2">{loc.coordinates[1]}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link to={`/updateLocation/${loc._id}`}>
                    <button className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded">Edit</button>
                  </Link>
                  <button onClick={() => onDeleteClick(loc._id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded">
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Print Button */}
      <div className="flex justify-end mt-4">
        <button onClick={() => downloadLocationPDF(filteredLocation)} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaPrint /> Generate Reports
        </button>
      </div>
    </div>

    {/* Crime Map Section */}
    <div className="w-1/2 overflow-x-auto">
      <CrimeMap2 />
    </div>
  </div>
</div>

  );
};

export default LocationList;
