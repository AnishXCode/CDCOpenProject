"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

// AethelNova Premium Palette
const COLORS = [
  "#0f172a", // Slate 900 (Darkest)
  "#3b82f6", // Blue 500 (Brand Primary)
  "#64748b", // Slate 500
  "#cbd5e1", // Slate 300
  "#06b6d4", // Cyan 500 (Accent)
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
            innerRadius={80} // Thinner ring for modern look
            outerRadius={110}
            paddingAngle={2} // Adds white space between segments
            dataKey="value"
            stroke="none" // Removes the default outline
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                className="stroke-white stroke-2 hover:opacity-80 transition-opacity duration-300"
              />
            ))}
          </Pie>
          
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="rounded-lg border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <div 
                        className="h-2 w-2 rounded-full" 
                        style={{ backgroundColor: payload[0].color }}
                      />
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {data.name}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-slate-900">
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
            formatter={(value) => (
              <span className="text-sm font-medium text-slate-600 ml-1">{value}</span>
            )} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}