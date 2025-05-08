import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Define COLORS for the pie chart segments
const COLORS = ["#EF476F", "#FF6B3C", "#FFBF00", "#06D6A0", "#118AB2", "#073B4C"];


const CrimeTypePieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8070/report/crimeDetails")
      .then((res) => {
        const grouped = {};
        res.data.forEach((crime) => {
          grouped[crime.type] = (grouped[crime.type] || 0) + 1;
        });
        const chartData = Object.entries(grouped).map(([type, count]) => ({
          name: type.toUpperCase(),
          value: count
        }));
        setData(chartData);
      })
      .catch((err) => console.error('Error fetching data:', err)); // Handle any errors
  }, []);

  const CustomLegend = ({ payload }) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '5px',
      marginTop: '5px'
    }}>
      {payload.map((entry, index) => (
        <div key={`item-${index}`} style={{ color: entry.color }}>
          ● {entry.value}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white p-2 rounded-2xl shadow-lg h-[vh] w-[30vw] my-6 ml-0"
    style={{
      boxShadow: '0 4px 12px rgba(31, 41, 55, 0.5)' // gray-800: rgb(31, 41, 55)
    }}>
      <h2 className="text-xl font-bold mb-4 text-center mt-2">Crime Type Distribution</h2>
      <div className="flex justify-center">
        <PieChart width={500} height={300}>
          <Pie data={data} cx="50%" cy="50%">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend content={<CustomLegend />} />

        </PieChart>
      </div>
    </div>
  );
};

export default CrimeTypePieChart;
