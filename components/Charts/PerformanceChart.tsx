
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// DATOS MOCK
const data2022 = [
  { name: 'Ene', portfolio: 34272000, benchmark: 34106400, pYield: -4.80, bYield: -5.26 },
  { name: 'Feb', portfolio: 33038208, benchmark: 33035459, pYield: -3.60, bYield: -3.14 },
  { name: 'Mar', portfolio: 33831125, benchmark: 34218128, pYield: 2.40, bYield: 3.58 },
  { name: 'Abr', portfolio: 30583337, benchmark: 31206933, pYield: -9.60, bYield: -8.80 },
  { name: 'May', portfolio: 30216337, benchmark: 31210053, pYield: -1.20, bYield: 0.01 },
  { name: 'Jun', portfolio: 27829246, benchmark: 28591529, pYield: -7.90, bYield: -8.39 },
  { name: 'Jul', portfolio: 29610318, benchmark: 31196218, pYield: 6.40, bYield: 9.11 },
  { name: 'Ago', portfolio: 28455515, benchmark: 29873501, pYield: -3.90, bYield: -4.24 },
  { name: 'Sep', portfolio: 26122163, benchmark: 27083316, pYield: -8.20, bYield: -9.34 },
  { name: 'Oct', portfolio: 27585004, benchmark: 29247273, pYield: 5.60, bYield: 7.99 },
  { name: 'Nov', portfolio: 28467724, benchmark: 30820776, pYield: 3.20, bYield: 5.38 },
  { name: 'Dic', portfolio: 26731193, benchmark: 29002350, pYield: -6.10, bYield: -5.90 },
];
const data2023 = [
  { name: 'Ene', portfolio: 39292000, benchmark: 40348400, pYield: 3.40, bYield: 6.18 },
  { name: 'Feb', portfolio: 40411822, benchmark: 39295306, pYield: 2.85, bYield: -2.61 },
  { name: 'Mar', portfolio: 39563173, benchmark: 40674571, pYield: -2.10, bYield: 3.51 },
  { name: 'Abr', portfolio: 41244608, benchmark: 41268419, pYield: 4.25, bYield: 1.46 },
  { name: 'May', portfolio: 42853148, benchmark: 41371590, pYield: 3.90, bYield: 0.25 },
  { name: 'Jun', portfolio: 44031609, benchmark: 44048332, pYield: 2.75, bYield: 6.47 },
  { name: 'Jul', portfolio: 43305087, benchmark: 45418235, pYield: -1.65, bYield: 3.11 },
  { name: 'Ago', portfolio: 45730172, benchmark: 44614332, pYield: 5.60, bYield: -1.77 },
  { name: 'Sep', portfolio: 44381132, benchmark: 42441614, pYield: -2.95, bYield: -4.87 },
  { name: 'Oct', portfolio: 46511426, benchmark: 41507900, pYield: 4.80, bYield: -2.20 },
  { name: 'Nov', portfolio: 47488166, benchmark: 45210405, pYield: 2.10, bYield: 8.92 },
  { name: 'Dic', portfolio: 48366697, benchmark: 47208705, pYield: 1.85, bYield: 4.42 },
];
const data2024 = [
  { name: 'Ene', portfolio: 41240000, benchmark: 40636000, pYield: 3.10, bYield: 1.59 },
  { name: 'Feb', portfolio: 42250380, benchmark: 42736881, pYield: 2.45, bYield: 5.17 },
  { name: 'Mar', portfolio: 41489873, benchmark: 44061724, pYield: -1.80, bYield: 3.10 },
  { name: 'Abr', portfolio: 43398407, benchmark: 42228756, pYield: 4.60, bYield: -4.16 },
  { name: 'May', portfolio: 45655124, benchmark: 44255737, pYield: 5.20, bYield: 4.80 },
  { name: 'Jun', portfolio: 47412846, benchmark: 45791410, pYield: 3.85, bYield: 3.47 },
  { name: 'Jul', portfolio: 46322351, benchmark: 46308853, pYield: -2.30, bYield: 1.13 },
  { name: 'Ago', portfolio: 49287000, benchmark: 47364695, pYield: 6.40, bYield: 2.28 },
  { name: 'Sep', portfolio: 50716304, benchmark: 48321461, pYield: 2.90, bYield: 2.02 },
  { name: 'Oct', portfolio: 52821030, benchmark: 47843068, pYield: 4.15, bYield: -0.99 },
  { name: 'Nov', portfolio: 53745398, benchmark: 50584476, pYield: 1.75, bYield: 5.73 },
  { name: 'Dic', portfolio: 54793433, benchmark: 49319864, pYield: 1.95, bYield: -2.50 },
];
const data2025 = [
  { name: 'Ene', portfolio: 41608000, benchmark: 41080000, pYield: 4.02, bYield: 2.70 },
  { name: 'Feb', portfolio: 40775840, benchmark: 40496664, pYield: -2.00, bYield: -1.42 },
  { name: 'Mar', portfolio: 43222390, benchmark: 38168105, pYield: 6.00, bYield: -5.75 },
  { name: 'Abr', portfolio: 42574054, benchmark: 37878125, pYield: -1.50, bYield: -0.76 },
  { name: 'May', portfolio: 45554238, benchmark: 40207630, pYield: 7.00, bYield: 6.15 },
  { name: 'Jun', portfolio: 47604179, benchmark: 42201928, pYield: 4.50, bYield: 4.96 },
  { name: 'Jul', portfolio: 49032304, benchmark: 43117710, pYield: 3.00, bYield: 2.17 },
  { name: 'Ago', portfolio: 51076951, benchmark: 43941258, pYield: 4.17, bYield: 1.91 },
  { name: 'Sep', portfolio: 52251721, benchmark: 45492384, pYield: 2.30, bYield: 3.53 },
  { name: 'Oct', portfolio: 53390808, benchmark: 46525061, pYield: 2.18, bYield: 2.27 },
  { name: 'Nov', portfolio: 54672188, benchmark: 46585544, pYield: 2.40, bYield: 0.13 },
  { name: 'Dic', portfolio: 55902312, benchmark: 46562251, pYield: 2.25, bYield: -0.05 },
];

