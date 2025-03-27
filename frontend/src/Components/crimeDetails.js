import React, {useState, useEffect} from "react";
import axios from "axios";

function CrimeDetails(){
    return(
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-stone-200 to-orange-50">
            <div className="bg-white rounded-xl shadow-xl px-8 py-6 w-[80vw] mt-[15vh] mb-[18vh]">

            <div className="flex items-center justify-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-2 ">
                <span className="text-amber-600">A</span>ll <span className="text-amber-600">R</span>eports
                </h2>
            </div>

            <div className="container bg-gray-400 bg-opacity-70 rounded-lg ">
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