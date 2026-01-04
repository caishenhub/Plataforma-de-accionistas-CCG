
import React from 'react';
import { 
  Menu, 
  Building2
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
        <div>
          <h2 className="text-accent text-base lg:text-lg font-extrabold tracking-tight">{title}</h2>
        </div>
      </div>

      <div className="flex items-center">
        {/* Corporate Identity Section */}
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="hidden sm:flex flex-col items-end leading-tight">
            <span className="text-sm font-black text-accent tracking-tight">Portal de Accionistas</span>
            <span className="text-[11px] font-bold text-text-secondary">Vista Consolidada</span>
          </div>
          <div className="size-9 lg:size-10 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-text-secondary/60">
            <Building2 className="size-[18px] lg:size-5" strokeWidth={2} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
