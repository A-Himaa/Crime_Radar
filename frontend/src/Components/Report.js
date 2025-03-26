import React,{useState} from "react";
import axios from "axios";

function Report(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNo, setcontactNo] = useState("");
    const [nic, setnic] = useState("");



    const handleKeyDown = (e) => {
        const key = e.key;
        const isNumber = /^[0-9]$/.test(key);
        const isBackspace = key === "Backspace" || key === "Delete";
        const isV = key === "V" || key === "v";
    
        // Check length dynamically
        const currentLength = nic.length; 
    
        const isValid = isNumber || isBackspace || (isV && currentLength === 9);
    
        if (!isValid) {
            e.preventDefault();
        }
    };
    
    const handleChange = (e) => {
        const inputNic = e.target.value; 
    
        // Enforce max length (12 for new NIC, 10 for old NIC)
        if (/^\d{0,9}[Vv]?$|^\d{0,12}$/.test(inputNic)) {
            setnic(inputNic);
        }
    };
    






    return(
    <div className="w-full flex justify-center items-center bg-gradient-to-b from-stone-200 to-orange-50">

        {/*----------Form Container---------*/}
        <div className="bg-white rounded-xl shadow-xl px-8 py-6 w-[80vw] mt-[15vh] mb-[18vh]">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center mt-2">
            <span className="text-amber-600">R</span>eport <span className="text-amber-600">N</span>ow
            </h2>


            {/*----------Form-------------*/}
            <form className="text-gray-800 pl-8 pr-8">
                
                

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

                    {/* Name Validation */}
                    <input type="text"
                        value={name}
                        onKeyDown={(e) => {
                            const key = e.key;
                            const isLetter = /^[a-zA-z]$/.test(key);
                            const isBackspace = key === 'Backspace';

                            const isValid = isLetter || isBackspace;

                            if(!isValid){
                                e.preventDefault();
                            }
                        }}

                        onChange={(e) => {
                            const rname = e.target.value;

                            if (/^[a-zA-Z ]*$/.test(rname)) {
                                setName(rname);
                            }
                        }}                     
                    className="border border-gray-300 rounded-md w-full p-2" placeholder="Enter Your Name" />


                    {/* Email validation */}
                    <input type="email"
                        value={email}
                        onKeyDown={(e) => {
                            const key = e.key;
                            const isEmailLetter = /^[a-zA-Z0-9._+@-]$/.test(key)
                            const isBackspace = key === 'Backspace';

                            const isValid = isBackspace || isEmailLetter;

                            if(!isValid){
                                e.preventDefault();
                            }
                        }}

                        onChange={(e) => {
                            const newVal = e.target.value;

                            const validInput = /^[a-zA-Z0-9._+@-]*$/.test(newVal);

                            if(validInput){
                                setEmail(newVal);
                            }
                        }}                 
                    className="border border-gray-300 rounded-md w-full p-2" placeholder="xxxxx@gmail.com" /> 

                </div>

            {/*---------2nd Row---------*/}
            <div className="flex justify-between grid grid-cols-2 gap-2 pl-3 pr-3 mt-3 ">
                    <label className="font-semibold">Contact No. :</label>
                    <label className="font-semibold">NIC :</label>


                    <input type="text" 
                        value={contactNo}
                        onKeyDown={(e) => {
                            const key = e.key;
                            const isDigit = /^[0-9]$/.test(key);
                            const isBackspace = key === 'Backspace';

                            const isValid = isBackspace || isDigit;

                            if(!isValid){
                                e.preventDefault();
                            }
                        }}

                        onChange={(e) => {
                            const validNo = e.target.value;
                            
                            if(/^[0-9]*$/.test(validNo)){
                                setcontactNo(validNo);
                            }
                        }}

                        minLength={10}
                        maxLength={10}               
                    className="border border-gray-300 rounded-md w-full p-2" placeholder="0312369850" />   


                    {/* NIC validation */}
                    <input type="text"
                           value={nic}
                           onKeyDown={handleKeyDown}
                           onChange={handleChange}
                           maxLength={12}
                    
                    
                    className="border border-gray-300 rounded-md w-full p-2" />         
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
            <div className="flex justify-between grid grid-cols-2 gap-2 pl-3 pr-3 mt-3">
                    <label className="font-semibold">Date & Time :</label>
                    <label className="font-semibold">District :</label>

                    <input type="datetime-local" className="border border-gray-300 rounded-md w-full p-2" />  

                    {/*--------Location-------*/}
                    <select className="border border-gray-300 rounded-md w-full p-2 ">
                            <option value=""/>
                            <option value="colombo">Colombo</option>
                            <option value="gampaha">Gampaha</option>
                            <option value="kalutara">Kalutara</option>
                            <option value="kandy">Kandy</option>
                            <option value="matale">Matale</option>
                            <option value="nuwara-eliya">Nuwara Eliya</option>
                            <option value="galle">Galle</option>
                            <option value="hambantota">Hambantota</option>
                            <option value="jaffna">Jaffna</option>
                            <option value="kilinochchi">Kilinochchi</option>
                            <option value="mullaitivu">Mullaitivu</option>
                            <option value="mannar">Mannar</option>
                            <option value="vavuniya">Vavuniya</option>
                            <option value="trincomalee">Trincomalee</option>
                            <option value="batticaloa">Batticaloa</option>
                            <option value="ampara">Ampara</option>
                            <option value="polonnaruwa">Polonnaruwa</option>
                            <option value="badulla">Badulla</option>
                            <option value="moneragala">Moneragala</option>
                            <option value="ratnapura">Ratnapura</option>
                            <option value="kegalle">Kegalle</option>
                            <option value="kurunegala">Kurunegala</option>
                            <option value="anuradhapura">Anuradhapura</option>
                            <option value="matar">Matara</option>
                            <option value="puttalam">Puttalam</option>

                        
                    </select>         
                </div>

                {/*---------3rd Row---------*/}
                <div className="pl-3 pr-3 pt-3">
                    <label className="font-semibold">Description :</label>
                    <textarea className="border border-gray-300 rounded-md w-full p-2 mt-3" placeholder="Description about the incident" />                    
                </div>

                {/*---------4th Row---------*/}
                <div className="pl-3 pr-3 pb-3">
                    <label className="font-semibold">Images :</label>
                    <input type="file" className="border border-gray-300 rounded-md w-full p-4 mt-3" placeholder="Description about the incident" />                    
                </div>

                <div className="p-3 flex items-center">
                    <input type="checkbox" className="w-5 h-5"/>
                    <label className="pl-3">I hereby confirm that all the information provided is accurate and true to the best of my knowledge</label>
                </div>

                <div className="flex justify-end">
                <button className="bg-amber-800 text-white font-bold py-3 px-5 rounded-lg opacity-80 transition duration-300 ease-in-out transform hover:scale-105 mr-3 mt-4">
                    Submit
                </button>
</div>

           
            </form>
        </div>
        </div>


    );
}

export default Report;