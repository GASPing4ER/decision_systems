"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ data, y_axis }) => {
  return (
    <ResponsiveContainer width={600} height={300} className="border p-10">
      <BarChart
        width={150}
        height={40}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey={`${y_axis}`} fill="#AB7952" />
        <XAxis dataKey="name" />
        <YAxis />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
