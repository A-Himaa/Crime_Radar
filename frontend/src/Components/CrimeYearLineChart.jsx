import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Utility to get all dates between two dates
const getAllDates = (startDate, endDate) => {
  const dateArray = [];
  const current = new Date(startDate);
  while (current <= new Date(endDate)) {
    dateArray.push(new Date(current).toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
  return dateArray;
};

const CrimeYearLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8070/report/crimeDetails")
      .then((res) => {
        const groupedByDate = {};

        res.data.forEach((crime) => {
          const dateObj = new Date(crime.datetime || crime.createdAt);
          const date = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
          groupedByDate[date] = (groupedByDate[date] || 0) + 1;
        });

        const allDates = Object.keys(groupedByDate).sort();
        const startDate = allDates[0];
        const endDate = allDates[allDates.length - 1];
        const fullDates = getAllDates(startDate, endDate);

        const chartData = Object.entries(groupedByDate).map(([date, count]) => ({
          date,
          count
        })).sort((a, b) => new Date(a.date) - new Date(b.date));

        setData(chartData);
      });
  }, []);

  // Format date to show month and day (MM/DD)
  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }); // MM/DD format
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-[50vw] my-6">
      {/* Title fixed above scrollable chart */}
      <h2 className="text-xl font-bold mb-4 text-center">Crimes by Date</h2>

      {/* Scrollable chart */}
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <LineChart width={1000} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={70}
              tickFormatter={formatDate}  // Format date on the X axis
              label={{ value: 'Date', position: 'outsideTop' }}
            />
            <YAxis label={{ value: 'Number of Crimes', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#0088FE" name="Number of Crimes" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default CrimeYearLineChart;
