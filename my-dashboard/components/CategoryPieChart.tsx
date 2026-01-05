"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = [
  "#7c3aed", 
  "#10b981", 
  "#f59e0b", 
  "#f43f5e", 
  "#3b82f6", 
];

const MOCK_DATA = [
  { name: "Electronics", value: 45000 },
  { name: "Clothing", value: 32000 },
  { name: "Home", value: 24000 },
  { name: "Books", value: 12000 },
  { name: "Accessories", value: 8500 },
];

interface CategoryPieChartProps {
  data?: { name: string; value: number }[];
}

export function CategoryPieChart({ data = MOCK_DATA }: CategoryPieChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65} 
            outerRadius={105}
            paddingAngle={5} 
            cornerRadius={8} 
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                className="transition-all duration-300 hover:opacity-80 focus:outline-none"
              />
            ))}
          </Pie>
          
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-xl shadow-gray-200/50">
                    <div className="flex items-center gap-2 mb-1">
                      <div 
                        className="h-2 w-2 rounded-full ring-2 ring-white" 
                        style={{ backgroundColor: payload[0].color }}
                      />
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {data.name}
                      </span>
                    </div>
                    <p className="text-lg font-extrabold text-gray-900">
                      ₹{Number(data.value).toLocaleString('en-IN')}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs font-semibold text-gray-500 ml-1">{value}</span>
            )} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}