
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
    <div className="p-8 pb-24 space-y-8 animate-in fade-in duration-700">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-text-muted text-sm font-medium mb-1">Bienvenido, Accionistas de Caishen Capital Group.</p>
          <h1 className="text-accent text-3xl font-black tracking-tighter">Resumen consolidado del panorama financiero hoy</h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
          <div className="absolute -right-2 top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Wallet size={120} className="text-accent" strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">Balance Total (AUM)</p>
              <Wallet size={18} className="text-primary fill-primary/10" />
            </div>
            <h4 className="text-accent text-4xl font-black tracking-tighter mt-4">
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
            <h4 className="text-accent text-4xl font-black tracking-tighter mt-4">
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
              <div className="flex flex-col">
                <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">Ajuste Controlado</p>
                <p className="text-[8px] font-bold text-text-muted uppercase tracking-tighter">del Portafolio</p>
              </div>
              <ShieldCheck size={18} className="text-primary" />
            </div>
            <h4 className="text-accent text-4xl font-black tracking-tighter mt-4">3.2%</h4>
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
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">Estabilidad Estructural</p>
              <ShieldPlus size={18} className="text-accent" />
            </div>
            <h4 className="text-accent text-4xl font-black tracking-tighter mt-4">{FINANCE_CONFIG.RESERVE_GOAL_PCT}%</h4>
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
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-surface-border shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-accent text-xl font-extrabold tracking-tight">Evolución de Fondos Globales</h3>
              {/* Year Selector Tabs */}
              <div className="flex gap-1 bg-surface-subtle p-1 rounded-xl mt-4 border border-surface-border w-fit">
                {[2022, 2023, 2024, 2025].map(y => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${
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
            <div className={`flex items-center gap-2 text-xs px-4 py-1.5 rounded-full font-bold shadow-sm ${
              isPositiveYield ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
            }`}>
              {isPositiveYield ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span className="uppercase tracking-tighter">Crecimiento {selectedYear}:</span>
              <span className="font-black">{isPositiveYield ? '+' : ''}{totalAnnualYield}%</span>
            </div>
          </div>
          <EvolutionChart year={selectedYear} />
        </div>

        <div className="bg-white p-8 rounded-3xl border border-surface-border shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-accent text-xl font-extrabold tracking-tight mb-8 w-full">Distribución Estratégica</h3>
          <AssetDistributionDonut />
        </div>
      </div>

      {/* EMERGENCY FUND SECTION */}
      <div className="bg-accent rounded-[32px] p-10 text-white relative overflow-hidden group border border-primary/20">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
          <ShieldAlert size={200} strokeWidth={1} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col items-center md:items-start space-y-6 text-center md:text-left">
            <div className="bg-primary/20 w-fit p-4 rounded-2xl border border-primary/20">
              <ShieldCheck className="text-primary size-8" />
            </div>
            <h3 className="text-4xl font-black tracking-tighter leading-none">Protocolo de<br/>Respaldo Técnico</h3>
            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-md">
              El Fondo de Emergencia de Caishen Capital Group provee estabilidad operativa y respaldo estructural.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 bg-white/5 border border-white/10 p-10 rounded-[40px] shadow-2xl backdrop-blur-sm min-w-[280px]">
            <div className="text-6xl font-black text-primary leading-none">100%</div>
            <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-center leading-relaxed">
              Reserva técnica<br/>consolidada
            </div>
            <div className="mt-4 px-6 py-2 bg-primary/20 rounded-full border border-primary/20">
               <span className="text-primary text-[10px] font-black uppercase tracking-widest">Protección Activa</span>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Informe Estratégico */}
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <p className="text-text-muted text-sm font-medium">Bienvenido, Accionistas de Caishen Capital Group.</p>
          <h3 className="text-accent text-2xl font-black tracking-tighter">Informe Estratégico</h3>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-surface-border shadow-sm group hover:border-primary/40 transition-all">
            <div className="flex items-start gap-5">
              <div className="bg-surface-subtle p-3.5 rounded-2xl text-primary shrink-0">
                <TrendingUp size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-accent text-xl font-extrabold tracking-tight mb-2">Evolución del Portafolio – Lectura General</h4>
                <p className="text-text-secondary text-base leading-relaxed font-medium">
                  Durante el periodo reciente, el portafolio ha mostrado una evolución consistente, con fases de crecimiento progresivo acompañadas de ajustes controlados propios del entorno de mercado. La gestión se ha mantenido alineada con los objetivos de preservación de capital y generación de valor a mediano plazo.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-surface-border shadow-sm group hover:border-primary/40 transition-all">
            <div className="flex items-start gap-5">
              <div className="bg-surface-subtle p-3.5 rounded-2xl text-primary shrink-0">
                <Settings2 size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-accent text-xl font-extrabold tracking-tight mb-2">Estado Operativo del Portafolio</h4>
                <p className="text-text-secondary text-base leading-relaxed font-medium">
                  El portafolio se encuentra actualmente en una fase de estabilidad operativa, con una estructura diversificada y mecanismos de protección activos que permiten absorber volatilidad sin comprometer la estrategia general.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-surface-border shadow-sm group hover:border-primary/40 transition-all">
            <div className="flex items-start gap-5">
              <div className="bg-surface-subtle p-3.5 rounded-2xl text-primary shrink-0">
                <Users size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-accent text-xl font-extrabold tracking-tight mb-2">Evaluación del Comité Técnico de Inversión</h4>
                <p className="text-text-secondary text-base leading-relaxed font-medium">
                  El Comité Técnico de Inversión ha realizado evaluaciones periódicas sobre el desempeño y la exposición del portafolio, concluyendo que la estructura actual se mantiene alineada con los parámetros de riesgo definidos y con los objetivos estratégicos del grupo.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-surface-border shadow-sm group hover:border-primary/40 transition-all">
            <div className="flex items-start gap-5">
              <div className="bg-surface-subtle p-3.5 rounded-2xl text-primary shrink-0">
                <Verified size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-accent text-xl font-extrabold tracking-tight mb-2">Solidez Operativa y Gobierno Interno</h4>
                <p className="text-text-secondary text-base leading-relaxed font-medium">
                  A nivel interno, Caishen Capital Group mantiene procesos de control, seguimiento y validación que fortalecen la toma de decisiones y aseguran una gestión responsable del capital administrado.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-accent p-8 rounded-3xl border border-accent shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Flag size={140} className="text-primary" strokeWidth={1} />
            </div>
            <div className="relative z-10 flex items-start gap-5">
              <div className="bg-white/10 p-3.5 rounded-2xl text-primary shrink-0 backdrop-blur-sm">
                <Flag size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-white text-xl font-black tracking-tight mb-2">Proyección Estratégica</h4>
                <p className="text-gray-300 text-base leading-relaxed font-medium">
                  De cara a 2026, la estrategia se orienta a consolidar el modelo actual, priorizando la estabilidad, la eficiencia operativa y la adaptación progresiva a nuevas oportunidades, siempre bajo criterios de control y sostenibilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Corporate Notices and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <BellRing className="text-red-600 size-6" />
            <h3 className="text-red-900 text-xl font-extrabold tracking-tight">Avisos Corporativos ({MOCK_NOTICES.length})</h3>
          </div>
          <div className="space-y-4">
            {MOCK_NOTICES.slice(0, 2).map((notice) => (
              <div key={notice.id} className="bg-white p-4 rounded-2xl border border-red-100 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                {getNoticeIcon(notice.type)}
                <div className="flex-1">
                  <p className="text-sm font-black text-accent">{notice.title}</p>
                  <p className="text-text-muted text-xs mt-1 font-medium leading-relaxed line-clamp-2">{notice.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedNotice(notice)}
                  className="text-red-600 hover:text-red-800 text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
                >
                  Ver Detalles
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-surface-border rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-accent text-xl font-extrabold tracking-tight">Actividad del Fondo</h3>
            <button className="text-text-muted text-sm font-bold hover:text-accent transition-colors">Ver registro completo</button>
          </div>
          <div className="space-y-1">
            {[
              { 
                title: 'Expansión de Cartera Forex', 
                date: 'Hoy, 08:30 AM - Mercado Major Pairs', 
                type: 'Ajuste Estratégico', 
                icon: Globe,
                color: 'text-accent'
              },
              { 
                title: 'Adquisición Commodities', 
                date: 'Ayer, 16:00 PM - Reservas de Oro', 
                type: 'Cobertura (Hedge)', 
                icon: Coins,
                color: 'text-accent'
              },
              { 
                title: 'Cierre Mensual de Utilidades', 
                date: '01 Dic, 10:00 AM', 
                type: 'Ejecutado', 
                icon: Activity,
                color: 'text-green-600'
              },
            ].map((activity, idx) => (
              <div key={idx} className="hover:bg-gray-50 flex items-center justify-between py-4 border-b border-gray-50 last:border-0 -mx-4 px-4 rounded-xl transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="bg-surface-subtle text-accent size-10 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-white group-hover:shadow transition-all">
                    {React.createElement(activity.icon, { size: 18 })}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-accent">{activity.title}</p>
                    <p className="text-text-muted text-[10px] font-bold mt-0.5">{activity.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-black ${activity.color}`}>{activity.type}</span>
                  <ChevronRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedNotice && (
        <NoticeModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />
      )}
      
      {showEmergencyInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-accent/60 backdrop-blur-md" onClick={() => setShowEmergencyInfo(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden p-10 animate-in zoom-in-95 duration-300 border border-surface-border">
             <div className="flex items-center gap-4 mb-8">
               <div className="bg-primary p-4 rounded-2xl text-accent">
                 <ShieldCheck size={32} />
               </div>
               <div>
                 <h2 className="text-3xl font-black text-accent tracking-tighter uppercase">Fondo de Emergencia</h2>
                 <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">Protocolo de Respaldo Técnico Caishen</p>
               </div>
             </div>
             <div className="space-y-6 text-text-secondary font-medium text-sm leading-relaxed">
               <p><strong>🛡️ ¿QUÉ ES EL FONDO?</strong><br/>Es un mecanismo interno de protección basado en una reserva técnica equivalente al 80% del capital administrado, destinado a mitigar riesgos operativos y estructurales.</p>
               <p><strong>⚙️ ¿CÓMO FUNCIONA?</strong><br/>Esta reserva no participa en estrategias activas ni está expuesta a volatilidad. No genera rendimientos para el inversionista. Su función es estructural y preventiva.</p>
               <p><strong>🔄 DESCORRELACIÓN</strong><br/>Totalmente independiente del portafolio. Resultados positivos o negativos no afectan el 80% de cobertura técnica.</p>
               <p><strong>⚠️ IMPORTANTE</strong><br/>No es un seguro financiero ni garantía de capital. Su uso está limitado a escenarios excepcionales definidos por la administración.</p>
             </div>
             <button 
               onClick={() => setShowEmergencyInfo(false)}
               className="w-full mt-10 bg-accent text-primary font-black py-4 rounded-2xl uppercase text-xs tracking-[0.2em] shadow-lg hover:shadow-primary/20 transition-all"
             >
               Cerrar Información
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveSummary;
