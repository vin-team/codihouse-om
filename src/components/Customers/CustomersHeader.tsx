import React from 'react';

const CustomersHeader: React.FC = () => {
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Danh sách khách hàng</h1>
        <p className="text-gray-600">Quản lý thông tin khách hàng</p>
      </div>
      <div className='flex flex-col items-end'>
        <span className='text-2xl font-bold'>3</span>
        <p className='text-base text-gray-500'>khách hàng</p>
      </div>
    </div>
  );
};

export default CustomersHeader;