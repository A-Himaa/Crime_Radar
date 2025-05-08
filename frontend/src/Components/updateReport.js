import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UpdateCrimeReport = () => {
  const { id } = useParams();
  const isUpdateMode = !!id;

  const navigate = useNavigate();

  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setcontactNo] = useState('');
  const [NIC, setnic] = useState('');
  const [type, setType] = useState('');
  const [severity, setSevere] = useState('');
  const [datetime, setDatetime] = useState('');
  const [district, setDistrict] = useState('');
  const [description, setDescription] = useState('');
  const [image,setImage] = useState('');
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [removeExistingImage, setRemoveExistingImage] = useState(false);



  const [errormail, setemailError] = useState(false);
  const [errornum, setnumError] = useState(false);
  const [errnic, setnicError] = useState(false);


//Retreiving crime details for update
  useEffect(() => {
    if (isUpdateMode) {
      const fetchReport = async () => {
        try {
          const res = await fetch(`http://localhost:8070/report/crimeDetails/${id}`);
          const data = await res.json();

          setAnonymous(data.anonymous);
          setName(data.name || '');
          setEmail(data.email || '');
          setcontactNo(data.contactNo || '');
          setnic(data.NIC || '');
          setType(data.type || '');
          setSevere(data.severity || '');
          setDatetime(data.datetime?.slice(0, 16) || '');
          setDistrict(data.district || '');
          setDescription(data.description || '');
          setExistingImageUrl(data.image || '');

        } catch (err) {
          console.error("Error fetching report:", err);
        }
      };

      fetchReport();
    }
  }, [id, isUpdateMode]);

//Insert new data
  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('anonymous', anonymous);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('contactNo', contactNo);
    formData.append('NIC', NIC);
    formData.append('type', type);
    formData.append('severity', severity);
    formData.append('datetime', datetime);
    formData.append('district', district);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    } else if (removeExistingImage) {
      formData.append('removeImage', 'true'); 
    }
    

    try {
      const url = isUpdateMode
        ? `http://localhost:8070/report/updateCrime/${id}`
        : `http://localhost:8070/report/newCrime`; 

      const res = await fetch(url, {
        method: isUpdateMode ? 'PUT' : 'POST',
        body: formData,
      });

      

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: isUpdateMode ? 'Report Updated!' : 'Report Created!',
          text: isUpdateMode
            ? 'Your report was updated successfully.'
            : 'Your report has been created successfully.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/newreport');
        })
        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.error || 'Cannot update your report. Please try again.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
        
      }
      
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit the form.");
    }
  };

  return (
    <div className="w-full flex justify-center items-center bg-gradient-to-b from-stone-200 to-orange-50">
      <div className="bg-white rounded-xl shadow-xl px-8 py-6 w-[80vw] mt-[15vh] mb-[18vh]">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          <span className="text-amber-600">{isUpdateMode ? 'U' : 'R'}</span>{isUpdateMode ? 'pdate' : 'eport'} <span className="text-amber-600">N</span>ow
        </h2>
        <form className="text-gray-800 pl-8 pr-8" onSubmit={submit} encType="multipart/form-data">
          <div className="flex justify-between mb-4">
            <h2 className="p-3 font-bold text-xl">User Information</h2>
            <div className="p-3 rounded-md">
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="w-5 h-5" />
              <label className="pl-3 font-semibold">Anonymous</label>
            </div>
          </div>

          {/* Form Fields (same as you already have) */}
          {/* Example: */}
              
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
                        placeholder="0112XXXXXX" disabled={anonymous} required />   


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
                    <select className="border border-gray-300 rounded-md w-full p-2 "
                      value={type}
                      onChange={(e) => setType(e.target.value)} required>

                        <option value=""/>
                        <option value="violence">Violence</option>
                        <option value="cyber">Cyber</option>
                        <option value="property">Property</option>
                        <option value="drug-related">Drug-Related</option>
                        <option value="robbery">Robbery</option>
                        <option value="other">Other</option>
                        
                    </select>

                    {/* Severity */}
                    <select className="border border-gray-300 rounded-md w-full p-2 "
                      value={severity}
                      onChange={(e) => setSevere(e.target.value)} required>
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

                    <input type="datetime-local" className="border border-gray-300 rounded-md w-full p-2" 
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)} required />  

                    {/*--------Location-------*/}
                    <select className="border border-gray-300 rounded-md w-full p-2 " 
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)} required >
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
                    <textarea className="border border-gray-300 rounded-md w-full p-2 mt-3" placeholder="Description about the incident" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} required />                    
                </div>

                {/*---------4th Row---------*/}
                <div className="pl-3 pr-3 pb-3">
                    <label className="font-semibold">Images :</label>
                    {existingImageUrl && !removeExistingImage ? (
                          <div className="mt-3">
                            <p className="font-semibold">Previously uploaded image:</p>
                            <img src={existingImageUrl} alt="Previously uploaded" className="w-48 rounded shadow mb-2" />
                            <button
                              type="button"
                              onClick={() => setRemoveExistingImage(true)}
                              className="text-red-600 underline"
                            >
                              Remove image
                            </button>
                          </div>
                        ) : (
                          <div className="mt-3">
                            <label className="font-semibold">Upload New Image:</label>
                            <input
                              type="file"
                              name="image"
                              className="border border-gray-300 rounded-md w-full p-4 mt-2"
                              onChange={(e) => setImage(e.target.files[0])}
                            />
                          </div>
                        )}
 
                </div>

                <div className="p-3 flex items-center">
                    <input type="checkbox" className="w-5 h-5" required/>
                    <label className="pl-3">I hereby confirm that all the information provided is accurate and true to the best of my knowledge.</label>
                </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-amber-800 text-white font-bold py-3 px-5 rounded-lg opacity-80 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {isUpdateMode ? "Update Report" : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCrimeReport;
