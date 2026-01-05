
import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Settings2,
  Users,
  Flag,
  LineChart,
  Bell,
  Globe,
  Coins,
  Activity,
  Wallet,
  Target,
  Info
} from 'lucide-react';
import EvolutionChart from './EvolutionChart';
import AssetDistributionDonut from './AssetDistributionDonut';
import { MOCK_NOTICES } from '../../constants';
import NoticeModal from './NoticeModal';
import { CorporateNotice } from '../../types';

const ExecutiveSummary: React.FC = () => {
  const [selectedNotice, setSelectedNotice] = useState<CorporateNotice | null>(null);

  // Clase común para las tarjetas de KPI para garantizar simetría
  const kpiCardClass = "bg-white p-8 rounded-[35px] border border-surface-border shadow-sm flex flex-col justify-between min-h-[200px] hover:shadow-premium transition-all duration-300 group";
  const labelClass = "text-[10px] font-black text-text-muted uppercase tracking-[0.15em] leading-tight";
  const valueClass = "text-4xl font-black text-accent tracking-tighter mt-2";

  return (
    <div className="p-4 md:p-8 pb-24 space-y-10 animate-in fade-in duration-700">
      {/* 1. Cabecera y Bienvenida */}
      <div className="space-y-1">
        <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Bienvenido, Accionistas de Caishen Capital Group.</p>
        <h1 className="text-accent text-3xl font-black tracking-tighter uppercase">Resumen consolidado del panorama financiero hoy</h1>
      </div>

      {/* 2. Grid de KPIs Simétricos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Balance Total */}
        <div className={kpiCardClass}>
          <div className="flex justify-between items-start w-full">
            <span className={labelClass}>Balance Total<br/>(AUM)</span>
            <div className="p-2 bg-primary/10 rounded-xl">
              <Wallet size={18} className="text-accent" />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3 className={valueClass}>$124.4k</h3>
          </div>
          <div className="mt-auto">
            <div className="bg-primary/20 text-accent text-[10px] font-black px-3 py-1.5 rounded-xl w-fit flex items-center gap-1 shadow-sm">
              <TrendingUp size={12} /> +39.8%
            </div>
          </div>
        </div>

        {/* Utilidad Proyectada */}
        <div className={kpiCardClass}>
          <div className="flex justify-between items-start w-full">
            <span className={labelClass}>Utilidad<br/>Proyectada</span>
            <div className="p-2 bg-surface-subtle rounded-xl">
              <LineChart size={18} className="text-text-muted" />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3 className={valueClass}>39.35%</h3>
          </div>
          <div className="mt-auto w-full">
            <div className="h-4 w-full bg-surface-subtle rounded-full overflow-hidden p-0.5 border border-surface-border">
              <div className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(206,255,4,0.5)] transition-all duration-1000" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        {/* Ajuste Controlado */}
        <div className={kpiCardClass}>
          <div className="flex justify-between items-start w-full">
            <span className={labelClass}>Ajuste<br/>Controlado</span>
            <div className="p-2 bg-primary/10 rounded-xl">
              <ShieldCheck size={18} className="text-accent" />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3 className={valueClass}>3.2%</h3>
          </div>
          <div className="mt-auto flex items-center justify-between w-full">
            <div className="bg-accent text-primary text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest shadow-md">
              Establecido
            </div>
            <Info size={14} className="text-text-muted opacity-50" />
          </div>
        </div>

        {/* Estabilidad Estructural */}
        <div className={kpiCardClass}>
          <div className="flex justify-between items-start w-full">
            <span className={labelClass}>Estabilidad<br/>Estructural</span>
            <div className="p-2 bg-surface-subtle rounded-xl">
              <Target size={18} className="text-text-muted" />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3 className={valueClass}>100%</h3>
          </div>
          <div className="mt-auto w-full">
            <div className="h-1.5 bg-primary w-full rounded-full shadow-[0_0_12px_rgba(206,255,4,0.4)]"></div>
          </div>
        </div>
      </div>

      {/* 3. Gráficos Centrales */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white rounded-[40px] border border-surface-border p-8 lg:p-10 shadow-premium">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-accent text-xl font-black tracking-tight uppercase">Evolución de Fondos Globales</h3>
            <div className="bg-green-50 px-4 py-2 rounded-2xl border border-green-100 flex items-center gap-2">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">+39.76%</span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <EvolutionChart year={2025} />
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-surface-border p-8 lg:p-10 shadow-premium flex flex-col items-center justify-center text-center">
          <h3 className="text-accent text-xl font-black tracking-tight uppercase mb-10 w-full text-left">Distribución Estratégica</h3>
          <AssetDistributionDonut />
        </div>
      </div>

      {/* 4. Informe Estratégico */}
      <div className="space-y-6">
        <h2 className="text-accent text-2xl font-black tracking-tighter uppercase border-l-4 border-primary pl-4">Informe Estratégico</h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { icon: LineChart, color: 'bg-green-50 text-green-500', title: 'Evolución del Portafolio – Lectura General', content: 'Durante el periodo reciente, el portafolio ha mostrado una evolución consistente, con fases de crecimiento progresivo acompañadas de ajustes controlados propios del entorno de mercado.' },
            { icon: Settings2, color: 'bg-yellow-50 text-yellow-500', title: 'Estado Operativo del Portafolio', content: 'El portafolio se encuentra actualmente en una fase de estabilidad operativa, con una estructura diversificada y mecanismos de protección activos.' },
            { icon: Users, color: 'bg-yellow-50 text-yellow-500', title: 'Evaluación del Comité Técnico de Inversión', content: 'El Comité ha realizado evaluaciones periódicas sobre el desempeño, concluyendo que la estructura actual se mantiene alineada con los parámetros de riesgo.' },
            { icon: ShieldCheck, color: 'bg-yellow-50 text-yellow-500', title: 'Solidez Operativa y Gobierno Interno', content: 'Procesos de control, seguimiento y validación que fortalecen la toma de decisiones y aseguran una gestión responsable del capital.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[24px] border border-surface-border shadow-sm flex items-start gap-6 hover:border-primary/40 transition-all">
              <div className={`${item.color} p-3 rounded-2xl shrink-0`}><item.icon size={20} strokeWidth={2.5} /></div>
              <div className="space-y-1">
                <h4 className="text-accent text-base font-black tracking-tight">{item.title}</h4>
                <p className="text-text-secondary text-[11px] leading-relaxed font-medium">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Proyección Estratégica (Banner Oscuro) */}
        <div className="bg-accent rounded-[32px] p-8 text-white relative overflow-hidden group border border-primary/10">
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
            <Flag size={120} />
          </div>
          <div className="relative z-10 flex items-start gap-6">
            <div className="bg-white/10 p-3 rounded-2xl text-primary shrink-0 border border-white/10">
              <Flag size={20} strokeWidth={2.5} />
            </div>
            <div className="space-y-1 max-w-3xl">
              <h4 className="text-white text-base font-black tracking-tight uppercase">Proyección Estratégica</h4>
              <p className="text-gray-400 text-[11px] leading-relaxed font-medium">
                De cara a 2026, la estrategia se orienta a consolidar el modelo actual, priorizando la estabilidad y la eficiencia operativa bajo criterios de sostenibilidad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Sección Inferior: Avisos y Actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-rose-50/30 rounded-[32px] p-8 border border-rose-100/50 space-y-6">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-rose-500" />
            <h3 className="text-rose-900 text-sm font-black uppercase tracking-widest">Avisos Corporativos (1)</h3>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-rose-100 shadow-sm relative group cursor-pointer" onClick={() => setSelectedNotice(MOCK_NOTICES[0])}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className="text-accent text-xs font-black">Cierre de Periodo Diciembre</h4>
              </div>
              <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest border-b border-rose-200">Ver Detalles</span>
            </div>
            <p className="text-text-secondary text-[10px] font-medium leading-relaxed">Rendimiento del 2.25% mensual procesado correctamente.</p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-surface-border shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-accent text-sm font-black uppercase tracking-widest">Actividad del Fondo</h3>
            <button className="text-[10px] font-bold text-text-muted hover:text-accent transition-colors">Ver registro completo</button>
          </div>
          <div className="space-y-6">
            {[
              { icon: Globe, label: 'Expansión de Cartera Forex', sub: 'Hoy, 09:30 AM', status: 'Ajuste Estratégico' },
              { icon: Coins, label: 'Adquisición Commodities', sub: 'Ayer, 16:00 PM', status: 'Hedge' },
              { icon: Activity, label: 'Cierre Mensual de Utilidades', sub: '01 Dic, 10:00 AM', status: 'Ejecutado', statusColor: 'text-green-600' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-surface-subtle rounded-xl flex items-center justify-center text-accent/70 group-hover:bg-accent group-hover:text-white transition-all">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-accent">{item.label}</h5>
                    <p className="text-[9px] font-medium text-text-muted">{item.sub}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-tight ${item.statusColor || 'text-accent'}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedNotice && (
        <NoticeModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />
      )}
    </div>
  );
};

export default ExecutiveSummary;
