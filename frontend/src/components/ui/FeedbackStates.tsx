import React from 'react';
import { AlertCircle, PlusCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const Skeleton: React.FC<{ className?: string }> = ({ className = 'h-4 w-full' }) => (
  <div className={`bg-slate-800/60 animate-pulse rounded-xl ${className}`} />
);

export const CardSkeleton: React.FC = () => (
  <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
    <Skeleton className="h-40 w-full rounded-xl" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <div className="flex justify-between items-center pt-3">
      <Skeleton className="h-8 w-24 rounded-lg" />
      <Skeleton className="h-8 w-20 rounded-lg" />
    </div>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-36" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-800 bg-slate-900/60 h-80 space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-56 w-full rounded-xl" />
      </div>
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 h-80 space-y-4">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-56 w-full rounded-xl" />
      </div>
    </div>
  </div>
);

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <PlusCircle className="w-12 h-12 text-slate-500" />,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`p-12 text-center border border-dashed border-slate-800 rounded-3xl bg-slate-900/20 flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}>
      <div className="p-4 rounded-2xl bg-slate-800/40 text-slate-400 mb-4 inline-flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-100 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-400 mt-1.5 mb-6 max-w-sm leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionText}
        </Button>
      )}
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to load information',
  message = 'An unexpected error occurred while communicating with the server. Please verify network connectivity and try again.',
  onRetry,
}) => {
  return (
    <div className="p-10 text-center border border-rose-500/20 bg-rose-500/5 rounded-3xl max-w-md mx-auto flex flex-col items-center">
      <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h4 className="text-base font-bold text-slate-100">{title}</h4>
      <p className="text-xs text-slate-400 mt-1 mb-5 leading-relaxed">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Try Again
        </Button>
      )}
    </div>
  );
};
