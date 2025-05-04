import React from "react";
import CrimeTypePieChart from "./CrimeTypePieChart";
import CrimeYearLineChart from "./CrimeYearLineChart";

const Overview = () => {
  return (
    <div className="text-black mt-24 w-[82vw] px-8 py-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-2 text-center">
        <span className="text-amber-600">O</span>verview
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 text-gray-800">
        {/* Card 1 */}
        <div
          className="bg-white rounded-2xl p-6 text-center text-gray-800"
          style={{
            boxShadow: '0 4px 12px rgba(31, 41, 55, 0.5)' // gray-800: rgb(31, 41, 55)
          }}
        >
          <h2 className="text-xl font-semibold mb-2">Total Crimes Reported</h2>
          <p className="text-3xl font-bold text-amber-600">124</p>
        </div>


        {/* Card 2 */}
        <div
          className="bg-white rounded-2xl p-6 text-center text-gray-800"
          style={{
            boxShadow: '0 4px 12px rgba(31, 41, 55, 0.5)' 
          }}
        >
          <h2 className="text-xl font-semibold mb-2">Solved Reports</h2>
          <p className="text-3xl font-bold text-amber-600">124</p>
        </div>

        {/* Card 3 */}
        <div
          className="bg-white rounded-2xl p-6 text-center text-gray-800"
          style={{
            boxShadow: '0 4px 12px rgba(31, 41, 55, 0.5)' 
          }}
        >
          <h2 className="text-xl font-semibold mb-2">Total No. Of Users</h2>
          <p className="text-3xl font-bold text-amber-600">124</p>
        </div>

      </div>
      <div className="flex grid-cols-1 md:grid-cols-2 gap-10 mt-5 text-gray-800">
      <CrimeTypePieChart/>
      <CrimeYearLineChart/>
      </div>
    </div>
  );
};

export default Overview;
