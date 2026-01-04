
import React, { useState } from 'react';
import { 
  Mail, 
  Video, 
  MessageSquare, 
  ChevronDown, 
  Send, 
  Calendar, 
  HelpCircle,
  Headset,
  AtSign,
  Clock
} from 'lucide-react';

const FAQS = [
  {
    question: "¿Cuánto tiempo tardan los retiros en procesarse?",
    answer: "Los retiros a cuentas bancarias nacionales generalmente se procesan en 24 horas hábiles. Para transferencias internacionales, puede tomar entre 2 a 5 días hábiles dependiendo de la entidad bancaria receptora."
  },
  {
    question: "¿Cómo puedo cambiar mi contraseña?",
    answer: "Puedes cambiar tu contraseña yendo a 'Configuración' en el menú lateral, seleccionando la pestaña 'Seguridad' y siguiendo los pasos para actualizar tus credenciales."
  },
  {
    question: "¿Qué comisiones cobra Caishen Capital?",
    answer: "Nuestras comisiones varían según el tipo de activo. Para acciones es 0.1%, criptomonedas 0.5% y ETFs 0.2%. Puedes ver el desglose completo en la sección de 'Reportes' > 'Comisiones'."
  },
  {
    question: "¿Es seguro mantener mi portafolio aquí?",
    answer: "Absolutamente. Utilizamos encriptación de grado militar (AES-256) y autenticación de dos factores (2FA) para proteger todas las cuentas. Además, los fondos están asegurados hasta cierto límite."
  }
];

const Support: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const SUPPORT_EMAIL = 'contacto@caishencapital.co';
  const BOOKING_LINK = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0_P4feGatgrX4EH0X_qvIhMq0x9xlJrMgKjzEtmL68QLkThUUQ-ZtvuTahld3jz1bLW-hfkJEv';
  const WHATSAPP_LINK = 'https://api.whatsapp.com/message/ZDXZP24WMRQRO1?autoload=1&app_absent=0';

  return (
    <div className="p-8 lg:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-accent text-4xl lg:text-5xl font-black tracking-tighter">Contactar Soporte</h1>
        <p className="text-text-secondary text-lg font-medium">Estamos aquí para resolver tus dudas y ayudarte con tus inversiones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Main Actions & FAQ) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Email Contact Card */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 border-2 border-primary shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Mail size={160} className="text-accent" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-2xl text-accent shadow-sm">
                  <Mail size={24} />
                </div>
                <h2 className="text-2xl font-black text-accent tracking-tight">Contacto por Correo Electrónico</h2>
              </div>
              
              <p className="text-text-secondary text-base font-medium max-w-lg leading-relaxed">
                Envíanos un correo directo para consultas detalladas o adjuntar documentación. Nuestro equipo responderá en menos de 24 horas.
              </p>
              
              <div className="bg-surface-subtle rounded-2xl p-4 border border-surface-border flex items-center gap-3 w-fit group/email">
                <AtSign size={18} className="text-text-muted group-hover/email:text-accent transition-colors" />
                <span className="text-accent font-bold text-sm select-all">{SUPPORT_EMAIL}</span>
              </div>
              
              <a 
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-accent font-black py-4 px-10 rounded-2xl transition-all shadow-md hover:-translate-y-1 active:scale-95 uppercase text-xs tracking-widest"
              >
                <span>Enviar Correo</span>
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-3xl p-8 border border-surface-border shadow-sm space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-surface-subtle p-3 rounded-2xl text-text-muted">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-2xl font-black text-accent tracking-tight">Preguntas Frecuentes</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {FAQS.map((faq, index) => (
                <div key={index} className="py-2">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className={`font-bold transition-colors ${openFaq === index ? 'text-accent text-lg' : 'text-text-main hover:text-accent'}`}>
                      {faq.question}
                    </span>
                    <div className={`p-1 rounded-lg transition-all ${openFaq === index ? 'bg-primary text-accent rotate-180' : 'bg-surface-subtle text-text-muted group-hover:bg-gray-100'}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                    <p className="text-text-secondary text-sm leading-relaxed pl-4 border-l-2 border-primary">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Quick Contact Only) */}
        <div className="space-y-6">
          
          {/* Video Call Card */}
          <div className="bg-white rounded-3xl p-8 border-2 border-primary shadow-lg relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Video size={100} className="text-accent" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-2xl text-accent shadow-sm">
                  <Video size={24} />
                </div>
                <h3 className="text-lg font-black text-accent leading-tight tracking-tight">
                  Asesoría Financiera<br/>por Videoconferencia
                </h3>
              </div>
              <p className="text-text-secondary text-sm font-medium leading-relaxed">
                Agenda una sesión personalizada con nuestros expertos para revisar tu estrategia de inversión.
              </p>
              <a 
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary hover:bg-primary-hover text-accent font-black py-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-3 uppercase text-xs tracking-widest hover:-translate-y-1"
              >
                <span>Reserva tu cita</span>
                <Calendar size={18} />
              </a>
            </div>
          </div>

          {/* Live Chat Card */}
          <div className="bg-accent rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group border border-accent">
            <div className="absolute -right-10 -top-10 bg-primary/20 size-40 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700"></div>
            <div className="relative z-10 space-y-6">
              <div className="bg-white/10 w-fit p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                <Headset size={24} className="text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black tracking-tight">Atención Directa</h3>
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm font-medium leading-relaxed">
                    Habla con uno de nuestros especialistas financieros vía WhatsApp.
                  </p>
                  <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                    <Clock size={16} className="text-primary mt-0.5 shrink-0" />
                    <div className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                      <p>Lun - Vie: 8:00 AM - 5:00 PM</p>
                      <p className="mt-1">Sábados: 9:00 AM - 12:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary hover:bg-primary-hover text-accent font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest hover:-translate-y-1"
              >
                <span>Iniciar Chat</span>
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Support;
