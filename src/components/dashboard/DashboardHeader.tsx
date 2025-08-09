import React from 'react';
import { authService } from '@/services/auth.service';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = "Tổng quan hệ thống",
  subtitle = "Quản lý toàn bộ hệ thống khách hàng và đơn hàng"
}) => {
  const isAdmin = authService.isAdmin();

  if (isAdmin) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    );
  }

  return (
    <div className='text-center items-center justify-center'>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tìm kiếm đơn hàng</h1>
      <p className="text-gray-600">Tìm kiếm đơn hàng từ hệ thống Shopify và Sapo</p>
    </div>
  );
};

export default DashboardHeader; 