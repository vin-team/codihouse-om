import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitle2?: string;
  icon: React.ReactNode;
  icon2?: React.ReactNode;
  valueColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  subtitle2,
  icon,
  icon2,
  valueColor = "text-gray-900",
}) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex flex-col">
        <div className='flex flex-row justify-between items-center w-full pb-2'>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {icon}
        </div>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col gap-1'>
            <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
            <div className='flex flex-row space-x-6 items-center'>
              {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
              )}
              {subtitle2 && (
                <p className="text-xs text-gray-500">{subtitle2}</p>
              )}
            </div>
          </div>
          <div className='items-end flex justify-end'>
            {icon2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard; 