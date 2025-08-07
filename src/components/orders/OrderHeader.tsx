'use client';

import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/dist/client/link';
import { Order } from '@/model/Order.model';

export default function OrderHeader({ order }: { order: Order }) {

  return (
    <div className='flex-1 flex flex-row justify-between'>
      <div className='flex flex-col space-y-2'>
        <Link href="/orders">
          <Button variant="outline" size="sm" className='w-fit'>
            <p className='text-sm'>Quay lại</p>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Chi tiết đơn hàng</h1>
        <p className="tet-gray-600">Thông tin đơn hàng {order?.code}</p>
      </div>
      <div className='flex flex-row gap-2 items-end'>
        {order?.source !== '-' &&
          <Badge className="bg-gray-300 rounded-full text-white hover:bg-gray-300 h-fit text-xs font-semibold">
            <p className='text-xs font-semibold text-black text-center'>{order?.source?.toUpperCase()}</p>
          </Badge>}
        <Badge className="bg-green-500 rounded-full text-white hover:bg-green-500 h-fit text-xs font-semibold">
          <p className='text-xs font-semibold text-center'>{order?.status?.toUpperCase()}</p>
        </Badge>
      </div>
    </div>
  );
}