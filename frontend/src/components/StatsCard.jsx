import React from 'react';
import PropTypes from 'prop-types';

const COLORS = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    border: 'border-blue-200',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    border: 'border-green-200',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    border: 'border-red-200',
  },
  yellow: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    border: 'border-amber-200',
  }
};

const ICON_PATHS = {
  blue: 'M13 10V3L4 14h7v7l9-11h-7z',
  green: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  red: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  yellow: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
};

const StatsCard = ({ title, value, color = 'blue', isLoading = false }) => {
  const mappedColor = COLORS[color] || COLORS.blue;
  const iconPath = ICON_PATHS[color] || ICON_PATHS.blue;

  return (
    <div className={`${mappedColor.bg} border ${mappedColor.border} rounded-lg p-6 transition-shadow hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold text-gray-900 mt-2 ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '—' : value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${mappedColor.bg}`}>
          <svg className={`w-8 h-8 ${mappedColor.icon}`} fill="currentColor" viewBox="0 0 24 24">
            <path d={iconPath} />
          </svg>
        </div>
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow']),
  isLoading: PropTypes.bool,
};

export default StatsCard;
