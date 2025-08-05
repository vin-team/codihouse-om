import { useAppSelector } from '@/hooks/redux';
import { roleService } from '@/services/role.service';
import React from 'react';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = "Dashboard Quản trị",
  subtitle = "Tổng quan đơn hàng từ Shopify và Sapo"
}) => {
    const isAdmin = roleService.isAdmin();

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