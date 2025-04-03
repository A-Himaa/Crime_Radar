import React, { useState , useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ReportDetails() {
    const { id } = useParams();
    const [report, setReport] = useState(null);


    useEffect(() => {
        axios.get(`http://localhost:8070/report/crimeDetails/${id}`) 
            .then((res) => {
                console.log("Fetched Report Data:", res.data);
                setReport(res.data);
            })
            .catch((err) => {
                console.error("Error fetching report:", err);
                alert("Error in loading report details.");
            });
    }, [id]);

    if(!report){
        return <div className="text-center text-lg">Loading...</div>;



    }


    return (
        <div className="w-full flex justify-center items-center bg-gradient-to-b from-stone-200 to-orange-50">
            <div className="bg-white shadow-xl px-8 py-6 w-[80vw] mt-[18vh] mb-[18vh]">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-2 flex justify-center">
                    <span className="text-amber-600">I</span>ncident
                    <span className="text-amber-600 ml-4"> D</span>etails
                </h2>

                <div className="space-y-2 mt-8 text-lg text-gray-700">
                    <h2 className="font-bold text-2xl mt-5 mb-5">Report Details</h2>

                    <div className="grid grid-cols-2 gap-2 m-4 ">
                        <p><strong>Serial Number:</strong> {id}</p>
                        <p><strong>Reported Date & Time:</strong> {new Date(report.datetime).toLocaleString()}</p>
                    </div>

                    <div>
                        <h2 className="font-bold text-2xl mt-5 mb-5">Reporters' Information</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-2 m-4 mt-3">
                        <p><strong>Anonymity : </strong> {report.anonymous ? "Anonymous" : report.anonymity}</p>

                        <p><strong>Reported By : </strong> {report.anonymous ? "Anonymous" : report.name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 m-4">
                        <p><strong>Email : </strong> {report.anonymous ? " - " : report.email}</p>

                        <p><strong>Contact No. : </strong> {report.anonymous ? " - " : report.contactNo}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 m-4">
                        <p><strong>NIC : </strong> {report.anonymous ? " - " : report.NIC}</p>
                    </div>


                    <div>
                        <h2 className="font-bold text-2xl mt-5 mb-5">Incident details</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-2 m-4 ">
                        <p><strong>Type:</strong> {report.type}</p>
                        <p><strong>Severity:</strong> {report.severity}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 m-4 ">
                        <p><strong>Date & Time Happened:</strong> {report.datetime}</p>
                        <p><strong>Incident Location:</strong> {report.location}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 m-4 ">
                        <p><strong>Description:</strong> {report.description}</p>
                    </div>

                    
                    
                    
                </div>
            </div>
        </div>
    );


}


export default ReportDetails;