import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";


const ViewDetails = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate()


  useEffect(() => {
    axios.get(`http://localhost:8070/report/crimeDetails/${id}`) 
        .then((res) => {
            console.log("Fetched Report Data:", res.data);

            const reportData = res.data;
            if (!reportData.createdAt) {
                reportData.createdAt = new Date(
                    parseInt(reportData._id.substring(0, 8), 16) * 1000
                ).toISOString(); 
            }

            setReport(reportData);
        })
        .catch((err) => {
            console.error("Error fetching report:", err);
            Swal.fire({
              title: 'Error',
              text: 'Error in loading report details. Please enter the correct report ID.',
              icon: 'error',
              confirmButtonColor: '#d33',
            }).then (() => {
              navigate('/newreport');
            })
        });
}, [id]);


  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!report) return <div className="text-center mt-10">Loading...</div>;



  //event listner for generate report
  const generateReport = () => {
    axios.post('http://localhost:8070/report/generate-report', report, { 
        responseType: 'blob'  
        
    })
    .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', 'crime_report.pdf');
        document.body.appendChild(link);
        link.click();  // Trigger the download
        document.body.removeChild(link);
    })

    .catch((error) => {
        console.error("Error generating report:", error);
        Swal.fire({
          title: 'Error',
          text: 'Error in generating report.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
     });
};


//Crime report delete
const deleteReport = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to permenently delete this crime report?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#d48f38',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:8070/report/delete/${id}`);

      await Swal.fire({
        title: 'Deleted!',
        text: 'Your crime report has been deleted successfully.',
        icon: 'success',
        confirmButtonColor: '#9ca3af',
      });

      navigate('/newreport');
    } catch (error) {
      console.error('Error deleting report:', error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the crime report.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  }
};



if(!report){
    return <div className="text-center text-lg">Loading...</div>;

}


  return (
    <div className="w-full flex justify-center items-center bg-gradient-to-b from-stone-200 to-orange-50">
            <div className="bg-white shadow-xl px-20 py-10 w-[82vw] mt-28 mb-10 rounded-lg">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-2 flex justify-center">
                <span className="text-amber-600">I</span>ncident
                <span className="text-amber-600 ml-4"> D</span>etails
            </h2>

            <div className="mt-8 text-lg text-gray-700">
                <h2 className="font-bold text-2xl mt-5 mb-5">Report Details</h2>

                <div className="grid grid-cols-4 mb-6 ml-6">
                <p><strong>Serial Number <span className="ml-4">:</span></strong></p>
                <div className="-ml-20">{id}</div>
                <p className="ml-5"><strong>Reported Date & Time<span className="ml-3">:</span></strong> </p>
                <div className="-ml-5">{new Date(report.createdAt).toLocaleString()}</div>
                </div>

                <hr />

                <h2 className="font-bold text-2xl mt-8 mb-5">Reporters' Information</h2>

                <div className="grid grid-cols-4 m-4 mt-3 px-4">
                <p><strong>Anonymous<span className="ml-8">:</span></strong></p>
                <div className="-ml-20">{report.anonymous ? "Yes" : "No"}</div>

                <p className="ml-8"><strong>Reported By<span className="ml-24">:</span></strong></p>
                <div>{report.name}</div>
                </div>

                <div className="grid grid-cols-4 m-4 px-4">
                <p><strong>Email<span className="ml-20"> :</span></strong></p>
                <div className="-ml-20">{report.email}</div>

                <p className="ml-8"><strong>Contact No.<span className="ml-24"> :</span></strong></p>
                <div>{report.contactNo}</div>
                </div>

                <div className="grid grid-cols-4 m-4 px-4">
                <p><strong>NIC<span className="ml-24"> :</span></strong></p>
                <div className="-ml-20">{report.NIC}</div>
                </div>

                <hr className="mt-10"/>

                <h2 className="font-bold text-2xl mt-8 mb-5">Incident details</h2>

                <div className="grid grid-cols-4 m-4 px-4">
                <p><strong>Type<span className="ml-24"> :</span></strong></p>
                <div className="-ml-20">{report.type}</div>

                <p className="ml-8"><strong>Severity<span className="ml-32"> :</span></strong></p>
                <div>{report.severity}</div>
                </div>

                <div className="grid grid-cols-4 m-4 px-4">
                <p><strong>Date & Time <span className="ml-7"> :</span><br /> Happened</strong></p>
                <div className="-ml-20">{new Date(report.datetime).toLocaleString()}</div>

                <p className="ml-8"><strong>Incident Location<span className="ml-12"> :</span></strong></p>
                <div>{report.district}</div>
                </div>

                <div className="m-4 px-4 mt-8">
                <p><strong>Description<span className="ml-9"> :</span></strong></p>
                <div className="mt-2">{report.description}</div>
                </div>

                <hr className="mt-10"/>

                <h2 className="font-bold text-2xl mt-8 mb-5">Evidence</h2>
                {report.image?.filename ? (
                <img 
                    src={`http://localhost:8070/report/images/${report.image.filename}`} 
                    alt="Crime Evidence"
                    className="w-[30vw] object-cover shadow-md"
                />
                ) : (
                <p className="text-gray-500">No evidence available.</p>
                )}
            </div>

            <hr className="mt-8"/>

            <div className="mt-8">
                <p className="text-xl text-gray-800"><strong>Report Status<span className="ml-9"> :</span></strong>
                <span className="ml-5 text-red-500 font-bold">{report.status}</span></p>
            </div>

            <div className="flex justify-end space-x-4 mt-2 ">
            <Link to={`/updateCrime/${id}`}>
              <button className="bg-amber-600 text-white font-bold py-3 px-5 rounded-lg opacity-80 transition duration-300 ease-in-out transform hover:scale-105 ml-4">Update</button>
            </Link>
              <button className="bg-red-500 text-white font-bold py-3 px-5 rounded-lg  transition duration-300 ease-in-out transform hover:scale-105 ml-4"
              onClick={() => deleteReport(report._id)}>Delete</button>
              <button className="bg-gray-400 text-white font-bold py-3 px-5 rounded-lg  transition duration-300 ease-in-out transform hover:scale-105 ml-4"
                      onClick={generateReport}>Download Report</button>
            </div>

            </div>
        </div>

  );
};

export default ViewDetails;
