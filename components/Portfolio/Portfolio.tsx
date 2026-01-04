
import React, { useState } from 'react';
import { Building2, TrendingUp, Globe, PieChart as PieIcon, Activity, Bitcoin, Coins, Landmark, ShieldCheck } from 'lucide-react';
import AssetDonutChart from './AssetDonutChart';
import { FINANCE_CONFIG } from '../../constants';

const SECTORS = ["Portafolio Global", "Forex", "Derivados", "Acciones", "Inmobiliario", "Trading Alg."];

const Portfolio: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState(SECTORS[0]);

  const accumulatedYield2025 = 34.32;

  const ASSET_DATA = [
    { id: 1, name: 'Mercado de Divisas (Forex)', sub: 'Major & Minor Pairs', category: 'Forex', participacion: '20.6%', valor: `$${(25631.55).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, retorno: '+12.5%', icon: Globe, color: 'bg-gray-100' },
    { id: 2, name: 'Derivados Financieros', sub: 'Futures & Options', category: 'Derivados', participacion: '30.9%', valor: `$${(38447.33).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, retorno: '+8.9%', icon: Coins, color: 'bg-amber-50' },
    { id: 3, name: 'Equity Global (Acciones)', sub: 'Tier 1 Equities', category: 'Acciones', participacion: '10.3%', valor: `$${(12815.78).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, retorno: '+15.2%', icon: Landmark, color: 'bg-indigo-50' },
    { id: 4, name: 'Portafolio Inmobiliario', sub: 'Real Estate & Structured Assets', category: 'Inmobiliario', participacion: '25.8%', valor: `$${(32101.65).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, retorno: '+6.8%', icon: Building2, color: 'bg-primary/10' },
    { id: 5, name: 'Trading Algorítmico', sub: 'Automated Quant Strategies', category: 'Algorítmico', participacion: '12.4%', valor: `$${(15428.70).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, retorno: '+22.1%', icon: Bitcoin, color: 'bg-blue-50' },
  ];

  return (
    <div className="p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-accent text-4xl font-black tracking-tighter mb-2">Composición del Portafolio Único</h1>
        <p className="text-text-secondary font-medium">Todos los accionistas participan proporcionalmente de esta cartera única con distribución diversificada.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-5 bg-white rounded-3xl border border-surface-border p-8 shadow-sm h-full flex flex-col">
          <h3 className="text-accent text-xl font-extrabold tracking-tight mb-8">Matriz de Distribución</h3>
          <div className="flex-1 flex items-center justify-center min-h-[300px]">
            <AssetDonutChart />
          </div>
        </div>

        <div className="xl:col-span-7 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-surface-border rounded-3xl p-6 shadow-sm group hover:border-primary transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-text-muted text-[10px] font-black uppercase tracking-widest">Ganancia Acumulada del 2025</span>
                <TrendingUp size={18} className="text-primary" />
              </div>
              <h4 className="text-2xl font-black text-accent tracking-tighter">+{accumulatedYield2025}%</h4>
            </div>

            <div className="bg-white border border-surface-border rounded-3xl p-6 shadow-sm group hover:border-primary transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-text-muted text-[10px] font-black uppercase tracking-widest">Utilidad Mensual Actual</span>
                <Activity size={18} className="text-primary" />
              </div>
              <h4 className="text-2xl font-black text-accent tracking-tighter">+{(FINANCE_CONFIG.CURRENT_MONTHLY_YIELD * 100).toFixed(2)}%</h4>
            </div>

            <div className="bg-white border border-surface-border rounded-3xl p-6 shadow-sm group hover:border-primary transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-text-muted text-[10px] font-black uppercase tracking-widest">Fondo de Emergencia</span>
                <ShieldCheck size={18} className="text-accent" />
              </div>
              <h4 className="text-2xl font-black text-accent tracking-tighter">100%</h4>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-surface-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-surface-border">
              <h3 className="text-accent text-xl font-extrabold tracking-tight">Detalle de Distribución - AUM Global</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-subtle text-text-muted text-[10px] font-black uppercase tracking-widest border-b border-surface-border">
                    <th className="px-6 py-4">Activo / Sector</th>
                    <th className="px-6 py-4">Distribución</th>
                    <th className="px-6 py-4 text-right">Monto (USD)</th>
                    <th className="px-6 py-4 text-right">Perf.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {ASSET_DATA.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${asset.color} text-accent shadow-sm group-hover:scale-110 transition-transform`}>
                            {React.createElement(asset.icon, { size: 18 })}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-accent block">{asset.name}</span>
                            <span className="text-text-muted text-[10px] font-medium">{asset.sub}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-surface-subtle border border-surface-border text-[10px] font-bold text-text-secondary uppercase">
                          {asset.participacion}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="text-sm font-black text-accent">{asset.valor}</span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="text-sm font-black text-green-600">{asset.retorno}</span>
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
