import React,{useState} from "react";
import axios from "axios";

function Report(){
    const [anonymous, setAnonymous] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNo, setcontactNo] = useState("");
    const [NIC, setnic] = useState("");
    const [type, setType] = useState("");
    const [severity, setSevere] = useState("");
    const [datetime, setDatetime] = useState("");
    const [district, setDistrict] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [errormail, setemailError] = useState("");
    const [errornum, setnumError] = useState("");
    const [errnic, setnicError] = useState("");

    function submit(e) {
        e.preventDefault();
   
        const form = e.target.closest('form');
        if (!form.checkValidity()) {
            alert("Please Fill Out The Required Fields.");
            return;
        }
   
        const formData = new FormData();
        formData.append("anonymous", anonymous);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("contactNo", contactNo);
        formData.append("NIC", NIC);
        formData.append("type", type);
        formData.append("severity", severity);
        formData.append("datetime", datetime);
        formData.append("district", district);
        formData.append("description", description);
        formData.append("image", image);
   
        axios.post("http://localhost:8070/report/newCrime", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(() => {
            alert("Report Successfully Added");
            window.location.reload();
        })
        .catch((err) => {
            alert("Error: " + err.response.data);
        });
    }







    return(
    <div className="w-full flex justify-center items-center bg-gradient-to-b from-stone-200 to-orange-50">

        {/*----------Form Container---------*/}
        <div className="bg-white rounded-xl shadow-xl px-8 py-6 w-[80vw] mt-[15vh] mb-[18vh]">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center mt-2">
            <span className="text-amber-600">R</span>eport <span className="text-amber-600">N</span>ow
            </h2>


            {/*----------Form-------------*/}
            <form className="text-gray-800 pl-8 pr-8" enctype="multipart/form-data">
                
                

            {/*----------User Information----------*/}

            <div className="flex justify-between">
            <h2 className="p-3 font-bold text-xl">User Information</h2>

            <div className={`p-3 rounded-md transition duration-300 ${anonymous ? "opacity-50" : "opacity-100"}`}>
                    <input type="checkbox"
                           checked={anonymous}
                           onChange={(e) => setAnonymous(e.target.checked)}
                           className="w-5 h-5"/>

                    <label className="pl-3 font-semibold">Anonymous</label>
                </div>
            </div>

                
            {/*---------1st Row---------*/}
                <div className={`flex justify-between grid grid-cols-2 gap-2 pl-3 pr-3 mt-3  ${anonymous ? "opacity-50" : ''}`}>
                    <label className="font-semibold">Name<span className="text-red-500"> *</span> :</label>
                    <label className="font-semibold">Email<span className="text-red-500"> *</span> :</label>

                    {/* Name Validation */}
                    <input type="text"
                        value={name}
                        onKeyDown={(e) => {
                            const key = e.key;
                            const isLetter = /^[a-zA-z ]$/.test(key);
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
                    className="border border-gray-300 rounded-md w-full p-2" placeholder="Enter Your Name" disabled={anonymous} required />


                    {/* Email validation */}
                    <input type="email"
                        value={email}
                        onKeyDown={(e) => {
                            const key = e.key;
                            const isEmailLetter = /^[a-zA-Z0-9.@]$/.test(key)
                            const isBackspace = key === 'Backspace';

                            const isValid = isBackspace || isEmailLetter;

                            if(!isValid){
                                e.preventDefault();
                            }
                        }}

                        onChange={(e) => {
                            const newVal = e.target.value;
                            setEmail(newVal);
                        }}

                                            
                        onBlur={() => {
                            const validEmailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
                            if (!validEmailRegex.test(email)) {
                                setemailError(true);

                            } else {
                                setemailError(false);
                            }
                        }}
                                      
                        className={`border ${errormail ? "border-red-500 shadow-sm shadow-red-400" : "border-gray-300"} rounded-md w-full p-2`} 
                        placeholder="xxxxx@gmail.com"  required disabled={anonymous} /> 

                </div>

            {/*---------2nd Row---------*/}
            <div className={`flex justify-between grid grid-cols-2 gap-2 pl-3 pr-3 mt-3 ${anonymous ? "opacity-50" : ''}`}>
                    <label className="font-semibold">Contact No.<span className="text-red-500"> *</span> :</label>
                    <label className="font-semibold">NIC<span className="text-red-500"> *</span> :</label>


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
                        
                        onBlur={() => {
                            const validPhone = /^\d{10}$/;
        
                            if (!validPhone.test(contactNo)) {
                                setnumError(true);

                            } else {
                                setnumError(false);
                            }
                        }}
                                      
                        className={`border ${errornum ? "border-red-500 shadow-sm shadow-red-400" : "border-gray-300"} rounded-md w-full p-2`} 
                        placeholder="0312369850" disabled={anonymous} required />   


                    {/* NIC validation */}
                    <input type="text"
                           value={NIC}
                           onKeyDown={(e) => {
                            const key = e.key;
                            const isnicDigit = /^[0-9Vv]$/.test(key);
                            const isBackspace = key === 'Backspace';

                            const isValid = isBackspace || isnicDigit;

                            if(!isValid){
                                e.preventDefault();
                            }
                        }}

                        onChange={(e) => {
                            const validNic = e.target.value;
                            
                            if(/^[0-9Vv]*$/.test(validNic)){
                                setnic(validNic);
                            }
                        }}
                        minLength={10}
                        maxLength={12}

                        onBlur={() => {
                            const validnicold = /^\d{9}[Vv]$/;
                            const validnicnew = /^\d{12}$/;
        
                            if (!(validnicold.test(NIC) || validnicnew.test(NIC))) {
                                setnicError(true);

                            } else {
                                setnicError(false);
                            }
                        }}
                                      
                        className={`border ${errnic ? "border-red-500 shadow-sm shadow-red-400" : "border-gray-300"} rounded-md w-full p-2`}                        
                        placeholder="Enter your NIC"
                        disabled={anonymous} required />         
                </div>

                {/* <hr className="border-gray-400 opacity-50 mt-5 " /> */}


            {/*----------Incident Details----------*/}
                <h2 className="p-3 font-bold text-xl">Incident Details</h2>

                {/*---------1st Row---------*/}
                <div className="flex justify-between grid grid-cols-2 gap-2 pl-3 pr-3 mt-2 ">
                    <label className="font-semibold">Crime Type<span className="text-red-500"> *</span> :</label>
                    <label className="font-semibold">Severity<span className="text-red-500"> *</span> :</label>

                    {/* Crime Type */}
                    <select className="border border-gray-300 rounded-md w-full p-2 " onChange={(e) => setType(e.target.value)} required>
                        <option value=""/>
                        <option value="violence">Violence</option>
                        <option value="cyber">Cyber</option>
                        <option value="property">Property</option>
                        <option value="drug-related">Drug-Related</option>
                        <option value="robbery">Robbery</option>
                        <option value="other">Other</option>
                        
                    </select>

                    {/* Severity */}
                    <select className="border border-gray-300 rounded-md w-full p-2 " onChange={(e) => setSevere(e.target.value)} required>
                        <option value=""/>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>    

                </div>

            {/*---------2nd Row---------*/}
            <div className="flex justify-between grid grid-cols-2 gap-2 pl-3 pr-3 mt-3">
                    <label className="font-semibold">Date & Time<span className="text-red-500"> *</span> :</label>
                    <label className="font-semibold">District<span className="text-red-500"> *</span> :</label>

                    <input type="datetime-local" className="border border-gray-300 rounded-md w-full p-2" onChange={(e) => setDatetime(e.target.value)} required />  

                    {/*--------Location-------*/}
                    <select className="border border-gray-300 rounded-md w-full p-2 " onChange={(e) => setDistrict(e.target.value)} required >
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
                            <option value="matara">Matara</option>
                            <option value="puttalam">Puttalam</option>

                        
                    </select>         
                </div>

                {/*---------3rd Row---------*/}
                <div className="pl-3 pr-3 pt-3">
                    <label className="font-semibold">Description<span className="text-red-500"> *</span> :</label>
                    <textarea className="border border-gray-300 rounded-md w-full p-2 mt-3" placeholder="Description about the incident" onChange={(e) => setDescription(e.target.value)} required />                    
                </div>

                {/*---------4th Row---------*/}
                <div className="pl-3 pr-3 pb-3">
                    <label className="font-semibold">Images :</label>
                    <input type="file" name="image" className="border border-gray-300 rounded-md w-full p-4 mt-3" placeholder="Description about the incident" onChange={(e) => setImage(e.target.files[0])} />                    
                </div>

                <div className="p-3 flex items-center">
                    <input type="checkbox" className="w-5 h-5" required/>
                    <label className="pl-3">I hereby confirm that all the information provided is accurate and true to the best of my knowledge.</label>
                </div>

                <div className="flex justify-end">
                <button value={submit} onClick={submit} className="bg-amber-800 text-white font-bold py-3 px-5 rounded-lg opacity-80 transition duration-300 ease-in-out transform hover:scale-105 mr-3 mt-4">
                    Submit
                </button>
</div>

           
            </form>
        </div>
        </div>


    );
}

export default Report;