const CustomTooltip = ({ active, payload, label, year }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const colorCaishen = item.pYield >= 0 ? 'text-primary' : 'text-red-400';
    const colorSP500 = item.bYield >= 0 ? 'text-white' : 'text-red-400';
    
    return (
      <div className="bg-[#1d1c2d] border-none rounded-2xl p-4 shadow-2xl ring-1 ring-white/10 scale-90 md:scale-100 origin-top-left">
        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3 border-b border-white/5 pb-2">
          {label} {year}
        </p>
        <div className="space-y-1.5 min-w-[150px]">
          <div className="flex justify-between items-center gap-6">
            <span className="text-[11px] font-bold text-white/70 uppercase">CCG</span>
            <span className={`text-xs font-black ${colorCaishen}`}>
              {item.pYield > 0 ? '+' : ''}{item.pYield}%
            </span>
          </div>
          <div className="flex justify-between items-center gap-6">
            <span className="text-[11px] font-bold text-white/70 uppercase">SPY500</span>
            <span className={`text-xs font-black ${colorSP500}`}>
              {item.bYield > 0 ? '+' : ''}{item.bYield}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const PerformanceChart: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const getActiveData = () => {
    switch (selectedYear) {
      case 2022: return data2022;
      case 2023: return data2023;
      case 2024: return data2024;
      default: return data2025;
    }
  };
  const activeData = getActiveData();

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <div className="flex justify-center md:justify-start">
        <div className="bg-surface-subtle p-1 rounded-2xl border border-surface-border flex gap-1 shadow-sm overflow-x-auto hide-scrollbar max-w-full">
          {[2022, 2023, 2024, 2025].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-xl text-[9px] md:text-xs font-black transition-all uppercase tracking-widest whitespace-nowrap ${
                selectedYear === year 
                ? 'bg-accent text-primary shadow-lg' 
                : 'text-text-muted hover:text-accent'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={activeData} 
            margin={{ top: 10, right: 5, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ceff04" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ceff04" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: '#9CA3AF', fontWeight: 700 }}
              interval="preserveStartEnd"
              dy={10}
            />
            <YAxis hide domain={['dataMin - 2000000', 'dataMax + 2000000']} />
            <Tooltip content={<CustomTooltip year={selectedYear} />} />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle"
              wrapperStyle={{ paddingBottom: '20px', fontSize: '9px', fontWeight: 800, textTransform: 'uppercase' }}
              formatter={(value) => <span className="text-text-main ml-1">{value === 'portfolio' ? 'CCG' : 'SPY500'}</span>}
            />
            <Area 
              type="monotone" 
              dataKey="benchmark" 
              name="benchmark"
              stroke="#1d1c2d" 
              strokeWidth={1.5} 
              strokeDasharray="4 4"
              fill="transparent" 
            />
            <Area 
              type="monotone" 
              dataKey="portfolio" 
              name="portfolio"
              stroke="#ceff04" 
              strokeWidth={3} 
              fill="url(#colorPortfolio)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
