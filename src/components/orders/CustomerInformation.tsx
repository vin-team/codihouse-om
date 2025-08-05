'use client';

import { OrderDetail } from '@/pages/orders/[id]';
import { MapPin, Phone, User } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface CustomerInformationProps {
  orderDetail: OrderDetail
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({ orderDetail }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className='flex flex-row justify-between pb-2'>
        <div className='flex flex-row items-center gap-2'>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8332 17.5V15.8333C15.8332 14.9493 15.482 14.1014 14.8569 13.4763C14.2317 12.8512 13.3839 12.5 12.4998 12.5H7.49984C6.61578 12.5 5.76794 12.8512 5.14281 13.4763C4.51769 14.1014 4.1665 14.9493 4.1665 15.8333V17.5" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.99984 9.16667C11.8408 9.16667 13.3332 7.67428 13.3332 5.83333C13.3332 3.99238 11.8408 2.5 9.99984 2.5C8.15889 2.5 6.6665 3.99238 6.6665 5.83333C6.6665 7.67428 8.15889 9.16667 9.99984 9.16667Z" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className='text-xl font-medium'>Thông tin khách hàng</span>
        </div>
      </div>
      <div className="space-y-3 text-sm">
        <div className='flex flex-col'>
          <div className='text-gray-500'>Họ tên</div>
          <div className='flex flex-row space-x-6 items-center'>
            <span className="font-medium">{orderDetail.customer}</span>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Xem hồ sơ
            </Button>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-row space-x-2'>
            <Phone className="h-4 w-4 text-gray-500" />
            <div className='text-gray-500'>Số điện thoại</div>
          </div>
          <span className='font-medium'>{orderDetail.customerPhone}</span>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-row space-x-2'>
            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
            <div className='text-gray-500'>Địa chỉ giao hàng</div>
          </div>
          <span className='font-medium'>{orderDetail.shippingAddress.address}</span>
        </div>
        <div className='flex flex-col'>
          <div>Nhóm khách hàng:</div>
          <span className="font-medium">{orderDetail.customerStatus}</span>
        </div>
        <div className='flex flex-col'>
          <div>Tổng chi tiêu:</div>
          <span className="font-medium">{orderDetail.finalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerInformation;