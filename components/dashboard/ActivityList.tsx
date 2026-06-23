'use client';

import type { LucideIcon } from 'lucide-react';

interface ActivityItem {
  id: string | number;
  title: string;
  description: string;
  time: string;
  icon?: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
}

interface ActivityListProps {
  title: string;
  activities: ActivityItem[];
  emptyText?: string;
}

export default function ActivityList({
  title,
  activities,
  emptyText = 'No recent activities found',
}: ActivityListProps) {
  const statusColorMap = {
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    error: 'bg-rose-50 text-rose-600',
    info: 'bg-blue-50 text-blue-600',
  };

  return (
    <div className="bg-white border border-gray-100/80 rounded-2xl p-6 shadow-soft flex flex-col h-full">
      <h3 className="text-base font-bold text-gray-800 mb-5">{title}</h3>

      {activities.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm text-gray-400 font-medium">{emptyText}</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {activities.map((activity, idx) => {
            const Icon = activity.icon;
            const statusClass = activity.status ? statusColorMap[activity.status] : '';
            
            return (
              <div key={activity.id} className="flex gap-4 items-start group">
                {/* Timeline line */}
                <div className="relative flex flex-col items-center flex-shrink-0">
                  <div className={`
                    h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-300
                    ${statusClass || activity.iconBg || 'bg-gray-50'} 
                    ${activity.iconColor || 'text-gray-500'}
                  `}>
                    {Icon ? (
                      <Icon className="h-4.5 w-4.5" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-current" />
                    )}
                  </div>
                  {idx < activities.length - 1 && (
                    <div className="w-0.5 h-10 bg-gray-100 absolute top-9 left-1/2 -translate-x-1/2 -z-10 group-hover:bg-gray-200 transition-colors" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm font-semibold text-gray-800 leading-tight truncate">
                      {activity.title}
                    </p>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex-shrink-0">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-medium mt-1 leading-normal">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
