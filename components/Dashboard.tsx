
import React, { useState, useMemo } from 'react';
import { Wallet, PiggyBank, ShieldCheck, Activity, Target, ArrowUpRight, Bitcoin, LineChart, TrendingUp, Calendar, ChevronDown, Repeat, BarChart3, Globe, Coins } from 'lucide-react';
import StatCard from './StatCard';
import PerformanceChart from './Charts/PerformanceChart';
import AllocationPieChart from './Charts/AllocationPieChart';
import { FINANCE_CONFIG, FINANCIAL_HISTORY, getStoredYield } from '../constants';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'General' | number>('General');

  const currentDate = new Intl.DateTimeFormat('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(new Date());

  const metrics = useMemo(() => {
    const years = [2022, 2023, 2024, 2025, 2026];
    let currentBalance = FINANCE_CONFIG.BASE_VALUE_PER_SHARE * FINANCE_CONFIG.TOTAL_SHARES;
    const yearlyBalances: Record<number, number> = {};
    const yearlyCompoundYields: Record<number, number> = {};

    years.forEach(year => {
      const history = FINANCIAL_HISTORY[year] || [];
      let annualFactor = 1;
      history.forEach((_, idx) => {
        const mYield = getStoredYield(year, idx);
        annualFactor *= (1 + mYield);
      });
      currentBalance = currentBalance * annualFactor;
      yearlyBalances[year] = currentBalance;
      yearlyCompoundYields[year] = (annualFactor - 1);
    });

    let periodProfit = 0;
    let periodGrowth = 0;
    let displayAUM = FINANCE_CONFIG.GLOBAL_AUM;

    if (selectedPeriod === 'General') {
      displayAUM = FINANCE_CONFIG.GLOBAL_AUM;
      const totalFactor = Object.keys(yearlyCompoundYields).reduce((acc, year) => {
        const history = FINANCIAL_HISTORY[parseInt(year)] || [];
        let factor = 1;
        history.forEach((_, idx) => factor *= (1 + getStoredYield(parseInt(year), idx)));
        return acc * factor;
      }, 1);
      periodGrowth = (totalFactor - 1) * 100;
      periodProfit = displayAUM * (periodGrowth / 100);
    } else {
      const year = selectedPeriod as number;
      displayAUM = yearlyBalances[year];
      periodGrowth = yearlyCompoundYields[year] * 100;
      periodProfit = displayAUM * (periodGrowth / 100);
    }

    return { aum: displayAUM, profit: periodProfit, growth: periodGrowth };
  }, [selectedPeriod]);

  const reserveValue = useMemo(() => {
    if (selectedPeriod === 2022) return 94.25;
    return FINANCE_CONFIG.RESERVE_GOAL_PCT;
  }, [selectedPeriod]);

  // Datos extendidos para Transacciones
  const transactions = [
    { id: 'tx1', type: 'dividend', amount: 31450.20, date: '05 Ene, 2026', desc: 'Dispersión Dividendos Anuales (41.77%)', status: 'Finalizado' },
    { id: 'tx2', type: 'rebalance', amount: 12400.00, date: '10 Dic, 2025', desc: 'Ajuste Portafolio Derivados T4', status: 'Completado' },
    { id: 'tx3', type: 'audit', amount: 0, date: '05 Dic, 2025', desc: 'Certificación de Activos', status: 'Verificado' },
    { id: 'tx4', type: 'injection', amount: 45000.00, date: '28 Nov, 2025', desc: 'Inyección Capital Institucional Grupo A', status: 'Completado' },
  ];

  const marketWatch = [
    { id: 'w1', name: 'S&P 500 Index', symbol: 'SPX', price: '5,982.10', change: '+1.45%', trend: [40, 60, 55, 80, 95], color: '#1d1c2d', pos: true },
    { id: 'w2', name: 'Gold (Spot)', symbol: 'XAU/USD', price: '4,510.00', change: '+0.82%', trend: [70, 65, 80, 75, 90], color: '#D4AF37', pos: true },
    { id: 'w3', name: 'Bitcoin', symbol: 'BTC', price: '96,240.00', change: '-2.15%', trend: [95, 80, 70, 60, 50], color: '#f7931a', pos: false },
    { id: 'w4', name: 'EUR / USD', symbol: 'Forex', price: '1.0845', change: '+0.12%', trend: [30, 35, 32, 40, 42], color: '#3b82f6', pos: true },
  ];

  const getTxStyles = (type: string) => {
    switch(type) {
      case 'dividend': return { bg: 'bg-green-50', text: 'text-green-600', icon: <PiggyBank className="size-4" /> };
      case 'rebalance': return { bg: 'bg-blue-50', text: 'text-blue-600', icon: <Repeat className="size-4" /> };
      case 'audit': return { bg: 'bg-amber-50', text: 'text-amber-600', icon: <ShieldCheck className="size-4" /> };
      default: return { bg: 'bg-gray-50', text: 'text-accent', icon: <ArrowUpRight className="size-4" /> };
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-accent text-2xl md:text-4xl font-black tracking-tighter mb-1 uppercase">Panel de Control</h1>
          <p className="text-text-secondary text-[11px] md:text-base font-medium">Estado consolidado al {currentDate}.</p>
        </div>

        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-surface-border shadow-sm">
          <span className="pl-3 text-[10px] font-black text-text-muted uppercase tracking-widest">Periodo:</span>
          <div className="flex gap-1">
            {['General', 2022, 2023, 2024, 2025, 2026].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p as any)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-tight ${
                  selectedPeriod === p ? 'bg-accent text-primary shadow-md' : 'text-text-muted hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title={selectedPeriod === 'General' ? "BALANCE ACTUAL (AUM)" : `AUM CIERRE ${selectedPeriod}`} 
          value={`$${metrics.aum.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} 
          change={metrics.growth >= 0 ? `+${metrics.growth.toFixed(2)}%` : `${metrics.growth.toFixed(2)}%`} 
          changeLabel={selectedPeriod === 'General' ? "Crecimiento Acumulado" : `Rendimiento Anual`} 
          icon={Wallet} variant="light" isNegative={metrics.growth < 0}
        />
        <StatCard 
          title={selectedPeriod === 'General' ? "GANANCIA HISTÓRICA" : `UTILIDAD ${selectedPeriod}`} 
          value={`$${metrics.profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} 
          change={selectedPeriod === 'General' ? `+${metrics.growth.toFixed(1)}%` : (metrics.growth >= 0 ? `+${metrics.growth.toFixed(1)}%` : `${metrics.growth.toFixed(1)}%`)} 
          changeLabel={selectedPeriod === 'General' ? "Consolidado histórico" : `Resultado del año`} 
          icon={PiggyBank} variant="light" isNegative={metrics.profit < 0}
        />
        <StatCard 
          title="FONDO DE RESERVA" value={`${reserveValue}%`} progress={reserveValue} icon={ShieldCheck} variant="light"
          changeLabel={selectedPeriod === 2022 ? "Soporte de Pérdidas Activo" : "Cobertura Total Garantizada"}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-3xl p-5 md:p-8 border border-surface-border shadow-sm overflow-hidden">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="p-3 bg-surface-subtle rounded-2xl">
              <Activity className="size-5 text-accent" />
            </div>
            <div>
              <h3 className="text-accent text-lg md:text-xl font-extrabold tracking-tight">Evolución del Portafolio</h3>
              <p className="text-text-muted text-[10px] font-medium uppercase tracking-widest">Desempeño Multi-Anual Consolidado</p>
            </div>
          </div>
          <div className="h-[280px] md:h-[350px] w-full">
            <PerformanceChart initialYear={selectedPeriod} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 md:p-8 border border-surface-border shadow-sm flex flex-col items-center justify-center">
          <div className="flex items-center gap-4 mb-6 md:mb-8 w-full">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Target className="size-5 text-accent" />
            </div>
            <h3 className="text-accent text-lg font-extrabold tracking-tight">Composición</h3>
          </div>
          <AllocationPieChart />
          <div className="mt-6 md:mt-8 grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-3 w-full px-2">
            {[
              { label: 'Forex', color: 'bg-accent', val: '20.6%' },
              { label: 'Derivados', color: 'bg-[#D4AF37]', val: '30.9%' },
              { label: 'Acciones', color: 'bg-blue-400', val: '10.3%' },
              { label: 'Real Estate', color: 'bg-primary', val: '25.8%' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`size-2 rounded-full ${item.color}`}></div>
                  <span className="text-[9px] md:text-[10px] font-bold text-text-secondary">{item.label}</span>
                </div>
                <span className="text-[9px] md:text-[10px] font-black text-accent">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-[32px] border border-surface-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 flex justify-between items-center border-b border-gray-100 bg-surface-subtle/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm"><BarChart3 size={18} className="text-accent" /></div>
              <h3 className="text-accent text-lg font-extrabold tracking-tight uppercase">Transacciones Recientes</h3>
            </div>
          </div>
          <div className="flex-1 divide-y divide-gray-100">
            {transactions.map((tx) => {
              const style = getTxStyles(tx.type);
              return (
                <div key={tx.id} className="px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className={`p-3 rounded-2xl ${style.bg} ${style.text} shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                      {style.icon}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-black text-accent truncate uppercase tracking-tight">{tx.desc}</p>
                      <p className="text-[10px] font-bold text-text-muted flex items-center gap-2">
                        <Calendar size={10} /> {tx.date} • <span className="text-primary-hover">{tx.status}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className={`text-sm font-black ${tx.amount > 0 ? 'text-accent' : 'text-text-muted'}`}>
                      {tx.amount > 0 ? `$${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '--'}
                    </p>
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">USD</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-surface-border shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent rounded-xl shadow-sm text-primary"><Globe size={18} /></div>
              <h3 className="text-accent text-lg font-extrabold tracking-tight uppercase">Referencias del Mercado</h3>
            </div>
          </div>
          <div className="space-y-3">
            {marketWatch.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-primary/40 transition-all group cursor-default">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: item.color }}>
                    {item.symbol === 'BTC' ? <Bitcoin size={20} /> : item.symbol === 'SPX' ? <TrendingUp size={20} /> : <Coins size={20} />}
                  </div>
                  <div>
                    <p className="text-xs font-black text-accent">{item.name}</p>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">{item.symbol}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex items-end gap-1 h-8">
                    {item.trend.map((h, i) => (
                      <div key={i} className={`w-1 rounded-full ${item.pos ? 'bg-green-500/20 group-hover:bg-green-500' : 'bg-red-500/20 group-hover:bg-red-500'} transition-all`} style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="text-xs font-black text-accent">{item.price}</p>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-lg ${item.pos ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
