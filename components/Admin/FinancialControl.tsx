
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  TrendingUp, 
  Lock, 
  Unlock, 
  AlertCircle, 
  CheckCircle2, 
  Calendar,
  Save,
  Info
} from 'lucide-react';
import { FINANCE_CONFIG, adminSetYield, adminClosePeriod } from '../../constants';

const FinancialControl: React.FC = () => {
  const [yieldValue, setYieldValue] = useState((FINANCE_CONFIG.CURRENT_MONTHLY_YIELD * 100).toString());
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClosed, setIsClosed] = useState(FINANCE_CONFIG.IS_PERIOD_CLOSED);

  const totalPayout = (FINANCE_CONFIG.GLOBAL_AUM * (parseFloat(yieldValue) / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      adminSetYield(parseFloat(yieldValue) / 100);
      setIsSaving(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  const handleClosePeriod = () => {
    if (window.confirm("¿Está seguro de cerrar el periodo? Esta acción BLOQUEARÁ cambios en la rentabilidad de este mes y actualizará los balances de todos los accionistas.")) {
      adminClosePeriod();
      setIsClosed(true);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 w-full mt-10">
      <div className="h-px bg-surface-border w-full mb-10"></div>
      
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent rounded-xl text-primary">
            <Settings size={20} />
          </div>
          <h2 className="text-accent text-2xl font-black tracking-tighter uppercase">Consola de Control Financiero</h2>
        </div>
        <p className="text-text-secondary font-medium text-sm">Configuración exclusiva de rendimientos variables para el fondo.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-subtle border border-surface-border p-5 rounded-[24px]">
          <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">AUM Consolidado</p>
          <p className="text-xl font-black text-accent">${FINANCE_CONFIG.GLOBAL_AUM.toLocaleString()}</p>
        </div>
        <div className="bg-surface-subtle border border-surface-border p-5 rounded-[24px]">
          <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">Status Periodo</p>
          <div className="flex items-center gap-2">
            {isClosed ? (
              <span className="flex items-center gap-1.5 text-red-600 font-black text-xs uppercase">
                <Lock size={14} /> Bloqueado
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-green-600 font-black text-xs uppercase">
                <Unlock size={14} /> Abierto
              </span>
            )}
          </div>
        </div>
        <div className="bg-primary/10 border border-primary/20 p-5 rounded-[24px]">
          <p className="text-[9px] font-black text-accent uppercase tracking-widest mb-1">Última Rentabilidad</p>
          <p className="text-xl font-black text-accent">{(FINANCE_CONFIG.CURRENT_MONTHLY_YIELD * 100).toFixed(1)}%</p>
        </div>
      </div>

      <div className="bg-accent rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <TrendingUp size={150} strokeWidth={1} />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start justify-between">
          <div className="space-y-6 max-w-sm w-full">
            <div className="flex items-center gap-3">
              <Calendar className="text-primary" size={24} />
              <h3 className="text-lg font-black tracking-tight">Cierre Mensual Dic 2025</h3>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Valor Rentabilidad (%)</label>
              <div className="relative">
                <input 
                  disabled={isClosed}
                  type="number"
                  step="0.01"
                  value={yieldValue}
                  onChange={(e) => setYieldValue(e.target.value)}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-5 py-4 text-3xl font-black text-white focus:border-primary focus:ring-0 transition-all disabled:opacity-50"
                  placeholder="0.00"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-3xl font-black text-primary">%</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-4">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 grid grid-cols-2 gap-6">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Payout Total</span>
                <span className="text-xl font-black text-primary">{totalPayout}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Por Acción</span>
                <span className="text-xl font-black text-white">
                  ${((FINANCE_CONFIG.GLOBAL_AUM * (parseFloat(yieldValue)/100)) / FINANCE_CONFIG.TOTAL_SHARES).toFixed(2)}
                </span>
              </div>
            </div>

            {!isClosed && (
              <div className="flex gap-3">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest"
                >
                  <Save size={14} />
                  {isSaving ? "Guardando..." : "Guardar"}
                </button>
                <button 
                  onClick={handleClosePeriod}
                  className="flex-1 bg-primary hover:bg-primary-hover text-accent font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest shadow-lg"
                >
                  <Lock size={14} />
                  Confirmar Cierre
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
        <Info className="text-blue-600 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-blue-800/80 font-medium leading-relaxed">
          <strong>Aviso de Auditoría:</strong> La rentabilidad ingresada se aplicará de forma automática y proporcional a todos los accionistas. Una vez confirmado el cierre, no se podrán realizar ediciones adicionales para este periodo.
        </p>
      </div>

      {isSuccess && (
        <div className="fixed bottom-10 right-10 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 font-black uppercase text-xs tracking-widest z-[200]">
          <CheckCircle2 size={20} />
          Rentabilidad Actualizada
        </div>
      )}
    </div>
  );
};

export default FinancialControl;
