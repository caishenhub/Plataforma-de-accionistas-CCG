
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
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-accent text-4xl font-black tracking-tighter mb-1">Panel de Control</h1>
          <p className="text-text-secondary font-medium">Estado del portafolio consolidado al {currentDate}.</p>
        </div>
        {FINANCE_CONFIG.IS_PERIOD_CLOSED && (
          <div className="bg-green-50 border border-green-200 px-4 py-2 rounded-2xl flex items-center gap-2">
            <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Periodo Dic 2025 Cerrado</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="BALANCE TOTAL (AUM)" 
          value={`$${FINANCE_CONFIG.GLOBAL_AUM.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} 
          change={`+${(FINANCE_CONFIG.ANNUAL_PROJECTION * 100).toFixed(2)}%`} 
          changeLabel="Crecimiento acumulado del portafolio 2025" 
          icon={Wallet} 
          variant="light"
        />
        <StatCard 
          title="GANANCIA TOTAL" 
          value={`$${FINANCE_CONFIG.TOTAL_PROFIT_2025.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} 
          change={`+${(FINANCE_CONFIG.LAST_SIX_MONTHS_YIELD * 100).toFixed(1)}%`} 
          changeLabel={`Crecimiento últimos 6 meses (+$${currentTotalProfit} este mes)`} 
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
        <div className="xl:col-span-2 bg-white rounded-3xl p-8 border border-surface-border shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-surface-subtle rounded-2xl">
                <Activity className="size-5 text-accent" />
              </div>
              <div>
                <h3 className="text-accent text-xl font-extrabold tracking-tight">Evolución del Portafolio</h3>
                <p className="text-text-muted text-xs font-medium">Crecimiento real vs S&P 500</p>
              </div>
            </div>
          </div>
          <PerformanceChart />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-surface-border shadow-sm flex flex-col items-center justify-center">
          <div className="flex items-center gap-4 mb-8 w-full">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Target className="size-5 text-accent" />
            </div>
            <h3 className="text-accent text-xl font-extrabold tracking-tight">Composición Global</h3>
          </div>
          
          <AllocationPieChart />
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 w-full px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-accent"></div>
                <span className="text-[10px] font-bold text-text-secondary">Forex</span>
              </div>
              <span className="text-[10px] font-black text-accent">20.6%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-[#D4AF37]"></div>
                <span className="text-[10px] font-bold text-text-secondary">Derivados</span>
              </div>
              <span className="text-[10px] font-black text-accent">30.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-blue-400"></div>
                <span className="text-[10px] font-bold text-text-secondary">Acciones</span>
              </div>
              <span className="text-[10px] font-black text-accent">10.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary"></div>
                <span className="text-[10px] font-bold text-text-secondary">Real Estate</span>
              </div>
              <span className="text-[10px] font-black text-accent">25.8%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-surface-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 flex justify-between items-center">
            <h3 className="text-accent text-xl font-extrabold tracking-tight">Transacciones Recientes</h3>
            <button className="text-text-muted text-sm font-bold hover:text-accent transition-colors">Ver Todo</button>
          </div>
          <div className="flex-1 divide-y divide-gray-100">
            {MOCK_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-surface-subtle rounded-2xl text-accent">
                    {getTransactionIcon(tx.description)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-accent">{tx.description}</p>
                    <p className="text-[11px] font-medium text-text-muted mt-0.5">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black ${tx.amount > 0 ? 'text-green-600' : 'text-accent'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </p>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-surface-border shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-accent text-xl font-extrabold tracking-tight">Referencia de Mercado</h3>
          </div>
          <div className="space-y-3">
            {MOCK_WATCHLIST.map((item) => (
              <div key={item.id} className="p-4 rounded-[20px] border border-gray-100 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`size-10 rounded-full flex items-center justify-center text-white ${item.type === 'crypto' ? 'bg-[#f7931a]' : 'bg-accent'}`}>
                    {item.type === 'crypto' ? <Bitcoin size={20} /> : <LineChart size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-accent">{item.name}</p>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{item.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-accent">{item.price}</p>
                  <div className={`flex items-center justify-end gap-1 text-[11px] font-bold ${item.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                    {item.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
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
