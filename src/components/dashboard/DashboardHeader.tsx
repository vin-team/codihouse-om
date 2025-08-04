import React from 'react';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = "Dashboard Quản trị",
  subtitle = "Tổng quan đơn hàng từ Shopify và Sapo"
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};

export default DashboardHeader; 