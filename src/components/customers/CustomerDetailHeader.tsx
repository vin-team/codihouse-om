'use client';

import React from 'react';
import { Customer } from '@/model/Customer.model';
import { BackButton } from '../ui/back-button';

export default function CustomerDetailHeader({ customer }: { customer: Customer }) {
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col space-y-2'>
        <BackButton fallbackHref="/customers" />
        <h1 className="text-3xl font-bold text-gray-900">Chi tiết khách hàng</h1>
        <p className="text-gray-600">Thông tin khách hàng {customer.code}</p>
      </div>
    </div>
  );
}