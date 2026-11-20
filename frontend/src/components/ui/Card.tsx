import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'interactive' | 'outline' | 'glow';
  glowColor?: 'emerald' | 'blue' | 'purple';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  glowColor = 'emerald',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-300 relative overflow-hidden';

  const variantStyles = {
    glass: 'bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-xl',
    solid: 'bg-slate-900 border border-slate-800 shadow-xl',
    interactive: 'bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/60 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer group',
    outline: 'bg-transparent border border-slate-800 hover:border-slate-700',
    glow: `bg-slate-900/80 backdrop-blur-xl border border-${glowColor}-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]`,
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-6 pb-3 flex items-center justify-between border-b border-slate-800/60 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className = '', ...props }) => (
  <p className={`text-xs text-slate-400 mt-1 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-6 pt-3 border-t border-slate-800/60 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);
