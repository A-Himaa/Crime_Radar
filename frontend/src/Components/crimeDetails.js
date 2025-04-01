import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function CrimeDetails(){
    const [allReports, setAllreports] = useState([]);
    const [searchReport, setSearchReport] = useState(''); 
    const navigate = useNavigate();


    useEffect(() => {
        function getReports() {
            axios.get("http://localhost:8070/report/crimeDetails")
                .then((res) => {
                    console.log("Response from server:", res.data); 
                    const reservedReports = res.data.reverse();
                    setAllreports(reservedReports);
                })
                .catch((err) => {
                    console.error("Error fetching data:", err);
                    alert(err.message);
                });
        }
  
        getReports();

    }, []);


const reportindex = allReports.map((report, index) => ({
  ...report,
  reportNumber: index + 1
}));


//Search function
const filteredReports = reportindex.filter((report) => {
  
  const query = searchReport.toLowerCase();
  return (
    report.reportNumber.toString().includes(query) ||
    report.type.toLowerCase().includes(query) ||
    report.severity.toLowerCase().includes(query) ||
    report.datetime.toLowerCase().includes(query)
  );
});




return (
  <div className="w-full flex justify-center items-center bg-gradient-to-b from-stone-200 to-orange-50 ">
      <div className="bg-white rounded-xl shadow-xl px-8 py-6 w-[80vw] mt-[18vh] mb-[18vh]">

          {/* Header with Search */}
          <div className="flex justify-between w-full items-center">

              <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-2 ">
                  <span className="text-amber-600">A</span>ll <span className="text-amber-600">R</span>eports
              </h2>

              <div className="relative w-[20vw]">
                  <svg xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 a7 7 0 0114 0z" />
                  </svg>

                  <input
                      type="text"
                      placeholder="Search..."
                      value={searchReport}
                      onChange={(e) => setSearchReport(e.target.value)}
                      className="h-10 w-full p-2 pl-10 border border-gray-400 border-2 rounded opacity-70"
                  />
              </div>
          </div>


          {/* Table Header */}
          <div className="container bg-gray-200 bg-opacity-90 ">
              <div className="grid grid-cols-5 gap-4  font-bold text-xl text-center p-4">
                  <div>Report Number</div>
                  <div>Type</div>
                  <div>Severity</div>
                  <div>Date & Time</div>
                  <div>Action</div>
              </div>

              {/* Table Data */}
              {filteredReports.map((report) => (
                  <div key={report._id} className="grid grid-cols-5 gap-4 text-center py-2 bg-white border-b">
                      
                      {/* Generated Report Number */}
                      <div className="text-lg font-semibold">{report.reportNumber}</div>

                      {/* Type */}
                      <div>{report.type}</div>

                      {/* Severity */}
                      <div>{report.severity}</div>

                      {/* Creation Date & Time */}
                      <div>{new Date(report.datetime).toLocaleString()}</div>

                      {/* View More Details */}
                      <div>
                          <Link to={`/crimeDetails/${report._id}`} className="text-blue-500 hover:underline">
                              View Details
                          </Link>
                      </div>
                  </div>
              ))}
          </div>

      </div>
  </div>
);
}

export default CrimeDetails;