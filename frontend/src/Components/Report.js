import React,{useState} from "react";

function Report(){

    return(
    <div className="w-full flex justify-center items-center bg-gradient-to-b from-stone-200 to-orange-50">

        {/*----------Form Container---------*/}
        <div className="bg-white rounded-xl shadow-xl px-8 py-6 w-full w-[50vw] mt-[18vh] mb-[18vh]">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center mt-5">
            <span className="text-amber-600">R</span>eport <span className="text-amber-600">N</span>ow
            </h2>


            {/*----------Form-------------*/}
            <form className="text-gray-800">
                
                

            {/*----------User Information----------*/}

            <div className="flex justify-between">
            <h2 className="p-3 font-bold text-xl">User Information</h2>

            <div className="p-3 flex items-center">
                    <input type="checkbox" className="w-5 h-5"/>
                    <label className="pl-3 font-semibold">Anonymous</label>
                </div>
            </div>

                
            {/*---------1st Row---------*/}
                <div className="flex justify-between grid grid-cols-2 gap-2 pl-3 pr-3 mt-3 ">
                    <label className="font-semibold">Name :</label>
                    <label className="font-semibold">Email :</label>
                    <input type="text" className="border border-gray-300 rounded-md w-full p-2" placeholder="Enter Your Name" />                    
                    <input type="email" className="border border-gray-300 rounded-md w-full p-2" placeholder="xxxxx@gmail.com" />         
                </div>

            {/*---------2nd Row---------*/}
            <div className="flex justify-between grid grid-cols-2 gap-2 pl-3 pr-3 mt-3 ">
                    <label className="font-semibold">Contact No. :</label>
                    <label className="font-semibold">NIC :</label>
                    <input type="text" className="border border-gray-300 rounded-md w-full p-2" placeholder="0312369850" />                    
                    <input type="text" className="border border-gray-300 rounded-md w-full p-2" />         
                </div>

                {/* <hr className="border-gray-400 opacity-50 mt-5 " /> */}


            {/*----------Incident Details----------*/}
                <h2 className="p-3 font-bold text-xl">Incident Details</h2>

                {/*---------1st Row---------*/}
                <div className="flex justify-between grid grid-cols-2 gap-2 pl-3 pr-3 mt-2 ">
                    <label className="font-semibold">Crime Type :</label>
                    <label className="font-semibold">Severity :</label>

                    {/* Crime Type */}
                    <select className="border border-gray-300 rounded-md w-full p-2 ">
                        <option value=""/>
                        <option value="violence">Violence</option>
                        <option value="cyber">Cyber</option>
                        <option value="property">Property</option>
                        <option value="drug-related">Drug-Related</option>
                        <option value="robbery">Robbery</option>
                        <option value="other">Other</option>
                        
                    </select>

                    {/* Severity */}
                    <select className="border border-gray-300 rounded-md w-full p-2 ">
                        <option value=""/>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>    

                </div>

            {/*---------2nd Row---------*/}
            <div className="flex justify-between grid grid-cols-2 gap-2 pl-3 pr-3 mt-3 pb-8">
                    <label className="font-semibold">Contact No. :</label>
                    <label className="font-semibold">NIC :</label>
                    <input type="text" className="border border-gray-300 rounded-md w-full p-2" placeholder="0312369850" />                    
                    <input type="text" className="border border-gray-300 rounded-md w-full p-2 " />         
                </div>
            
            </form>
        </div>
        </div>


    );
}

export default Report;