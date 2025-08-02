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
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3.26818L16 8.41871M1.33333 5.99846L11 10.999M11 10.999L20.6667 5.99846M11 10.999V21M21 6.99856C20.9996 6.6478 20.8967 6.3033 20.7017 5.99962C20.5067 5.69595 20.2264 5.44377 19.8889 5.26839L12.1111 1.26798C11.7733 1.09242 11.3901 1 11 1C10.6099 1 10.2267 1.09242 9.88889 1.26798L2.11111 5.26839C1.77362 5.44377 1.49331 5.69595 1.29829 5.99962C1.10327 6.3033 1.0004 6.6478 1 6.99856V14.9994C1.0004 15.3501 1.10327 15.6946 1.29829 15.9983C1.49331 16.302 1.77362 16.5542 2.11111 16.7296L9.88889 20.73C10.2267 20.9055 10.6099 20.9979 11 20.9979C11.3901 20.9979 11.7733 20.9055 12.1111 20.73L19.8889 16.7296C20.2264 16.5542 20.5067 16.302 20.7017 15.9983C20.8967 15.6946 20.9996 15.3501 21 14.9994V6.99856Z" stroke="#6B7280" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      ),
      valueColor: "text-gray-900",
    },
    {
      title: "Chưa xử lý",
      value: "4",
      subtitle: "Cần xử lý ngay",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1V0.333333C0.63181 0.333333 0.333333 0.63181 0.333333 1L1 1ZM21 1H21.6667C21.6667 0.63181 21.3682 0.333333 21 0.333333V1ZM21 21V21.6667C21.3682 21.6667 21.6667 21.3682 21.6667 21H21ZM1 21H0.333333C0.333333 21.3682 0.63181 21.6667 1 21.6667L1 21ZM1 1V1.66667H21V1V0.333333H1V1ZM21 1H20.3333V21H21H21.6667V1H21ZM21 21V20.3333H1V21V21.6667H21V21ZM1 21H1.66667V1H1H0.333333V21H1Z" fill="#F97316" />
          <path d="M11 5V11.75L16 14" stroke="#F97316" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      ),
      valueColor: "text-orange-600",
    },
    {
      title: "Đã hoàn thành",
      value: "4",
      subtitle: "+8% so với tuần trước",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1V0.333333C0.63181 0.333333 0.333333 0.63181 0.333333 1L1 1ZM21 1H21.6667C21.6667 0.63181 21.3682 0.333333 21 0.333333V1ZM21 21V21.6667C21.3682 21.6667 21.6667 21.3682 21.6667 21H21ZM1 21H0.333333C0.333333 21.3682 0.63181 21.6667 1 21.6667L1 21ZM1 1V1.66667H21V1V0.333333H1V1ZM21 1H20.3333V21H21H21.6667V1H21ZM21 21V20.3333H1V21V21.6667H21V21ZM1 21H1.66667V1H1H0.333333V21H1Z" fill="#22C55E" />
          <path d="M7 11.6663L9.5 14.1663L17.8333 5.83301" stroke="#22C55E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      ),
      valueColor: "text-green-600",
    },
    {
      title: "Doanh thu tháng 4/2025",
      value: "161.189.000₫",
      subtitle: "+15% so với tháng trước",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6L11.35 13.65L6.85 9.15L1 15M19 6H13.6M19 6L19 11.4" stroke="#6B7280" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      ),
      icon2: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      ),
      valueColor: "text-gray-900",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((data, index) => (
        <SummaryCard
          key={index}
          title={data.title}
          value={data.value}
          subtitle={data.subtitle}
          subtitle2={data.subtitle2}
          icon={data.icon}
          icon2={data.icon2}
          valueColor={data.valueColor}
        />
      ))}
    </div>
  );
};

export default SummaryCards; 