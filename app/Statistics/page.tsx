"use client";

import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

const data = [
  { year: 2006, emission: 1292484600 },
  { year: 2007, emission: 1392506000 },
  { year: 2008, emission: 1489437400 },
  { year: 2009, emission: 1612216300 },
  { year: 2010, emission: 1677337200 },
  { year: 2011, emission: 1764712400 },
  { year: 2012, emission: 1925699700 },
  { year: 2013, emission: 1995098100 },
  { year: 2014, emission: 2148343800 },
  { year: 2015, emission: 2234219500 },
  { year: 2016, emission: 2354658000 },
  { year: 2017, emission: 2426606800 },
  { year: 2018, emission: 2593057800 },
  { year: 2019, emission: 2612888000 },
  { year: 2020, emission: 2421552000 },
  { year: 2021, emission: 2674221800 },
  { year: 2022, emission: 2831166200 },
  { year: 2023, emission: 3062324500 },
  { year: 2024, emission: 3262324500 },
  { year: 2025, emission: 3588556950 },
  { year: 2026, emission: 3947412645 },
  { year: 2027, emission: 4342153910 },
  { year: 2028, emission: 4776369301 },
  { year: 2029, emission: 5254006231 },
  { year: 2030, emission: 5779406854 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ff6384", "#36a2eb"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-md border border-gray-300">
        <p className="text-gray-700 font-semibold">Year: {payload[0].payload.year}</p>
        <p className="text-blue-500">Emissions: {payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const CarbonEmissionDashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">India Carbon Emission Growth</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-center mb-4">Trend Over the Years</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(tick) => `${(tick / 1e9).toFixed(1)}B`} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="emission" stroke="#8884d8" strokeWidth={3} fill="url(#colorEmissions)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-center mb-4">Yearly Carbon Emission</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(tick) => `${(tick / 1e9).toFixed(1)}B`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="emission" fill="#82ca9d" barSize={40} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-center mb-4">Emission Distribution (Recent Years)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={data.slice(-6)} dataKey="emission" nameKey="year" cx="50%" cy="50%" outerRadius={120} label>
              {data.slice(-6).map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CarbonEmissionDashboard;
