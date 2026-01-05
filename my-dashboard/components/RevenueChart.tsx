"use client";

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 3200 },
  { name: "Apr", total: 4500 },
  { name: "May", total: 3800 },
  { name: "Jun", total: 5200 },
  { name: "Jul", total: 4100 },
  { name: "Aug", total: 5600 },
  { name: "Sep", total: 6100 },
  { name: "Oct", total: 5800 },
  { name: "Nov", total: 6500 },
  { name: "Dec", total: 7200 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f3f4f6" />
        
        <XAxis 
          dataKey="name" 
          stroke="#9ca3af" 
          fontSize={11} 
          fontWeight={500}
          tickLine={false} 
          axisLine={false} 
          tickMargin={12}
        />
        
        <YAxis 
          stroke="#9ca3af" 
          fontSize={11} 
          fontWeight={500}
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(value) => `₹${value}`} 
        />
        
        <Tooltip
          cursor={{ stroke: '#e5e7eb', strokeWidth: 1, strokeDasharray: '4 4' }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-xl shadow-gray-200/50">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {label}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-violet-600 ring-2 ring-violet-100" />
                    <span className="text-lg font-extrabold text-gray-900">
                      ₹{Number(payload[0].value).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        
        <Area 
          type="monotone" 
          dataKey="total" 
          stroke="#7c3aed" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorRevenue)" 
          activeDot={{ r: 6, strokeWidth: 0, fill: '#7c3aed' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}