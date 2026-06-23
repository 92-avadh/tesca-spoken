'use client';

interface ProgressRingProps {
  size?: number;
  strokeWidth?: number;
  percentage: number;
  color?: 'primary' | 'secondary' | 'accent' | 'blue' | 'emerald';
  title?: string;
  subtitle?: string;
}

export default function ProgressRing({
  size = 120,
  strokeWidth = 10,
  percentage,
  color = 'primary',
  title,
  subtitle,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    primary: 'text-primary stroke-primary',
    secondary: 'text-secondary stroke-secondary',
    accent: 'text-accent stroke-accent',
    blue: 'text-blue-500 stroke-blue-500',
    emerald: 'text-emerald-500 stroke-emerald-500',
  };

  const currentStroke = colorMap[color] || colorMap.primary;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100/80 rounded-2xl shadow-soft">
      {title && <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{title}</h4>}
      
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-gray-100 fill-none"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`fill-none transition-all duration-700 ease-out ${currentStroke}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-extrabold text-gray-800 tracking-tight">{percentage}%</span>
          {subtitle && <span className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}
