
import React, { useState, useMemo } from 'react';
import { Wallet, PiggyBank, ShieldCheck, Activity, Target, ArrowUpRight, Bitcoin, LineChart, TrendingUp, Calendar, ChevronDown } from 'lucide-react';
import StatCard from './StatCard';
import PerformanceChart from './Charts/PerformanceChart';
import AllocationPieChart from './Charts/AllocationPieChart';
import { MOCK_TRANSACTIONS, MOCK_WATCHLIST, FINANCE_CONFIG, FINANCIAL_HISTORY, getStoredYield } from '../constants';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'General' | number>('General');

  const currentDate = new Intl.DateTimeFormat('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(new Date());

  // Lógica de balances encadenados basada en la nueva escala calibrada
  const metrics = useMemo(() => {
    const years = [2022, 2023, 2024, 2025, 2026];
    
    // El balance inicial (2022) surge del valor base calibrado por el total de acciones
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
      // Guardamos el rendimiento compuesto del año (factor - 1)
      yearlyCompoundYields[year] = (annualFactor - 1);
    });

    let periodProfit = 0;
    let periodGrowth = 0;
    let displayAUM = FINANCE_CONFIG.GLOBAL_AUM;

    if (selectedPeriod === 'General') {
      displayAUM = FINANCE_CONFIG.GLOBAL_AUM;
      // Crecimiento total desde el inicio (2022)
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

    return {
      aum: displayAUM,
      profit: periodProfit,
      growth: periodGrowth
    };
  }, [selectedPeriod]);

  const getTransactionIcon = (description: string) => {
    if (description.includes('Dividendo')) return <PiggyBank className="size-5" />;
    if (description.includes('Acciones')) return <Target className="size-5" />;
    return <ArrowUpRight className="size-5" />;
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
                  selectedPeriod === p 
                    ? 'bg-accent text-primary shadow-md' 
                    : 'text-text-muted hover:bg-gray-50'
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
          icon={Wallet} 
          variant="light"
          isNegative={metrics.growth < 0}
        />
        <StatCard 
          title={selectedPeriod === 'General' ? "GANANCIA HISTÓRICA" : `UTILIDAD ${selectedPeriod}`} 
          value={`$${metrics.profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} 
          change={selectedPeriod === 'General' ? `+${metrics.growth.toFixed(1)}%` : (metrics.growth >= 0 ? `+${metrics.growth.toFixed(1)}%` : `${metrics.growth.toFixed(1)}%`)} 
          changeLabel={selectedPeriod === 'General' ? "Consolidado histórico" : `Resultado del año`} 
          icon={PiggyBank} 
          variant="light"
          isNegative={metrics.profit < 0}
        />
        <StatCard 
          title="FONDO DE RESERVA" 
          value={`${FINANCE_CONFIG.RESERVE_GOAL_PCT}%`} 
          progress={FINANCE_CONFIG.RESERVE_GOAL_PCT} 
          icon={ShieldCheck} 
          variant="light"
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
        <div className="bg-white rounded-3xl border border-surface-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 flex justify-between items-center border-b border-gray-50">
            <h3 className="text-accent text-lg font-extrabold tracking-tight">Transacciones Recientes</h3>
          </div>
          <div className="flex-1 divide-y divide-gray-100">
            {MOCK_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 bg-surface-subtle rounded-xl text-accent shrink-0">
                    {getTransactionIcon(tx.description)}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-accent truncate">{tx.description}</p>
                    <p className="text-[10px] font-medium text-text-muted">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className={`text-xs font-black ${tx.amount > 0 ? 'text-green-600' : 'text-accent'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-surface-border shadow-sm p-6 flex flex-col">
          <h3 className="text-accent text-lg font-extrabold tracking-tight mb-6">Referencias de Mercado</h3>
          <div className="space-y-3">
            {MOCK_WATCHLIST.map((item) => (
              <div key={item.id} className="p-4 rounded-[20px] border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`size-9 rounded-full flex items-center justify-center text-white ${item.type === 'crypto' ? 'bg-[#f7931a]' : 'bg-accent'}`}>
                    {item.type === 'crypto' ? <Bitcoin size={18} /> : <LineChart size={18} />}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-accent">{item.name}</p>
                    <p className="text-[9px] font-bold text-text-muted uppercase">{item.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-accent">{item.price}</p>
                  <div className={`flex items-center justify-end gap-1 text-[10px] font-bold ${item.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                    <span>{item.change}</span>
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
