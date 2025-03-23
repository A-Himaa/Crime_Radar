import React from "react";
import backgroundvid from "../Images/background.mp4";

function home(){
    return(
    <div className="relative w-full h-screen overflow-hidden p-10">

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        onLoadedMetadata={(e) => (e.target.playbackRate = 0.75)}
      >
        <source src={backgroundvid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25"></div>




      {/* Home content */}
      <div className="relative w-full h-screen flex text-m p-16 text-white my-50">
        <div className="absolute top-[35vh] left-16  text-lg bg-gray-50 bg-opacity-25 p-2 px-5 rounded-full">
            Welcome to Crime Radar
        </div>

        <div className="absolute top-[43vh] left-16 text-3xl font-bold tracking-wider leading-normal pl-3 pt-0">
        SEE IT REPORT IT STOP  IT <br />
        TOGETHER FOR A TOMORROW !
        </div>

        <div className="absolute top-[58vh] left-16 text-lg pl-3 pt-0">
        Your go-to platform for real-time crime tracking and awareness.<br /> Our interactive crime map, safety alerts, and reporting tools empower <br />you to stay informed and take action.
        </div>

        {/*---------Scroll Button--------- */}
        <div className="absolute top-[75vh] text-lg pl-3 pt-0">
        <a href="/">
            <button className="py-2 px-6 border-2 border-white bg-transparent text-white">Scroll To Know More</button>
        </a>
       </div>

        
      </div>

      
      

      
    </div>

    );
}

export default home;

