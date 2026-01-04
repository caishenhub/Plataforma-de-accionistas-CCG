
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PieChart, 
  TrendingUp, 
  FileText, 
  Headset, 
  ChevronRight,
  X,
  Users
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Gestión de Accionistas', path: '/users', icon: Users },
    { name: 'Portafolio', path: '/portfolio', icon: PieChart },
    { name: 'Resumen Ejecutivo', path: '/summary', icon: TrendingUp },
    { name: 'Reportes', path: '/reports', icon: FileText },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-surface-border flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="p-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-accent text-xl font-extrabold tracking-tighter">Caishen Capital Group</h1>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-text-muted hover:text-accent">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto hide-scrollbar">
        {menuItems.map((item) => {
          const ActiveIcon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center justify-between group px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                active 
                  ? 'bg-primary text-accent shadow-premium' 
                  : 'text-text-secondary hover:bg-gray-50 hover:text-accent'
              }`}
            >
              <div className="flex items-center gap-4">
                <ActiveIcon className={`size-5 ${active ? 'text-accent' : 'text-text-secondary group-hover:text-accent'} transition-colors`} />
                <span className={`text-sm font-bold tracking-tight ${active ? 'text-accent' : ''}`}>
                  {item.name}
                </span>
              </div>
              <ChevronRight className={`size-4 opacity-0 group-hover:opacity-100 transition-all ${active ? 'translate-x-0 opacity-100' : '-translate-x-2'}`} />
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto space-y-4">
        <div className="h-px bg-surface-border w-full"></div>

        <Link 
          to="/support"
          onClick={onClose}
          className="w-full flex items-center gap-3 px-4 py-4 rounded-3xl bg-primary border border-primary shadow-[0_8px_20px_rgba(206,255,4,0.25)] hover:shadow-[0_12px_24px_rgba(206,255,4,0.4)] hover:-translate-y-1 transition-all group cursor-pointer"
        >
          <div className="bg-white/80 p-2.5 rounded-full text-accent shadow-sm group-hover:bg-white transition-colors">
            <Headset size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-accent text-sm font-black leading-tight">¿Necesitas ayuda?</span>
            <span className="text-accent/70 text-xs font-bold mt-0.5">Contactar soporte</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
