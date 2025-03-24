import React from "react";
import logo from "../Images/Logo.png";




function header(){
    return(
        <div className="headerbody">
            <nav className="bg-transparent fixed top-0 left-0 w-full h-[15vh] pl-12 pr-10">

                <div className="max-w-7xl flex justify-between ">

                    {/*---------Logo---------*/}
                    <a href="/"><img src={logo} alt="" className="w-[10vw] max-w-xs mx-5 my-2" /></a>

                    {/*----------Navigation Links----------------- */}
                    <div className="flex  space-x-20 text-white text-lg my-12">
                        <a href="">HOME</a>
                        <a href="">STAY AWARE</a>
                        <a href="">QUICK REPORT</a>
                        <a href="">SECURE PASS</a>
                        <a href="/riskScope">RISK SCOPE</a>

                    </div>
                </div>

            </nav>






        </div>






    );
}


export default header;