
import React from 'react';
import { 
  Menu
} from 'lucide-react';

interface HeaderProps {
  title: string;
  onOpenMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onOpenMenu }) => {
  return (
    <header className="h-20 flex-shrink-0 border-b border-surface-border bg-white/80 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenMenu}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Menu className="size-6 text-accent" />
        </button>
        
        {/* Identidad del portal con tamaño de fuente reducido un nivel */}
        <div className="flex flex-col leading-none">
          <span className="text-[11px] font-black text-accent tracking-tight uppercase">Portal de Accionistas</span>
          <span className="text-[8.5px] font-bold text-text-secondary uppercase tracking-[0.2em] mt-1">Vista Consolidada</span>
        </div>
      </div>

      <div className="flex items-center">
        {/* Identidad Corporativa - Logo a la derecha */}
        <div className="h-10 lg:h-14 flex items-center justify-center">
          <img 
            src="https://i.ibb.co/zT3RhhT9/CAISHEN-NO-FONDO-AZUL-1.png" 
            alt="Caishen Capital Logo" 
            className="h-full w-auto object-contain drop-shadow-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
