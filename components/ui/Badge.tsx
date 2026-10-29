import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'teal' | 'slate' | 'amber' | 'emerald' | 'rose' | 'indigo';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'teal',
  size = 'sm',
  className = ''
}) => {
  const variantStyles = {
    teal: 'bg-teal-50 text-teal-700 border-teal-200/60',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/60',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/60',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/60'
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-sm px-3 py-1 font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
