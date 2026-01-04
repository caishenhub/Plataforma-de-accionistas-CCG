
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FINANCIAL_HISTORY } from '../../constants';

interface EvolutionChartProps {
  year: number;
}

const MONTH_NAMES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

const EvolutionChart: React.FC<EvolutionChartProps> = ({ year }) => {
  
  const chartData = useMemo(() => {
    const yields = FINANCIAL_HISTORY[year] || FINANCIAL_HISTORY[2025];
    let cumulativeValue = 100; // Índice Base
    
    return yields.map((y, index) => {
      cumulativeValue = cumulativeValue * (1 + y / 100);
      return {
        name: MONTH_NAMES[index],
        value: parseFloat(cumulativeValue.toFixed(2)),
        yield: y >= 0 ? `+${y}%` : `${y}%`
      };
    });
  }, [year]);

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 10 }}>
          <defs>
            <linearGradient id="colorEvolution" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ccfd08" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ccfd08" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f4e6" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 800 }}
            dy={15}
          />
          <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1d1c2d', 
              border: 'none', 
              borderRadius: '16px',
              padding: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}
            itemStyle={{ color: '#ccfd08', fontSize: '12px', fontWeight: 900 }}
            labelStyle={{ color: '#9CA3AF', fontSize: '10px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}
            cursor={{ stroke: '#1d1c2d', strokeWidth: 2, strokeDasharray: '4 4' }}
            formatter={(value: any) => [`${value} Pts`, 'Caishen Index']}
          />
          <Area 
            key={year}
            type="monotone" 
            dataKey="value" 
            stroke="#1d1c2d" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorEvolution)" 
            dot={{ r: 5, fill: '#ccfd08', stroke: '#1d1c2d', strokeWidth: 2 }}
            activeDot={{ r: 7, fill: '#ccfd08', stroke: '#1d1c2d', strokeWidth: 2 }}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EvolutionChart;
