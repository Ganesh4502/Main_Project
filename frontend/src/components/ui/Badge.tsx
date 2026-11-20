import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'live' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const sizeStyles = {
    sm: 'text-[11px] font-semibold px-2 py-0.5 gap-1',
    md: 'text-xs font-semibold px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-semibold px-3 py-1.5 gap-2',
  };

  const variantStyles = {
    primary: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
    secondary: 'bg-slate-800 text-slate-300 border border-slate-700',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
    info: 'bg-sky-500/10 text-sky-400 border border-sky-500/30',
    live: 'bg-rose-500 text-white font-bold animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.6)] border border-rose-400',
    outline: 'border border-slate-700 text-slate-400 bg-transparent',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full uppercase tracking-wider ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === 'live' ? 'bg-white' : variant === 'success' ? 'bg-emerald-400' : variant === 'danger' ? 'bg-rose-400' : 'bg-current'
          }`}
        />
      )}
      {children}
    </span>
  );
};
