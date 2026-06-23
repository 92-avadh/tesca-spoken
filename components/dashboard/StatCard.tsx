'use client';

import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'accent' | 'blue' | 'indigo' | 'emerald';
}

export default function StatCard({
  label,
  value,
  trend,
  description,
  icon: Icon,
  color,
}: StatCardProps) {
  const colorMap = {
    primary: {
      bg: 'bg-primary-50',
      icon: 'text-primary',
      border: 'hover:border-primary-100',
    },
    secondary: {
      bg: 'bg-secondary-50',
      icon: 'text-secondary',
      border: 'hover:border-secondary-100',
    },
    accent: {
      bg: 'bg-accent-50',
      icon: 'text-accent',
      border: 'hover:border-accent-100',
    },
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-500',
      border: 'hover:border-blue-100',
    },
    indigo: {
      bg: 'bg-indigo-50',
      icon: 'text-indigo-500',
      border: 'hover:border-indigo-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      icon: 'text-emerald-500',
      border: 'hover:border-emerald-100',
    },
  };

  const style = colorMap[color] || colorMap.primary;

  return (
    <div className={`bg-white border border-gray-100/80 rounded-2xl p-5 shadow-soft hover:shadow-soft-lg transition-all duration-300 ${style.border}`}>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${style.bg} ${style.icon} transition-colors`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {(trend || description) && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50 text-xs">
          {trend && (
            <span
              className={`inline-flex items-center gap-0.5 font-bold rounded-full px-2 py-0.5 ${
                trend.isPositive
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-rose-50 text-rose-600'
              }`}
            >
              {trend.isPositive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {trend.value}%
            </span>
          )}
          {description && <span className="text-gray-400 font-medium">{description}</span>}
        </div>
      )}
    </div>
  );
}
