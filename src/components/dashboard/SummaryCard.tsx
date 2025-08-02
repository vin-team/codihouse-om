import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitle2?: string;
  icon: React.ReactNode;
  valueColor?: string;
  iconBgColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  subtitle2,
  icon,
  valueColor = "text-gray-900",
  iconBgColor = "bg-gray-100"
}) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
          <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
          )}
          {subtitle2 && (
            <p className="text-xs text-gray-500">{subtitle2}</p>
          )}
        </div>
        <div className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard; 