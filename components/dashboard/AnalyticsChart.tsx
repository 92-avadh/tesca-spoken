'use client';

import { useState } from 'react';

interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface AnalyticsChartProps {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  type?: 'bar' | 'line';
  valuePrefix?: string;
  valueSuffix?: string;
  color?: 'primary' | 'secondary' | 'indigo';
}

export default function AnalyticsChart({
  title,
  subtitle,
  data,
  type = 'bar',
  valuePrefix = '',
  valueSuffix = '',
  color = 'primary',
}: AnalyticsChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxVal = Math.max(...data.map((d) => Math.max(d.value, d.secondaryValue || 0)), 10);
  // Round maxVal up to a nice number
  const roundMax = Math.ceil(maxVal / 10) * 10;

  // Colors
  const colorMap = {
    primary: {
      fill: 'url(#primaryGradient)',
      stroke: '#067779',
      bullet: 'bg-primary',
    },
    secondary: {
      fill: 'url(#secondaryGradient)',
      stroke: '#F97823',
      bullet: 'bg-secondary',
    },
    indigo: {
      fill: 'url(#indigoGradient)',
      stroke: '#6366f1',
      bullet: 'bg-indigo-500',
    },
  };

  const currentTheme = colorMap[color] || colorMap.primary;

  return (
    <div className="bg-white border border-gray-100/80 rounded-2xl p-6 shadow-soft">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-800">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${currentTheme.bullet}`} />
            <span>This Month</span>
          </div>
          {data.some((d) => d.secondaryValue !== undefined) && (
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              <span>Target / Last Month</span>
            </div>
          )}
        </div>
      </div>

      {/* SVG Chart area */}
      <div className="relative w-full h-64 select-none">
        <svg viewBox="0 0 500 220" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#067779" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#067779" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="secondaryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97823" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F97823" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = 20 + ratio * 160;
            const gridVal = roundMax * (1 - ratio);
            return (
              <g key={i} className="opacity-40">
                <line
                  x1="35"
                  y1={y}
                  x2="490"
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x="25"
                  y={y + 4}
                  textAnchor="end"
                  className="fill-gray-400 text-[9px] font-medium"
                >
                  {valuePrefix}
                  {Math.round(gridVal)}
                  {valueSuffix}
                </text>
              </g>
            );
          })}

          {/* Render Line Chart */}
          {type === 'line' && (
            <>
              {/* Secondary Value line (dashed, gray) */}
              {data.some((d) => d.secondaryValue !== undefined) && (
                <path
                  d={data
                    .map((d, i) => {
                      const x = 50 + (i / (data.length - 1)) * 420;
                      const y = 180 - ((d.secondaryValue || 0) / roundMax) * 160;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
              )}

              {/* Gradient Fill under main line */}
              <path
                d={`${data
                  .map((d, i) => {
                    const x = 50 + (i / (data.length - 1)) * 420;
                    const y = 180 - (d.value / roundMax) * 160;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  })
                  .join(' ')} L ${50 + 420} 180 L 50 180 Z`}
                fill={currentTheme.fill}
              />

              {/* Main Stroke line */}
              <path
                d={data
                  .map((d, i) => {
                    const x = 50 + (i / (data.length - 1)) * 420;
                    const y = 180 - (d.value / roundMax) * 160;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke={currentTheme.stroke}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {data.map((d, i) => {
                const x = 50 + (i / (data.length - 1)) * 420;
                const y = 180 - (d.value / roundMax) * 160;
                const isHovered = hoveredIndex === i;

                return (
                  <g key={i} className="cursor-pointer">
                    {/* Hover hotspot */}
                    <circle
                      cx={x}
                      cy={y}
                      r="16"
                      fill="transparent"
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                    {/* Visual point */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? '6' : '4'}
                      fill="#FFFFFF"
                      stroke={currentTheme.stroke}
                      strokeWidth={isHovered ? '3' : '2.5'}
                      className="transition-all duration-150"
                    />
                  </g>
                );
              })}
            </>
          )}

          {/* Render Bar Chart */}
          {type === 'bar' &&
            data.map((d, i) => {
              const xCenter = 50 + (i / (data.length - 1)) * 420;
              const barWidth = 14;
              const hasSec = d.secondaryValue !== undefined;

              // Compute Y positions
              const valY = 180 - (d.value / roundMax) * 160;
              const valHeight = (d.value / roundMax) * 160;

              const secY = hasSec ? 180 - ((d.secondaryValue || 0) / roundMax) * 160 : 0;
              const secHeight = hasSec ? ((d.secondaryValue || 0) / roundMax) * 160 : 0;

              const isHovered = hoveredIndex === i;

              return (
                <g
                  key={i}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Background highlight pill for hover */}
                  <rect
                    x={xCenter - 20}
                    y="10"
                    width="40"
                    height="180"
                    rx="8"
                    className={`transition-colors duration-150 ${
                      isHovered ? 'fill-gray-50' : 'fill-transparent'
                    }`}
                  />

                  {/* Primary Bar */}
                  <rect
                    x={hasSec ? xCenter - barWidth : xCenter - barWidth / 2}
                    y={valY}
                    width={barWidth}
                    height={Math.max(valHeight, 4)} // Ensure it has some height
                    rx="4"
                    fill={currentTheme.stroke}
                    className="transition-all duration-300"
                    style={{ transformOrigin: `${xCenter}px 180px` }}
                  />

                  {/* Secondary Bar */}
                  {hasSec && (
                    <rect
                      x={xCenter + 2}
                      y={secY}
                      width={barWidth}
                      height={Math.max(secHeight, 4)}
                      rx="4"
                      fill="#CBD5E1"
                      className="transition-all duration-300"
                      style={{ transformOrigin: `${xCenter}px 180px` }}
                    />
                  )}
                </g>
              );
            })}

          {/* X Axis Labels */}
          {data.map((d, i) => {
            const x = 50 + (i / (data.length - 1)) * 420;
            return (
              <text
                key={i}
                x={x}
                y="204"
                textAnchor="middle"
                className="fill-gray-400 text-[10px] font-bold"
              >
                {d.label}
              </text>
            );
          })}
        </svg>

        {/* Dynamic Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="absolute z-20 bg-gray-900/95 text-white text-[11px] font-medium rounded-xl p-3 shadow-xl backdrop-blur-md pointer-events-none transition-all duration-75 -translate-y-[calc(100%+8px)] -translate-x-1/2 flex flex-col gap-1 border border-white/10"
            style={{
              left: `${50 + (hoveredIndex / (data.length - 1)) * 84}%`,
              top: `${
                180 -
                ((data[hoveredIndex].value / roundMax) * 160 * 220) / 220
              }px`,
            }}
          >
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">
              {data[hoveredIndex].label}
            </span>
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${currentTheme.bullet}`} />
              <span>
                Value: <b className="text-white">{valuePrefix}{data[hoveredIndex].value}{valueSuffix}</b>
              </span>
            </div>
            {data[hoveredIndex].secondaryValue !== undefined && (
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-400" />
                <span>
                  Target: <b className="text-white">{valuePrefix}{data[hoveredIndex].secondaryValue}{valueSuffix}</b>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
