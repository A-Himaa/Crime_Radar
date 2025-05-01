import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Define COLORS for the pie chart segments
const COLORS = ["#FF8042", "#00C49F", "#0088FE", "#FFBB28", "#AA336A", "#8884d8"];

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

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-[44vw] my-6 ml-2">
      <h2 className="text-xl font-bold mb-4 text-center">Crime Type Distribution</h2>
      <div className="flex justify-center">
        <PieChart width={500} height={300}>
          <Pie data={data} cx="50%" cy="50%">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default CrimeTypePieChart;
