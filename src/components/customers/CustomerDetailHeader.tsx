'use client';

import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/dist/client/link';

export default function CustomerDetailHeader({ customer }: { customer: any }) {
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col space-y-2'>
        <Link href="/customers">
          <Button variant="outline" size="sm" className='w-fit'>
            <p className='text-sm'>Quay lại</p>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Chi tiết khách hàng</h1>
        <p className="text-gray-600">Thông tin khách hàng {customer.id}</p>
      </div>
    </div>
  );
}