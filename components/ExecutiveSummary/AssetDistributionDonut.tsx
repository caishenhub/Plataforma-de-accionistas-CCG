
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FINANCE_CONFIG } from '../../constants';

const data = [
  { name: 'Forex', value: 20.6, color: '#1d1c2d' },
  { name: 'Derivados', value: 30.9, color: '#D4AF37' },
  { name: 'Acciones', value: 10.3, color: '#60a5fa' },
  { name: 'Inmobiliario', value: 25.8, color: '#ccfd08' },
  { name: 'Algorítmico', value: 12.4, color: '#9CA3AF' },
];

const AssetDistributionDonut: React.FC = () => {
  return (
    <div className="h-48 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
            animationDuration={1500}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1d1c2d', border: 'none', borderRadius: '12px', color: '#fff' }}
            itemStyle={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-text-muted text-[10px] font-black uppercase tracking-tighter">Fondo Total</span>
        <span className="text-accent text-xl font-black tracking-tighter">
          ${(FINANCE_CONFIG.GLOBAL_AUM / 1000).toFixed(1)}k
        </span>
      </div>
    </div>
  );
};

export default AssetDistributionDonut;
