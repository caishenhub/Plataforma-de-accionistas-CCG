
import React, { useMemo, useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  TrendingUp, 
  PieChart as PieIcon, 
  DollarSign, 
  Target,
  Calendar,
  Layers,
  Award,
  ArrowUpRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { FINANCE_CONFIG, calculateUserFinance, FINANCIAL_HISTORY, getStoredYield, getPayoutStatus } from '../../constants';
import FinancialControl from '../Admin/FinancialControl';

interface ShareholderProfileProps {
  user: any;
  onBack: () => void;
}

const ShareholderProfile: React.FC<ShareholderProfileProps> = ({ user, onBack }) => {
  // Filtro especial para Juan Andres Suarez (#USR-008)
  const isJuanAndres = user.uid === '#USR-008';
  
  // Si es Juan Andres, el año inicial es 2025 y no puede ver años anteriores
  const [selectedYear, setSelectedYear] = useState(isJuanAndres ? 2025 : 2025);
  const [updateKey, setUpdateKey] = useState(0);
  
  const finances = useMemo(() => calculateUserFinance(user.shares, selectedYear), [user.shares, selectedYear, updateKey]);
  const isAdmin = user.uid === '#ADM-001';

  // Sincronizar con actualizaciones globales del administrador
  useEffect(() => {
    const handleUpdate = () => setUpdateKey(prev => prev + 1);
    window.addEventListener('finance_update', handleUpdate);
    return () => window.removeEventListener('finance_update', handleUpdate);
  }, []);

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // Años disponibles: Juan Andres solo ve 2025 y 2026
  const availableYears = isJuanAndres ? [2025, 2026] : [2023, 2024, 2025, 2026];

  return (
    <div className="bg-[#fcfcfc] min-h-full animate-in fade-in slide-in-from-right-4 duration-500 pb-20 overflow-y-auto">
      <main className="flex-1 flex flex-col p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full gap-8">
        
        <button onClick={onBack} className="flex items-center gap-2 text-text-muted hover:text-accent font-black text-[10px] uppercase tracking-widest transition-all w-fit group">
          <div className="p-2 bg-white rounded-xl border border-surface-border group-hover:border-primary transition-all">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Volver a la Gestión de Accionistas</span>
        </button>

        <header className="bg-white rounded-[32px] shadow-premium border border-surface-border p-8 lg:p-10 relative overflow-hidden group">
          <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between relative z-10">
            <div className="flex items-center gap-6">
              <div className={`size-20 lg:size-24 rounded-[28px] ${user.color} flex items-center justify-center font-black text-2xl shadow-lg`}>{user.initials}</div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-black text-accent tracking-tighter">{user.name}</h1>
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-[11px] font-bold text-text-secondary mt-2">
                  <span className="flex items-center gap-1.5 bg-surface-subtle px-3 py-1.5 rounded-xl border border-surface-border"><Layers size={14} className="text-accent" /> {user.uid}</span>
                  <span className="flex items-center gap-1.5 bg-surface-subtle px-3 py-1.5 rounded-xl border border-surface-border"><Calendar size={14} className="text-accent" /> {isAdmin ? 'Administrador Maestro' : 'Socio CCG'}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end border-l-4 border-primary/30 md:border-l-0 md:border-r-4 md:pr-8 border-gray-100">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Inversión Total Activa</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl lg:text-5xl font-black text-accent tracking-tighter">${finances.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                <span className="text-xs font-black text-text-muted">USD</span>
              </div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Acciones Poseídas', value: user.shares.toString(), sub: 'Fondo CCG', icon: Target, bg: 'bg-primary' },
            { label: 'Participación', value: finances.participation, sub: 'Fondo Global', icon: PieIcon, bg: 'bg-accent text-white' },
            { label: `Rendimiento ${selectedYear}`, value: `+$${finances.annualProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}`, sub: 'Anual Acumulado', icon: TrendingUp, bg: 'bg-primary' },
            { label: 'Proyección Anual', value: `42.8%`, sub: 'ROI Estimado', icon: Award, bg: 'bg-accent text-white' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[32px] shadow-sm border border-surface-border p-7 flex flex-col justify-between hover:shadow-premium transition-all min-h-[160px]">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-surface-subtle`}><stat.icon size={20} className="text-accent" /></div>
              </div>
              <div>
                <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">{stat.label}</h3>
                <div className="flex items-baseline gap-1.5"><span className="text-3xl font-black text-accent tracking-tighter">{stat.value}</span></div>
              </div>
            </div>
          ))}
        </section>

        <div className="bg-white rounded-[40px] shadow-premium border border-surface-border overflow-hidden">
          <div className="p-8 lg:p-10 border-b border-surface-border flex justify-between items-center bg-surface-subtle/30">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl border border-surface-border shadow-sm"><Calendar size={20} className="text-accent" /></div>
              <h2 className="text-xl font-black text-accent tracking-tight">Desglose de Dividendos</h2>
            </div>
            <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} className="bg-white border border-surface-border rounded-xl px-6 py-2 text-xs font-black uppercase shadow-sm">
              {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="text-[10px] font-black text-text-muted uppercase tracking-widest border-b border-surface-border">
                  <th className="px-8 py-5">Mes Operativo</th>
                  <th className="px-8 py-5 text-right">Rentabilidad %</th>
                  <th className="px-8 py-5 text-right">Utilidad (USD)</th>
                  <th className="px-8 py-5 text-center">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {monthNames.map((month, idx) => {
                  // Filtro para Juan Andres: Ocultar meses antes de Septiembre (indice 8) solo en 2025
                  if (isJuanAndres && selectedYear === 2025 && idx < 8) {
                    return null;
                  }

                  const yld = getStoredYield(selectedYear, idx);
                  const status = getPayoutStatus(selectedYear, idx);
                  const monthlyProfit = finances.balance * yld;
                  
                  const formattedProfit = monthlyProfit.toFixed(2).replace('.', ',');

                  return (
                    <tr key={`${selectedYear}-${idx}-${updateKey}`} className="hover:bg-surface-subtle/50 transition-colors">
                      <td className="px-8 py-6 flex items-center gap-4">
                        <span className="text-sm font-black text-accent">{month}</span>
                      </td>
                      <td className="px-8 py-6 text-right font-black text-accent">{yld > 0 ? `+${(yld * 100).toFixed(2)}%` : '0.00%'}</td>
                      <td className="px-8 py-6 text-right font-bold text-text-secondary">${formattedProfit}</td>
                      <td className="px-8 py-6 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                          status === 'PAID' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'
                        }`}>
                          {status === 'PAID' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                          {status === 'PAID' ? 'PAGADO' : 'PENDIENTE'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {isAdmin && <FinancialControl />}
      </main>
    </div>
  );
};

export default ShareholderProfile;
