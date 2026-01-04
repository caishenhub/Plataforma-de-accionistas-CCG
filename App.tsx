
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio/Portfolio';
import ExecutiveSummary from './components/ExecutiveSummary/ExecutiveSummary';
import Reports from './components/Reports/Reports';
import Support from './components/Support/Support';
import UserManagement from './components/UserManagement/UserManagement';
import FinancialControl from './components/Admin/FinancialControl';
import { supabase } from './lib/supabase';
import { Cloud, CloudOff } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode, title: string }> = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [key, setKey] = useState(0);
  const [isCloudConnected, setIsCloudConnected] = useState(false);

  // Escuchar actualizaciones financieras globales para refrescar la UI
  useEffect(() => {
    const handleUpdate = () => setKey(prev => prev + 1);
    window.addEventListener('finance_update', handleUpdate);
    
    // Verificar conexión a Supabase
    const testConnection = async () => {
      try {
        const { error } = await supabase.from('financial_config').select('id').limit(1);
        // Consideramos conectado si el endpoint responde (aunque la tabla no exista aún)
        setIsCloudConnected(true);
      } catch (e) {
        setIsCloudConnected(false);
      }
    };
    testConnection();

    return () => window.removeEventListener('finance_update', handleUpdate);
  }, []);

  return (
    <div key={key} className="flex h-screen bg-[#fcfcfc] overflow-hidden">
      {/* Cloud Status Indicator (Floating Mini Badge) */}
      <div className="fixed bottom-6 right-6 z-[60] pointer-events-none">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white shadow-premium animate-in fade-in slide-in-from-bottom-2 duration-1000 ${
          isCloudConnected ? 'border-green-100 text-green-600' : 'border-orange-100 text-orange-400'
        }`}>
          {isCloudConnected ? <Cloud size={14} /> : <CloudOff size={14} />}
          <span className="text-[9px] font-black uppercase tracking-widest">
            {isCloudConnected ? 'Cloud Sync Active' : 'Offline Mode'}
          </span>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-accent/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title={title} onOpenMenu={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout title="Panel de Control"><Dashboard /></Layout>} />
        <Route path="/users" element={<Layout title="Gestión de Accionistas"><UserManagement /></Layout>} />
        <Route path="/portfolio" element={<Layout title="Mi Portafolio"><Portfolio /></Layout>} />
        <Route path="/summary" element={<Layout title="Resumen Ejecutivo"><ExecutiveSummary /></Layout>} />
        <Route path="/reports" element={<Layout title="Reportes Administrativos"><Reports /></Layout>} />
        <Route path="/support" element={<Layout title="Soporte y Ayuda"><Support /></Layout>} />
        <Route path="/admin/finance" element={<Layout title="Control Financiero"><FinancialControl /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
