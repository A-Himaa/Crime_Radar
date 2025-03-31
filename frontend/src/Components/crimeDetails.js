import React, {useState, useEffect} from "react";
import axios from "axios";

function CrimeDetails(){
    const [allReports, setAllreports] = useState([]);

    useEffect(() => {
        function getReports() {
            axios.get("http://localhost:8070/report/crimedetails")
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

    const data = allReports;




    return(
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-stone-200 to-orange-50">
            <div className="bg-white rounded-xl shadow-xl px-8 py-6 w-[80vw] mt-[15vh] mb-[18vh]">

            <div className="flex justify-between w-full items-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-2 ">
                <span className="text-amber-600">A</span>ll <span className="text-amber-600">R</span>eports
                </h2>
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-900 flex ml-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 a7 7 0 0114 0z"
                />
              </svg>

           <input
                type="text"
                placeholder="Search..."
                // value={searchJob}
                // onChange={(e) => setSearchJob(e.target.value)}
                className="flex h-10 w-[20vw] mt-2 p-2 border border-gray-400 border-2 rounded opacity-70 justify-end" 
              />
            </div>
            </div>

            <div className="container bg-gray-200 bg-opacity-90 rounded-lg ">
            <div className="space-y-2 flex justify-between grid grid-cols-5 gap-4 mt-4 mb-4">
            <div>
              <h2 className="text-center text-xl flex-grow font-bold mt-4 mb-4">Anonymous</h2>
            </div>
                
                <div>
                    <h2 className="text-center text-xl flex-grow font-bold mt-2 mb-3">Type</h2>
                </div>

                <div>
                    <h2 className="text-center text-xl flex-grow font-bold mt-2 mb-3">Severity</h2>
                </div>

                <div>
                    <h2 className="text-center text-xl flex-grow font-bold mt-2 mb-3">Date & Time</h2>
                </div>
            </div>
            </div>
                   

                    
                             
         
        </div>
    
      </div>

            
    )
}

export default CrimeDetails;