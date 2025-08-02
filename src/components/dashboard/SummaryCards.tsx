import React from 'react';
import SummaryCard from './SummaryCard';

const SummaryCards: React.FC = () => {
  const summaryData = [
    {
      title: "Tổng đơn hàng",
      value: "1356",
      subtitle: "623 đơn từ Shopify",
      subtitle2: "733 đơn từ Sapo",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4L8 1L14 4V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V4Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 13V7H10V13" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      valueColor: "text-gray-900",
      iconBgColor: "bg-gray-100"
    },
    {
      title: "Chưa xử lý",
      value: "4",
      subtitle: "Cần xử lý ngay",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2V8L11 11" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8" cy="8" r="6" stroke="#F97316" strokeWidth="1.5"/>
        </svg>
      ),
      valueColor: "text-orange-600",
      iconBgColor: "bg-orange-100"
    },
    {
      title: "Đã hoàn thành",
      value: "4",
      subtitle: "+8% so với tuần trước",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 4L6 11L3 8" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      valueColor: "text-green-600",
      iconBgColor: "bg-green-100"
    },
    {
      title: "Doanh thu tháng 4/2025",
      value: "161.189.000₫",
      subtitle: "+15% so với tháng trước",
      icon: (
        <div className="flex space-x-1">
          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10L4 8L6 9L10 5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2V4M4 2V4M2 4H10M2 6V10C2 10.5523 2.44772 11 3 11H9C9.55228 11 10 10.5523 10 10V6H2Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      ),
      valueColor: "text-gray-900",
      iconBgColor: "bg-transparent"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData.map((data, index) => (
        <SummaryCard
          key={index}
          title={data.title}
          value={data.value}
          subtitle={data.subtitle}
          subtitle2={data.subtitle2}
          icon={data.icon}
          valueColor={data.valueColor}
          iconBgColor={data.iconBgColor}
        />
      ))}
    </div>
  );
};

export default SummaryCards; 