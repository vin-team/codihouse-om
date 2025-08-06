'use client';

import React from 'react';

interface OrdersHeaderProps {
  title?: string;
  subtitle?: string;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  title = "Danh sách đơn hàng",
  subtitle = "Xem tất cả đơn hàng từ các chi nhánh"
}) => {
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      <div className='flex flex-col items-end'>
        <span className='text-2xl font-bold'>1356</span>
        <p className='text-base text-gray-500'>đơn hàng</p>
      </div>
    </div>
  );
};

export default OrdersHeader; 