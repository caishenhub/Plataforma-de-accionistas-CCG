
import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  onOpenMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onOpenMenu }) => {
  return (
    <header className="h-16 md:h-20 flex-shrink-0 border-b border-surface-border bg-white/90 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-3">
        <button 
          onClick={onOpenMenu}
          className="lg:hidden p-3 -ml-1 hover:bg-gray-100 rounded-xl transition-colors active:scale-90 flex items-center justify-center"
          style={{ minWidth: '44px', minHeight: '44px' }}
          aria-label="Abrir menú"
        >
          <Menu className="size-6 text-accent" />
        </button>
        
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] md:text-[11px] font-black text-accent tracking-tight uppercase">Portal Accionistas</span>
          <span className="hidden xs:block text-[8px] md:text-[8.5px] font-bold text-text-secondary uppercase tracking-[0.15em]">CCG Gestión</span>
        </div>
      </div>

      <div className="flex items-center">
        <div className="h-8 md:h-12 flex items-center">
          <img 
            src="https://i.ibb.co/zT3RhhT9/CAISHEN-NO-FONDO-AZUL-1.png" 
            alt="Caishen Capital" 
            className="h-full w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
