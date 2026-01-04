
import React from 'react';
import { TrendingUp, LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeLabel?: string;
  icon: LucideIcon;
  variant?: 'light' | 'dark' | 'neon';
  progress?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeLabel, icon: Icon, variant = 'light', progress }) => {
  const containerClasses = {
    light: 'bg-white border-surface-border text-accent',
    dark: 'bg-accent border-accent text-white',
    neon: 'bg-primary border-primary text-accent shadow-neon'
  };

  const iconClasses = {
    light: 'text-primary opacity-10',
    dark: 'text-white opacity-5',
    neon: 'text-accent opacity-10'
  };

  return (
    <div className={`rounded-3xl p-7 border relative overflow-hidden group shadow-sm transition-all duration-300 hover:shadow-premium hover:-translate-y-1 ${containerClasses[variant]}`}>
      <div className={`absolute -right-6 -top-6 p-4 transition-opacity duration-500 group-hover:opacity-20 ${iconClasses[variant]}`}>
        {Icon && <Icon size={120} />}
      </div>
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${variant === 'dark' ? 'text-gray-400' : 'text-text-muted'}`}>
            {title}
          </p>
          <h3 className="text-4xl font-black tracking-tighter">
            {value}
          </h3>
        </div>
        
        <div className="mt-6">
          {progress !== undefined ? (
            <div className="space-y-3">
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-50 shadow-inner">
                <div 
                  className="bg-primary h-full rounded-full shadow-[0_0_12px_rgba(206,255,4,0.7)] transition-all duration-1000 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              {changeLabel && <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{changeLabel}</p>}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {change && (
                <span className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-extrabold shadow-sm ${
                  variant === 'neon' ? 'bg-accent text-primary' : 'bg-primary text-accent'
                }`}>
                  <TrendingUp size={12} />
                  {change}
                </span>
              )}
              {changeLabel && (
                <span className="text-[10px] font-bold text-text-muted tracking-tight">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
