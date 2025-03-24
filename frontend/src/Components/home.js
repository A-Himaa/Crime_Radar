import React from "react";
import backgroundvid from "../Images/background.mp4";
import tips from "../Images/tips.png";
import maps from "../Images/map.png";
import anp from "../Images/anp.png";
import law from "../Images/law.png";
import police from "../Images/img1.jpg";
import mess from "../Images/img2.jpg";



function home(){
    return(
    <div className="relative w-full overflow-hidden">

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-[85vh] object-cover"
        onLoadedMetadata={(e) => (e.target.playbackRate = 0.75)}
      >
        <source src={backgroundvid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient */}
      <div className="absolute top-0 left-0 w-full h-[85vh] bg-black bg-opacity-25"></div>




      {/* Home content */}
      <div className="relative w-full min-h-screen flex text-m pt-16 text-white my-50 top-[26vh]">
        <div className="absolute left-16  text-lg bg-gray-50 bg-opacity-25 p-2 px-5 rounded-full">
            Welcome to Crime Radar
        </div>

        <div className="absolute left-16 text-3xl font-bold tracking-wider leading-normal pl-3 pt-12">
        SEE IT REPORT IT STOP  IT <br />
        TOGETHER FOR A TOMORROW !
        </div>

        <div className="absolute left-16 text-lg pl-3 pt-36">
        Your go-to platform for real-time crime tracking and awareness.<br /> Our interactive crime map, safety alerts, and reporting tools empower <br />you to stay informed and take action.
        </div>

        {/*---------Scroll Button--------- */}
        <div className="absolute text-lg pl-3 pt-64 left-16">
        <a href="/">
            <button className="py-2 px-6 border-2 border-white bg-transparent text-white">Scroll To Know More</button>
        </a>
       </div>

        
      </div>      

       {/* Why crime Radar */}
       <div className="flex items-center justify-center pb-16 -mt-6 ">

        <div className="w-[90vw] items-center justify-center rounded-xl m-0 bg-[#DABEB5] bg-opacity-50 pb-6">

          <div>
             <h1 className="text-4xl pl-10 pt-8 font-bold text-gray-800 pb-5">Why <span className="text-amber-600">C</span>rime <span className="text-amber-600">R</span>adar?</h1>
          </div>
          

          <div className="grid grid-cols-2 pb-5 ">

            {/*---------Tips--------- */}

            <div className="p-6 bg-[#DABEB5] rounded-xl ml-8 mr-4 transform transition-all duration-700 hover:scale-105">              
              <div>
                <img src={tips} className="w-10 opacity-75"/>

              </div>
              <h1 className="text-2xl font-bold text-gray-800 pt-2">Safety Tips & Alerts</h1>
              <p className="text-lg pt-2">Stay informed with expert safety advice and real-time alerts to help you stay protected.</p>
            </div>

            {/*---------Map----------*/}

            <div className="p-6 bg-[#DABEB5] rounded-xl ml-4 mr-8 transform transition-all duration-700 hover:scale-105">
              <div>
                <img src={maps} className="w-10 opacity-75"/>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 pt-2">Interactive Crime Map</h1>
              <p className="text-lg pt-2">Visualize crime hotspots with a detailed, user-friendly map that helps you make informed decisions.</p>
            </div>

          </div>



          <div className="grid grid-cols-2 pb-5 ">

          {/*---------Anonymous--------- */}

          <div className="p-6 bg-[#DABEB5] rounded-xl ml-8 mr-4 transform transition-all duration-700 hover:scale-105">              
            <div>
              <img src={anp} className="w-10 opacity-75"/>

            </div>
            <h1 className="text-2xl font-bold text-gray-800 pt-2">Anonymous Reporting</h1>
            <p className="text-lg pt-2">Easily share safety concerns without revealing your identity, encouraging more participation.</p>
          </div>

          {/*---------Law----------*/}

          <div className="p-6 bg-[#DABEB5] rounded-xl ml-4 mr-8 transform transition-all duration-700 hover:scale-105">
            <div>
              <img src={law} className="w-10 opacity-75"/>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 pt-2">Connect With Law Enforcement</h1>
            <p className="text-lg pt-2">Collaborates with local authorities to receive accurate and reliable information for better safety.</p>
          </div>

          </div>
          
        </div>
        
      </div>   

      {/*---------------Short descriptions-------------------*/}

      <div className="flex flex-col items-center justify-center w-full">
        {/* First Row */}
        <div className="flex items-center justify-center w-[90vw]">

          <img src={police} className="w-[30vw] opacity-90 mr-24 ml-20 -mt-10"/>
          <p className="text-left text-xl ml-12 mr-12 ">
            <span className="text-3xl font-bold ">C</span>onnect with us to get immediate access to emergency contacts and reach law enforcement, 
            medical services quickly. Crime Radar offers real-time safety instructions, ensuring 
            citizens know how to act in an emergency situation.
            <br />
            Crime Radar ensures that you have the tools to handle emergencies efficiently, providing 
            peace of mind when it matters most.
          </p>

        </div>

        {/* Second Row */}
        <div className="flex items-center justify-center w-[90vw] -mt-10">

          <p className="text-left text-xl max-w-[50vw] -ml-10 pr-28">
          <span className="text-3xl font-bold ">C</span>rime Radar prioritizes your well-being by offering real-time alerts about nearby 
            criminal activity. The app keeps you informed about potential dangers, helping you make 
            safer decisions in your daily routine.
            <br />
            With access to detailed crime data, you can stay updated on local crime trends and take 
            preventive measures.
          </p>
          <img src={mess} className="w-[30vw] opacity-90 -mt-5"/>
        </div>
      </div>

      <div>
        <div>
          <h1 className="text-4xl pl-10 pt-8 font-bold text-gray-800 pb-5 text-center pt-8">
          <span className="text-amber-600">D</span>on't Be the <span className="text-amber-600">N</span>ext Target !</h1>
        </div>

        <div></div>
      </div>


 
    </div>
      

    );
}

export default home;

