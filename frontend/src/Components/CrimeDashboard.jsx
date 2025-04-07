import React from "react";
import CrimeMap from "./CrimeMap";
import CrimeTypePieChart from "./CrimeTypePieChart";
import CrimeYearLineChart from "./CrimeYearLineChart";
import DashboardMap from "./DashboardMap";

const CrimeDashboard = () => {
  return (
    <div className="p-4 bg-gradient-to-b from-stone-200 to-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10 mt-32  ">
         <span className="text-amber-600">C</span>rime <span className="text-amber-600">D</span>ashboard
     </h1>
        <DashboardMap />
      <div className="flex flex-nowrap justify-around ml-9 mt-9">
        <div className="w-[45%] ">
          <CrimeTypePieChart />
        </div>
        <div className="w-[65%] ml-16">
          <CrimeYearLineChart />
        </div>
      </div>
    </div>
  );
};

export default CrimeDashboard;
