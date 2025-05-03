import React, { useMemo } from "react";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend } from "recharts";

// Bubble colors by crime type
const typeColors = {
  Violence:      "#800000",
  Cyber:         "#0074D9",
  Property:      "#FF851B",
  "Drug-Related": "#2ECC40",
  Robbery:       "#B10DC9",
  Other:         "#AAAAAA"
};

export default function CrimeBubbleChart({ crimes }) {
    console.log("Crimes data:", crimes);
  // Group crimes by type and count
  const chartData = useMemo(() => {
    const grouped = {};
    crimes.forEach(crime => {
      if (!grouped[crime.type]) {
        grouped[crime.type] = { type: crime.type, count: 0, severity: 0 };
      }
      grouped[crime.type].count += 1;
      grouped[crime.type].severity += crime.severity === "High" ? 3 : crime.severity === "Medium" ? 2 : 1;
    });
    return Object.values(grouped).map((g, index) => ({
      ...g,
      x: index * 10,
      y: g.count,
      z: g.severity
    }));
  }, [crimes]);

  return (
    <div className="w-full h-[400px] mt-6 bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold mb-2">Crime Bubble Chart (by Type)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis dataKey="type" type="category" name="Type" />
          <YAxis dataKey="count" name="Count" />
          <ZAxis dataKey="severity" range={[60, 400]} name="Severity" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter
            name="Crimes"
            data={chartData}
            fill="#8884d8"
            shape="circle"
          >
            {
              chartData.map((entry, index) => (
                <circle
                  key={index}
                  fill={typeColors[entry.type] || "#8884d8"}
                  r={entry.z}
                />
              ))
            }
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
