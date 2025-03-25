import React from "react";
import logo from "../Images/Logo.png";




function header(){
    return(
        <div className="headerbody">
            <nav className="bg-transparent bg-opacity-50 backdrop-blur-md fixed top-0 left-0 w-full h-[15vh] bg-[#5a250d] z-50 ">

                <div className="max-w-7xl h-[15vh] flex justify-between ">

                    {/*---------Logo---------*/}
                    <a href="/"><img src={logo} alt="" className="w-[12vw] max-w-xs pl-8" /></a>

                    {/*----------Navigation Links----------------- */}
                    <div className="flex  space-x-20 text-white text-lg items-center justify-end">
                        <a href="" className="hover:underline transition-all duration-500">HOME</a>
                        <a href="" className="hover:underline transition-all duration-300">QUICK REPORT</a>
                        <a href="" className="hover:underline transition-all duration-300">STAY AWARE</a>
                        <a href="/crimeMap" className="hover:underline transition-all duration-300">INSIGHTS</a>

                        <a href="">
                            <button className="border-2 -mr-12 p-2 pl-10 pr-10 hover:bg-amber-800 hover:text-white transition-colors duration-300">LOGIN</button>
                        </a>


                    </div>
                </div>
            </nav>
        </div>






    );
}


export default header;