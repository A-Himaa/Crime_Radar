import { useState, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const componentRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getLocation(){
      axios.get("http://localhost:3000/location/")
        .then((res)=>{
            console.log("Response from server:", res.data);
            setLocations(res.data);
        }).catch((err)=>{
              console.error("Error fetching data: ", err);
              alert(err.message);
        });
    }

    getLocation();

  }, []);

  // Function to handle deletion of a booking
  const onDeleteClick = async (locationId) => {
    const confirmed = window.confirm('Are you sure you want to delete this location?');
    if (confirmed) {
        await axios.delete(`http://localhost:8090/location/delete/${locationId}`);
        alert('Location Deleted Successfully');
        window.location.reload(); // Refresh page after successful deletion
    }

    //Function to generate reports
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      DocumentTitle: "Location",
      onafterprint: () => alert("Location List generation successful!!")
    });
  };

  const filteredLocation = locationRoutes.filter((location) =>
    Location.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Location.latitude.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Location.longitude.toLowerCase().includes(searchTerm.toLowerCase()) 
);

  return (
    <div>
      <h2>Saved Locations</h2>
      <div className="absolute top-2 right-8">
          {/* Search bar */}
            <div className="relative mt-48">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* Search icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                  </div>
                <input type="text" placeholder="Search " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 w-64 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 border border-transparent" />
            </div>
      </div>

      <div ref={componentRef}>
                {/* Header for PDF */}
                <div className="print:block hidden">
                <div>
                    <img src={imgSrc1} alt="Logo" className="h-20 w-43 ml-20 mt-10 align-top align-left"/>
                </div>
                <br />
                <div className="font-bold top-24 mx-10 ml-20 justify-end">
                        <p className="mr-4">Ryome Auto Cares</p>
                        <p className="mr-4">386/1, Borella Road,</p>
                        <p className="mr-4">Pannipitiya,</p>
                        <p className="mr-4">Kottawa</p>
                        <p className="mr-4">0773216654 / 0112780599</p>
                        <h1 className="text-center text-3xl">Booking List</h1><br/>
                        <hr/>
                    <br/>
                </div>
            </div>
                <table className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-white sticky top-10 mx-10 mt-20" ref={componentRef}>
                <thead>
                    <tr className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 mt-5">
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Location</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Latitude</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Longitude</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLocation.map((locations) => (
                        <tr key={location.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                            <td className="hidden">{location.id}</td> {/* Hide the first column */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.latitude}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.longitude}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-start gap-2">
                                    {/* Edit booking button */}
                                    <Link to={`/updateLocation/${location._id}`}><button className="bg-transparent hover:bg-green-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        Edit
                                    </button></Link>
                                    {/* Delete booking button  */}
                                    <button onClick={() => onDeleteClick(location._id)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Footer for PDF */}
            <div className="print:block hidden">
                    <div className="absolute bottom-0 w-full  flex px-10 mb-10"><br/><br/>
                    <div className="font-bold text-left space-x-4">
                            ..................................<br />Date
                        </div>
                        <div className="font-bold ml-96">
                            ..................................<br />Issued By
                        </div>
                        <div className="font-bold ml-96">
                            .....................................<br />Manager's Signature
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute right-8 mt-5">
                <button onClick={handlePrint} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded "><FaPrint className="mx-16" />Generate Reports</button>
                <div className="mt-1 opacity-0">.</div>
            </div>
      
    </div>
  );
};

export default LocationList;