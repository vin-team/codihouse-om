'use client';

import React from 'react';

interface CustomerDetailHeaderProps {
  title?: string;
  subtitle?: string;
}
const CustomerDetailHeader: React.FC<CustomerDetailHeaderProps> = ({
  title = "Chi tiết khách hàng",
  subtitle = "Thông tin chi tiết về khách hàng"
}) => {
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      <div className='flex flex-col items-end'>
        <span className='text-2xl font-bold'>#12345</span>
        <p className='text-base text-gray-500'>ID Khách hàng</p>
      </div>
    </div>
  );
};
export default CustomerDetailHeader;