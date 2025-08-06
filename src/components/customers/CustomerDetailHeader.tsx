'use client';

import React from 'react';
import { Button } from '../ui/button';
import router from 'next/dist/client/router';

export default function CustomerDetailHeader({ customer }: { customer: any }) {
  const handleBack = () => {
    router.push('/customers');
  };

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col space-y-2'>
        <Button variant="outline" size="sm" className='w-fit' onClick={handleBack}>
          <p className='text-sm'>Quay lại</p>
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Chi tiết khách hàng</h1>
        <p className="text-gray-600">Thông tin khách hàng {customer.id}</p>
      </div>
    </div>
  );
}