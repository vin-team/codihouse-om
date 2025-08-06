import React from 'react';

const CustomersHeader: React.FC = () => {
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý khách hàng</h1>
        <p className="text-gray-600">Xem thông tin khách hàng từ tất cả chi nhánh</p>
      </div>
    </div>
  );
};

export default CustomersHeader;