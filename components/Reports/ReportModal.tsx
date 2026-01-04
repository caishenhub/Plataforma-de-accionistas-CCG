
import React from 'react';
import { X, Calendar, Check, FileText } from 'lucide-react';
import { Report } from '../../types';

interface ReportModalProps {
  report: Report;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ report, onClose }) => {
  // Prevent scroll on body when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Mensual': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Auditoría': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'Estrategia': return 'bg-green-50 text-green-700 border-green-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-accent/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start border-b border-gray-50">
          <div className="space-y-3">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${getCategoryColor(report.category)}`}>
              {report.category}
            </span>
            <h2 className="text-2xl font-black text-accent tracking-tighter leading-tight">
              {report.title}
            </h2>
            <div className="flex items-center gap-2 text-text-muted text-[10px] font-bold">
              <Calendar size={12} />
              <span>{report.date}</span>
              <span className="mx-1">•</span>
              <span>{report.category}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-text-muted"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
          {/* Intro highlight block */}
          <div className="pl-4 border-l-4 border-primary py-1">
            <p className="text-accent font-bold leading-relaxed">
              {report.summary}
            </p>
          </div>

          <div className="space-y-6">
            <section className="space-y-3">
              <h4 className="text-lg font-black text-accent tracking-tight">1. Resumen Ejecutivo</h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                El presente informe tiene como objetivo comunicar las actualizaciones más recientes y relevantes concernientes a "{report.title}". Nuestro equipo de análisis ha identificado oportunidades clave que se alinean con la visión a largo plazo de Caishen Capital Group.
              </p>
            </section>

            <section className="space-y-3">
              <h4 className="text-lg font-black text-accent tracking-tight">2. Análisis de Rendimiento</h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                Durante el último periodo, los indicadores financieros han mostrado un comportamiento robusto frente a la volatilidad del mercado. Se destacan los siguientes puntos:
              </p>
              <ul className="space-y-2 pl-2">
                {[
                  'Incremento sostenido en el valor de los activos bajo gestión.',
                  'Optimización de los costos operativos mediante nuevas tecnologías.',
                  'Diversificación estratégica en sectores emergentes.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="size-1.5 rounded-full bg-text-muted mt-2 shrink-0" />
                    <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h4 className="text-lg font-black text-accent tracking-tight">3. Proyecciones y Próximos Pasos</h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                Basado en los datos actuales, proyectamos un crecimiento continuo para el próximo trimestre. Se recomienda a los inversores mantener sus posiciones y estar atentos a los próximos comunicados oficiales sobre ajustes tácticos en el portafolio.
              </p>
            </section>
          </div>

          {/* Important Note Block */}
          <div className="bg-blue-50/50 border-l-4 border-blue-500 p-5 rounded-r-2xl">
            <p className="text-[11px] leading-relaxed">
              <strong className="text-blue-900">Nota Importante:</strong> <span className="text-blue-800/80 font-medium">Este documento es confidencial y para uso exclusivo de los miembros autorizados de Caishen Capital Group.</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50/50 flex items-center justify-end gap-3 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-black text-accent bg-white border border-surface-border hover:bg-white/50 transition-colors"
          >
            Cerrar
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-accent hover:bg-accent/90 flex items-center gap-2 transition-all"
          >
            <Check size={14} className="text-primary" />
            <span>Entendido</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
