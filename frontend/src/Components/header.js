import React from "react";
import logo from "../Images/Logo.png";




function header(){
    return(
        <div className="headerbody">
            <nav className="bg-transparent bg-opacity-50 backdrop-blur-md fixed top-0 left-0 w-full h-[15vh] bg-[#5a250d] ">

                <div className="max-w-7xl h-[15vh] flex justify-between ">

                    {/*---------Logo---------*/}
                    <a href="/"><img src={logo} alt="" className="w-[12vw] max-w-xs pl-8" /></a>

                    {/*----------Navigation Links----------------- */}
                    <div className="flex  space-x-20 text-white text-lg my-12">
                        <a href="">HOME</a>
                        <a href="">STAY AWARE</a>
                        <a href="">QUICK REPORT</a>
                        <a href="">SECURE PASS</a>
                        <a href="">QUICK REPORT</a>

                    </div>
                </div>

            </nav>






        </div>






    );
}


export default header;