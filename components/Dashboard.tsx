
import React from 'react';
import { Wallet, PiggyBank, ShieldCheck, Activity, Target, ArrowUpRight, Bitcoin, LineChart, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';
import StatCard from './StatCard';
import PerformanceChart from './Charts/PerformanceChart';
import AllocationPieChart from './Charts/AllocationPieChart';
import { MOCK_TRANSACTIONS, MOCK_WATCHLIST, FINANCE_CONFIG } from '../constants';

const Dashboard: React.FC = () => {
  const currentDate = new Intl.DateTimeFormat('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(new Date());

  const getTransactionIcon = (description: string) => {
    if (description.includes('Dividendo')) return <PiggyBank className="size-5" />;
    if (description.includes('Acciones')) return <Target className="size-5" />;
    return <ArrowUpRight className="size-5" />;
  };

  const currentTotalProfit = (FINANCE_CONFIG.GLOBAL_AUM * FINANCE_CONFIG.CURRENT_MONTHLY_YIELD).toLocaleString('en-US', { minimumFractionDigits: 2 });

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-accent text-2xl md:text-4xl font-black tracking-tighter mb-1 uppercase">Panel de Control</h1>
          <p className="text-text-secondary text-[11px] md:text-base font-medium">Estado consolidado al {currentDate}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title="BALANCE TOTAL (AUM)" 
          value={`$${FINANCE_CONFIG.GLOBAL_AUM.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} 
          change={`+${(FINANCE_CONFIG.ANNUAL_PROJECTION * 100).toFixed(2)}%`} 
          changeLabel="Crecimiento 2025" 
          icon={Wallet} 
          variant="light"
        />
        <StatCard 
          title="GANANCIA TOTAL" 
          value={`$${FINANCE_CONFIG.TOTAL_PROFIT_2025.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} 
          change={`+${(FINANCE_CONFIG.LAST_SIX_MONTHS_YIELD * 100).toFixed(1)}%`} 
          changeLabel={`+$${currentTotalProfit} este mes`} 
          icon={PiggyBank} 
          variant="light"
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
              <p className="text-text-muted text-[10px] font-medium uppercase tracking-widest">CCG vs SPY500</p>
            </div>
          </div>
          <div className="h-[280px] md:h-[350px] w-full">
            <PerformanceChart />
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
            <h3 className="text-accent text-lg font-extrabold tracking-tight">Transacciones</h3>
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
          <h3 className="text-accent text-lg font-extrabold tracking-tight mb-6">Referencias</h3>
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
