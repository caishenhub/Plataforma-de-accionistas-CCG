
import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  ShieldPlus, 
  BellRing, 
  Activity, 
  ChevronRight,
  BarChart3,
  Globe,
  Coins,
  TrendingDown,
  ShieldCheck,
  Info,
  ShieldAlert,
  Settings2,
  Users,
  Verified,
  Flag
} from 'lucide-react';
import EvolutionChart from './EvolutionChart';
import AssetDistributionDonut from './AssetDistributionDonut';
import { MOCK_NOTICES, FINANCE_CONFIG, FINANCIAL_HISTORY } from '../../constants';
import NoticeModal from './NoticeModal';
import { CorporateNotice } from '../../types';

const ExecutiveSummary: React.FC = () => {
  const [selectedNotice, setSelectedNotice] = useState<CorporateNotice | null>(null);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [showEmergencyInfo, setShowEmergencyInfo] = useState(false);

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'Urgent': return <div className="size-2 mt-2 rounded-full bg-red-600 shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>;
      case 'Success': return <div className="size-2 mt-2 rounded-full bg-green-600 shrink-0 shadow-[0_0_8px_rgba(22,163,74,0.5)]"></div>;
      default: return <div className="size-2 mt-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>;
    }
  };

  const totalAnnualYield = useMemo(() => {
    const yields = FINANCIAL_HISTORY[selectedYear] || [];
    let compound = 1;
    yields.forEach(y => {
      compound = compound * (1 + y / 100);
    });
    return ((compound - 1) * 100).toFixed(2);
  }, [selectedYear]);

  const isPositiveYield = parseFloat(totalAnnualYield) >= 0;

  return (
    <div className="p-4 md:p-8 pb-24 space-y-8 animate-in fade-in duration-700">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-text-muted text-xs font-medium mb-1">Caishen Capital Group - Informe Consolidado</p>
          <h1 className="text-accent text-2xl md:text-3xl font-black tracking-tighter uppercase">Resumen Ejecutivo</h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
          <div className="absolute -right-2 top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Wallet size={120} className="text-accent" strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">Balance Total (AUM)</p>
              <Wallet size={18} className="text-primary fill-primary/10" />
            </div>
            <h4 className="text-accent text-3xl md:text-4xl font-black tracking-tighter mt-4">
              ${(FINANCE_CONFIG.GLOBAL_AUM / 1000).toFixed(1)}k
            </h4>
          </div>
          <div className="relative z-10 flex items-center gap-3 mt-4">
            <div className="flex items-center gap-1 bg-primary px-3 py-1.5 rounded-lg text-[10px] font-black shadow-sm text-accent">
              <TrendingUp size={12} />
              <span>+{(FINANCE_CONFIG.ANNUAL_PROJECTION * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">Utilidad Proyectada</p>
              <BarChart3 size={18} className="text-accent" />
            </div>
            <h4 className="text-accent text-3xl md:text-4xl font-black tracking-tighter mt-4">
              39.35%
            </h4>
          </div>
          <div className="flex items-center gap-2 bg-primary px-3 py-1.5 rounded-lg text-[10px] font-black text-accent mt-4 border border-primary shadow-sm">
            <span>2026</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">Ajuste Controlado</p>
              <ShieldCheck size={18} className="text-primary" />
            </div>
            <h4 className="text-accent text-3xl md:text-4xl font-black tracking-tighter mt-4">3.2%</h4>
          </div>
          <div className="mt-4 flex items-center justify-between">
             <div className="flex items-center gap-1 bg-accent px-3 py-1.5 rounded-lg text-[10px] font-black shadow-sm text-primary">
               <span>Establecido</span>
             </div>
            <button 
              onClick={() => setShowEmergencyInfo(true)}
              className="text-primary hover:text-accent transition-colors"
            >
              <Info size={14} />
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">Reserva Técnica</p>
              <ShieldPlus size={18} className="text-accent" />
            </div>
            <h4 className="text-accent text-3xl md:text-4xl font-black tracking-tighter mt-4">{FINANCE_CONFIG.RESERVE_GOAL_PCT}%</h4>
          </div>
          <div className="mt-4 space-y-2">
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden border border-surface-border">
              <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(206,255,4,0.5)]" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-3xl border border-surface-border shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-accent text-lg md:text-xl font-extrabold tracking-tight">Evolución Global</h3>
              <div className="flex gap-1 bg-surface-subtle p-1 rounded-xl mt-4 border border-surface-border w-fit overflow-x-auto max-w-full hide-scrollbar">
                {[2022, 2023, 2024, 2025].map(y => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                      selectedYear === y 
                      ? 'bg-accent text-primary shadow-md' 
                      : 'text-text-muted hover:text-accent'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
            <div className={`flex items-center gap-2 text-[10px] px-4 py-1.5 rounded-full font-black shadow-sm ${
              isPositiveYield ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
            }`}>
              <span className="font-black">CRECIMIENTO {selectedYear}: {isPositiveYield ? '+' : ''}{totalAnnualYield}%</span>
            </div>
          </div>
          <EvolutionChart year={selectedYear} />
        </div>

        <div className="bg-white p-5 md:p-8 rounded-3xl border border-surface-border shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-accent text-lg font-extrabold tracking-tight mb-8 w-full">Estrategia</h3>
          <AssetDistributionDonut />
        </div>
      </div>

      {/* Emergency Fund Section */}
      <div className="bg-accent rounded-[32px] p-6 md:p-10 text-white relative overflow-hidden group border border-primary/20">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
            <div className="bg-primary/20 w-fit p-3 rounded-2xl border border-primary/20">
              <ShieldCheck className="text-primary size-6" />
            </div>
            <h3 className="text-3xl font-black tracking-tighter leading-none uppercase">Respaldo Técnico</h3>
            <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-xs">
              Mecanismo interno de protección operativa equivalente al 80% del capital.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 p-8 rounded-[40px] shadow-2xl backdrop-blur-sm">
            <div className="text-5xl font-black text-primary leading-none">100%</div>
            <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest text-center">
              Reserva Consolidada
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-accent text-xl font-black tracking-tighter uppercase px-1">Informe Estratégico</h3>
        <div className="grid grid-cols-1 gap-4">
          {[
            { icon: TrendingUp, title: 'Evolución del Portafolio', content: 'Fase de crecimiento progresivo con ajustes controlados alineados con los objetivos de preservación.' },
            { icon: Settings2, title: 'Estado Operativo', content: 'Estructura diversificada con mecanismos de protección activos para absorber volatilidad.' },
            { icon: Users, title: 'Comité de Inversión', content: 'Evaluaciones periódicas confirman alineación con parámetros de riesgo definidos.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm group hover:border-primary/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-surface-subtle p-3 rounded-xl text-primary shrink-0">
                  <item.icon size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-accent text-base font-black tracking-tight mb-1">{item.title}</h4>
                  <p className="text-text-secondary text-xs leading-relaxed font-medium">{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedNotice && (
        <NoticeModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />
      )}
      
      {showEmergencyInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-accent/60 backdrop-blur-md" onClick={() => setShowEmergencyInfo(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden p-6 md:p-10 animate-in zoom-in-95 duration-300 border border-surface-border">
             <div className="flex items-center gap-4 mb-8">
               <div className="bg-primary p-3 md:p-4 rounded-2xl text-accent">
                 <ShieldCheck size={24} />
               </div>
               <div>
                 <h2 className="text-xl md:text-2xl font-black text-accent tracking-tighter uppercase">Fondo de Emergencia</h2>
               </div>
             </div>
             <div className="space-y-4 text-text-secondary font-medium text-xs md:text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
               <p><strong>🛡️ ¿QUÉ ES EL FONDO?</strong><br/>Reserva técnica equivalente al 80% del capital administrado para mitigar riesgos operativos.</p>
               <p><strong>⚙️ ¿CÓMO FUNCIONA?</strong><br/>Esta reserva no participa en estrategias activas ni genera rendimientos. Su función es puramente estructural.</p>
               <p><strong>🔄 DESCORRELACIÓN</strong><br/>Totalmente independiente del portafolio. Protege la base de capital administrado.</p>
             </div>
             <button 
               onClick={() => setShowEmergencyInfo(false)}
               className="w-full mt-8 bg-accent text-primary font-black py-4 rounded-2xl uppercase text-xs tracking-widest shadow-lg"
             >
               Cerrar
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveSummary;
