import React from 'react';

const COLORS = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    text: 'text-blue-600',
    ring: 'from-blue-50 to-blue-100'
  },
  green: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    text: 'text-emerald-600',
    ring: 'from-emerald-50 to-emerald-100'
  },
  red: {
    bg: 'bg-rose-50',
    icon: 'text-rose-600',
    text: 'text-rose-600',
    ring: 'from-rose-50 to-rose-100'
  },
  yellow: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    text: 'text-amber-600',
    ring: 'from-amber-50 to-amber-100'
  }
};

const ICON_PATHS = {
  blue: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  green: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  red: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  yellow: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
};

const StatsCard = ({ title, value, trend = '+12%', color = 'blue', isLoading = false }) => {
  const trendColor = trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600';
  const mappedColor = COLORS[color] || COLORS.blue;

  return (
    <div className={`group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${isLoading ? 'shimmer animate-pulse' : ''}`}>
      <div className="flex items-center justify-between relative">
        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide group-hover:text-gray-800">{title}</p>
          <p className={`text-3xl md:text-4xl font-black mt-1 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '...' : value}
          </p>
        </div>
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${mappedColor.ring} group-hover:scale-110 transition-all duration-300`}>
          <svg className={`w-8 h-8 ${mappedColor.icon} drop-shadow-sm`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICON_PATHS[color] || ICON_PATHS.blue} />
          </svg>
        </div>
      </div>
      {trend && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <svg className={`w-4 h-4 ${trendColor} animate-bounce`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <p className={`text-sm font-semibold ${trendColor}`}>{trend}</p>
          </div>
          <div className="flex gap-0.5 mt-2 h-3 bg-gray-100 rounded-full p-1">
            {[1, 3, 2, 5, 4, 6].map((point, i) => (
              <div
                key={i}
                className={`flex-1 rounded h-full ${trendColor} opacity-80`}
                style={{ height: `${point * 10}%` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
