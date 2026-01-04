
import React, { useMemo } from 'react';
import { 
  ArrowLeft, 
  TrendingUp, 
  PieChart as PieIcon, 
  DollarSign, 
  Target,
  Calendar,
  Layers,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { FINANCE_CONFIG, calculateUserFinance } from '../../constants';
import FinancialControl from '../Admin/FinancialControl';

interface ShareholderProfileProps {
  user: any;
  onBack: () => void;
}

const ShareholderProfile: React.FC<ShareholderProfileProps> = ({ user, onBack }) => {
  // LÓGICA DE CORRELACIÓN MATEMÁTICA SEGÚN CONTEXTO INTEGRAL
  const finances = useMemo(() => calculateUserFinance(user.shares), [user.shares]);
  const isAdmin = user.uid === '#ADM-001';

  return (
    <div className="bg-[#fcfcfc] min-h-full animate-in fade-in slide-in-from-right-4 duration-500 pb-20 overflow-y-auto">
      <main className="flex-1 flex flex-col p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full gap-8">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-text-muted hover:text-accent font-black text-[10px] uppercase tracking-widest transition-all w-fit group"
        >
          <div className="p-2 bg-white rounded-xl border border-surface-border group-hover:border-primary transition-all">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Volver a la Gestión de Accionistas</span>
        </button>

        {/* Profile Header Card */}
        <header className="bg-white rounded-[32px] shadow-premium border border-surface-border p-8 lg:p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
          
          <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between relative z-10">
            <div className="flex items-center gap-6">
              <div className={`size-20 lg:size-24 rounded-[28px] ${user.color} flex items-center justify-center font-black text-2xl shadow-lg`}>
                {user.initials}
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-black text-accent tracking-tighter">{user.name}</h1>
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-[11px] font-bold text-text-secondary mt-2">
                  <span className="flex items-center gap-1.5 bg-surface-subtle px-3 py-1.5 rounded-xl border border-surface-border">
                    <Layers size={14} className="text-accent" /> 
                    {user.uid}
                  </span>
                  <span className="flex items-center gap-1.5 bg-surface-subtle px-3 py-1.5 rounded-xl border border-surface-border">
                    <Calendar size={14} className="text-accent" /> 
                    {isAdmin ? 'Administrador Maestro' : 'Socio desde Sep 2025'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end pl-6 border-l-4 border-primary/30 md:border-l-0 md:border-r-4 md:pr-8 border-gray-100">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Inversión Total Activa (Balance)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl lg:text-5xl font-black text-accent tracking-tighter">
                  ${finances.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-black text-text-muted">USD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              label: 'Acciones Poseídas', 
              value: user.shares.toString(), 
              sub: `/ ${FINANCE_CONFIG.TOTAL_SHARES} total fondo`, 
              icon: Target, 
              badge: user.status, 
              bg: 'bg-primary' 
            },
            { 
              label: 'Participación', 
              value: finances.participation, 
              sub: 'Del portafolio único', 
              icon: PieIcon, 
              bg: 'bg-accent text-white' 
            },
            { 
              label: 'Utilidad Mensual', 
              value: `+$${finances.monthlyProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
              sub: `Rendimiento: ${(FINANCE_CONFIG.CURRENT_MONTHLY_YIELD * 100).toFixed(2)}%`, 
              icon: TrendingUp, 
              trend: `+${(FINANCE_CONFIG.CURRENT_MONTHLY_YIELD * 100).toFixed(2)}%`, 
              bg: 'bg-primary' 
            },
            { 
              label: 'Proyección Anual', 
              value: `+$${finances.annualProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
              sub: 'ROI Proyectado: 42.8%', 
              icon: Award, 
              bg: 'bg-accent text-white' 
            },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[32px] shadow-sm border border-surface-border p-7 flex flex-col justify-between group hover:shadow-premium hover:-translate-y-1 transition-all duration-300 min-h-[180px]">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg.includes('primary') ? 'bg-primary/20' : 'bg-accent/10'} transition-colors`}>
                  <stat.icon size={20} className="text-accent" />
                </div>
                {stat.badge && (
                  <span className="text-[9px] font-black px-2 py-1 bg-surface-subtle border border-surface-border rounded-lg text-text-muted uppercase tracking-widest whitespace-nowrap">{stat.badge}</span>
                )}
                {stat.trend && (
                  <span className="flex items-center gap-1 text-[9px] font-black text-accent bg-primary px-2 py-1 rounded-lg whitespace-nowrap">
                    <ArrowUpRight size={10} /> {stat.trend}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">{stat.label}</h3>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-accent tracking-tighter">{stat.value}</span>
                  {stat.sub && <span className="text-[10px] font-bold text-text-muted truncate">{stat.sub}</span>}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Detailed Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[40px] shadow-premium border border-surface-border p-8 lg:p-10 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-surface-subtle rounded-2xl border border-surface-border">
                  <TrendingUp size={20} className="text-accent" />
                </div>
                <h2 className="text-xl font-black text-accent tracking-tight">Rendimiento Individual</h2>
              </div>
              
              <div className="flex-1 space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-black text-text-secondary uppercase tracking-widest">Rendimiento Mensual</span>
                    <span className="text-lg font-black text-accent">{(FINANCE_CONFIG.CURRENT_MONTHLY_YIELD * 100).toFixed(2)}%</span>
                  </div>
                  <div className="h-4 w-full bg-surface-subtle rounded-full overflow-hidden p-1 border border-surface-border">
                    <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(206,255,4,0.5)]" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="p-7 bg-accent rounded-[32px] border border-accent shadow-xl text-white group cursor-default flex flex-col justify-between min-h-[190px] transition-all relative overflow-hidden">
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.15em] mb-1">Valor por Acción</p>
                      <h4 className="text-2xl font-black text-white tracking-tight">Nominal</h4>
                    </div>
                    <div className="size-12 rounded-[18px] bg-white/10 backdrop-blur-sm border border-white/5 flex items-center justify-center shrink-0">
                      <Target size={20} className="text-primary" />
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-5 border-t border-white/10 relative z-10">
                    <div className="flex items-end justify-between gap-2">
                      <span className="text-3xl font-black text-primary tracking-tighter leading-none">
                        ${FINANCE_CONFIG.NOMINAL_VALUE_PER_SHARE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <div className="flex flex-col items-end leading-[1.1] text-right mb-0.5 shrink-0">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">USD /</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Acción</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 size-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-[40px] shadow-premium border border-surface-border h-full flex flex-col overflow-hidden">
              <div className="p-8 lg:p-10 border-b border-surface-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-surface-subtle/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl border border-surface-border shadow-sm">
                    <Calendar size={20} className="text-accent" />
                  </div>
                  <h2 className="text-xl font-black text-accent tracking-tight">Desglose de Dividendos</h2>
                </div>
                <div className="flex items-center bg-white border border-surface-border rounded-2xl p-1 shadow-sm">
                  <button className="px-6 py-2 rounded-xl bg-accent text-white text-[10px] font-black uppercase tracking-widest shadow-lg transition-all">2025</button>
                </div>
              </div>
              
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="text-[10px] font-black text-text-muted uppercase tracking-widest border-b border-surface-border">
                      <th className="px-8 py-5">Mes Operativo</th>
                      <th className="px-8 py-5 text-right">Rendimiento %</th>
                      <th className="px-8 py-5 text-right">Monto Recibido (USD)</th>
                      <th className="px-8 py-5 text-center">Estatus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { 
                        month: 'Diciembre (Actual)', 
                        perf: `+2.25%`, 
                        util: `$${(finances.balance * 0.0225).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 
                        status: FINANCE_CONFIG.IS_PERIOD_CLOSED ? 'Pagado' : 'Pendiente'
                      },
                      { 
                        month: 'Noviembre', 
                        perf: '+2.40%', 
                        util: `$${(finances.balance * 0.024).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 
                        status: 'Pagado' 
                      },
                      { 
                        month: 'Octubre', 
                        perf: '+2.18%', 
                        util: `$${(finances.balance * 0.0218).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 
                        status: 'Pagado' 
                      },
                      { 
                        month: 'Septiembre', 
                        perf: '+2.30%', 
                        util: `$${(finances.balance * 0.023).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 
                        status: 'Pagado' 
                      },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface-subtle/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="size-8 rounded-xl bg-surface-subtle flex items-center justify-center text-text-muted group-hover:bg-white group-hover:text-accent transition-all">
                              <Calendar size={14} />
                            </div>
                            <span className="text-sm font-black text-accent">{row.month}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-sm font-black text-accent whitespace-nowrap">{row.perf}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-sm font-bold text-text-secondary whitespace-nowrap">{row.util}</span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm whitespace-nowrap ${
                            row.status === 'Pagado' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-8 bg-surface-subtle/30 border-t border-surface-border">
                <div className="flex items-center gap-3 text-text-muted">
                  <DollarSign size={16} className="text-accent" />
                  <p className="text-[10px] font-bold leading-relaxed max-w-lg">
                    Distribución proporcional a las <span className="text-accent font-black">{user.shares}</span> acciones poseídas sobre el total del fondo ({FINANCE_CONFIG.TOTAL_SHARES}).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="space-y-12 animate-in slide-in-from-bottom-10 duration-1000">
            <FinancialControl />
          </div>
        )}
      </main>
    </div>
  );
};

export default ShareholderProfile;
