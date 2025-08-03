'use client';

import { OrderDetail } from '@/pages/orders/[id]';
import React from 'react';
import { Badge } from '../ui/badge';

interface OrderHeaderProps {
  orderDetail: OrderDetail
}

const OrderHeader: React.FC<OrderHeaderProps> = (props) => {

  return (
    <div className='flex-1 flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chi tiết đơn hàng</h1>
        <p className="text-gray-600">#{props.orderDetail.id}</p>
      </div>
      <div className='flex flex-row gap-2 items-end'>
        <Badge className="bg-gray-300 rounded-full text-white hover:bg-gray-300 h-fit text-xs font-semibold">
          <p className='text-xs font-semibold text-black text-center'>{props.orderDetail.platform.toUpperCase()}</p>
        </Badge>
        <Badge className="bg-green-500 rounded-full text-white hover:bg-green-500 h-fit text-xs font-semibold">
          <p className='text-xs font-semibold text-center'>{props.orderDetail.status}</p>
        </Badge>
      </div>
    </div>
  );
};

export default OrderHeader;