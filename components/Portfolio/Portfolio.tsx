
import React from 'react';
import { Building2, Globe, PieChart as PieIcon, Activity, Bitcoin, Coins, Landmark } from 'lucide-react';
import AssetDonutChart from './AssetDonutChart';
import { FINANCE_CONFIG } from '../../constants';

const Portfolio: React.FC = () => {
  // Actualización del rendimiento acumulado solicitado a 39.76%
  const accumulatedYield2025 = 39.76;

  const ASSET_DATA = [
    { id: 1, name: 'Divisas (Forex)', category: 'Forex', participacion: '20.6%', valor: `$${(25631).toLocaleString('en-US')}`, retorno: '+12.5%', icon: Globe, color: 'bg-gray-100' },
    { id: 2, name: 'Derivados', category: 'Derivados', participacion: '30.9%', valor: `$${(38447).toLocaleString('en-US')}`, retorno: '+8.9%', icon: Coins, color: 'bg-amber-50' },
    { id: 3, name: 'Equity (Acciones)', category: 'Acciones', participacion: '10.3%', valor: `$${(12815).toLocaleString('en-US')}`, retorno: '+15.2%', icon: Landmark, color: 'bg-indigo-50' },
    { id: 4, name: 'Inmobiliario', category: 'Inmobiliario', participacion: '25.8%', valor: `$${(32101).toLocaleString('en-US')}`, retorno: '+6.8%', icon: Building2, color: 'bg-primary/10' },
    { id: 5, name: 'Algorítmico', category: 'Algorítmico', participacion: '12.4%', valor: `$${(15428).toLocaleString('en-US')}`, retorno: '+22.1%', icon: Bitcoin, color: 'bg-blue-50' },
  ];

  return (
    <div className="p-4 md:p-10 space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-accent text-2xl md:text-4xl font-black tracking-tighter mb-1 uppercase">Composición del Portafolio</h1>
        <p className="text-text-secondary text-xs md:text-base font-medium">Participación proporcional única diversificada.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-5 bg-white rounded-3xl border border-surface-border p-5 md:p-8 shadow-sm flex flex-col">
          <h3 className="text-accent text-lg font-extrabold tracking-tight mb-8">Matriz de Distribución</h3>
          {/* Contenedor con altura explícita para Recharts */}
          <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
            <AssetDonutChart />
          </div>
        </div>

        <div className="xl:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              { label: 'Acumulado 2025', value: `+${accumulatedYield2025}%` },
              { label: 'Rendimiento Mes', value: `+${(FINANCE_CONFIG.CURRENT_MONTHLY_YIELD * 100).toFixed(2)}%` },
              { label: 'Reserva Técnica', value: '100%' }
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-surface-border rounded-2xl p-5 shadow-sm">
                <span className="text-text-muted text-[9px] font-black uppercase tracking-widest block mb-2">{stat.label}</span>
                <h4 className="text-xl md:text-2xl font-black text-accent tracking-tighter">{stat.value}</h4>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-surface-border shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-surface-border">
              <h3 className="text-accent text-lg font-extrabold tracking-tight">Detalle Operativo</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[500px]">
                <thead>
                  <tr className="bg-surface-subtle text-text-muted text-[10px] font-black uppercase tracking-widest border-b border-surface-border">
                    <th className="px-6 py-4">Sector</th>
                    <th className="px-6 py-4">Pct.</th>
                    <th className="px-6 py-4 text-right">USD</th>
                    <th className="px-6 py-4 text-right">Perf.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {ASSET_DATA.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${asset.color} text-accent shrink-0`}>
                            {React.createElement(asset.icon, { size: 16 })}
                          </div>
                          <span className="text-xs font-bold text-accent">{asset.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-text-secondary">{asset.participacion}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xs font-black text-accent">{asset.valor}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xs font-black text-green-600">{asset.retorno}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
