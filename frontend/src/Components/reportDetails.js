import React, { useState , useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ReportDetails() {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [recipientEmail, setRecipientEmail] = useState(""); 
    

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
                alert("Error in loading report details.");
            });
    }, [id]);


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
            alert("Error generating report.");
        });
    };


    if(!report){
        return <div className="text-center text-lg">Loading...</div>;

    }


  // Email forwarding feature
  const forwardReport = (recipientEmail) => {
    axios
      .post("http://localhost:8070/report/send-report", {
        recipientEmail: recipientEmail,
        id: report._id,
      })
      .then((res) => {
        alert("Report sent successfully.");
      })
      .catch((err) => {
        console.error("Error sending report:", err);
        alert("Error sending report.");
      });
  };

  const handleForwardClick = () => {
    // Ensure recipient email is not empty
    if (!recipientEmail) {
      alert("Please enter a valid recipient email.");
      return;
    }
    forwardReport(recipientEmail);
  };
      




    return (
        <div className="w-full flex justify-center items-center bg-gradient-to-b from-stone-200 to-orange-50">
            <div className="bg-white shadow-xl px-20 py-10 w-[80vw] mt-[18vh] mb-[18vh]">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-2 flex justify-center">
                    <span className="text-amber-600">I</span>ncident
                    <span className="text-amber-600 ml-4"> D</span>etails
                </h2>

                <div className=" mt-8 text-lg text-gray-700">
                    <h2 className="font-bold text-2xl mt-5 mb-5">Report Details</h2>

                    <div className="grid grid-cols-4 mb-6 ml-6">
                        <p><strong>Serial Number <span className="ml-4">:</span></strong></p>
                        <div className="-ml-20">{id}</div>
                        <p className="ml-5"><strong>Reported Date & Time<span className="ml-3">:</span></strong> </p>
                        <div className="-ml-5">{new Date(report.createdAt).toLocaleString()}</div>
                    </div>

                    <hr />

                    <div>
                        <h2 className="font-bold text-2xl mt-8 mb-5">Reporters' Information</h2>
                    </div>

                    <div className="grid grid-cols-4 m-4 mt-3 px-4">
                        <p><strong>Anonymous<span className="ml-8">:</span></strong> </p>
                        <div className="-ml-20">{report.anonymous === true ? "Yes" : "No"}</div>

                        <p className="ml-8"><strong>Reported By<span className="ml-24">:</span></strong> </p>
                        <div>{report.name}</div>
                    </div>

                    <div className="grid grid-cols-4 m-4 px-4">
                        <p><strong>Email<span className="ml-20"> :</span></strong> </p>
                        <div className="-ml-20">{report.email}</div>

                        <p className="ml-8"><strong>Contact No.<span className="ml-24"> :</span></strong> </p>
                        <div>{report.contactNo}</div>
                    </div>

                    <div className="grid grid-cols-4 m-4 px-4">
                        <p><strong>NIC<span className="ml-24"> :</span></strong> </p>
                        <div className="-ml-20">{report.NIC}</div>
                    </div>

                    <hr className="mt-10"/>


                    <div>
                        <h2 className="font-bold text-2xl mt-8 mb-5">Incident details</h2>
                    </div>

                    <div className="grid grid-cols-4 m-4 px-4">
                        <p><strong>Type<span className="ml-24"> :</span></strong></p>
                        <div className="-ml-20"> {report.type}</div>

                        <p className="ml-8"><strong>Severity<span className="ml-32"> :</span></strong></p>
                        <div> {report.severity}</div>
                    </div>

                    <div className="grid grid-cols-4 m-4 px-4">
                        <p><strong>Date & Time <span className="ml-7"> :</span><br /> Happened</strong> </p>
                        <div className="-ml-20">{new Date(report.datetime).toLocaleString()}</div>

                        <p className="ml-8"><strong>Incident Location<span className="ml-12"> :</span></strong> </p>
                        <div> {report.district}</div>
                    </div>

                    <div className="m-4 px-4 mt-8">
                        <p><strong>Description<span className="ml-9"> :</span></strong></p>
                        <div className="mt-2"> {report.description}</div>
                    </div>

                    <hr className="mt-10"/>

                    <div>
                        <h2 className="font-bold text-2xl mt-8 mb-5">Evidence</h2>
                    </div>

                    {report.image && report.image.filename ? (
                            <img 
                                src={`http://localhost:8070/report/images/${report.image.filename}`} 
                                alt="Crime Evidence"
                                className="w-[50vw] object-cover shadow-md"
                            />
                        ) : (
                            <p className="text-gray-500">No evidence available.</p>
                        )}

                        <hr className="mt-10"/>

                        <div className="mt-5">
                        <label className="font-bold text-gray-800">Forward to: </label>
                        <div className="flex items-center space-x-3 mt-3">
                        <select
                            className="border border-gray-300 rounded-md p-2 flex-grow text-md opacity-80"
                            value={recipientEmail} 
                            onChange={(e) => setRecipientEmail(e.target.value)}
                        >
                            <option value="">Select Recipient Email</option>
                            <option value="info.lensloom@gmail.com">info.lensloom@gmail.com</option>
                        </select>


                            <button id="emailInput" className="bg-amber-700 opacity-70 text-white  py-3 px-5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" onClick={handleForwardClick}>
                            Forward
                            </button>

                        </div>
                        </div>

                        <div className="flex justify-end mt-10">
                            <button className="bg-amber-800 text-white font-bold py-3 px-5 rounded-lg opacity-80 transition duration-300 ease-in-out transform hover:scale-105 mr-3 mt-4">
                                Status Update
                            </button>
                            <button className="bg-amber-800 text-white font-bold py-3 px-5 rounded-lg opacity-80 transition duration-300 ease-in-out transform hover:scale-105 mr-3 mt-4"
                            onClick={generateReport}>
                                Generate Report
                            </button>
                            
                        </div>

                   
                </div>
            </div>
        </div>
    );


}


export default ReportDetails;