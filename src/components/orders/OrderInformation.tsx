'use client';

import { OrderDetail } from '@/pages/orders/[id]';
import { ExternalLink } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface OrderInformationProps {
  orderDetail: OrderDetail
}

const OrderInformation: React.FC<OrderInformationProps> = ({ orderDetail }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 h-full">
      <div className='flex flex-row justify-between pb-2'>
        <div className='flex flex-row items-center gap-2'>
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.25 4.05811L13.75 8.34977" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.5 7.16675C17.4997 6.87448 17.4225 6.58742 17.2763 6.33438C17.13 6.08134 16.9198 5.87122 16.6667 5.72508L10.8333 2.39175C10.58 2.24547 10.2926 2.16846 10 2.16846C9.70744 2.16846 9.42003 2.24547 9.16667 2.39175L3.33333 5.72508C3.08022 5.87122 2.86998 6.08134 2.72372 6.33438C2.57745 6.58742 2.5003 6.87448 2.5 7.16675V13.8334C2.5003 14.1257 2.57745 14.4127 2.72372 14.6658C2.86998 14.9188 3.08022 15.1289 3.33333 15.2751L9.16667 18.6084C9.42003 18.7547 9.70744 18.8317 10 18.8317C10.2926 18.8317 10.58 18.7547 10.8333 18.6084L16.6667 15.2751C16.9198 15.1289 17.13 14.9188 17.2763 14.6658C17.4225 14.4127 17.4997 14.1257 17.5 13.8334V7.16675Z" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.75 6.3335L10 10.5002L17.25 6.3335" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 18.8333V10.5" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className='text-xl font-medium'>Thông tin đơn hàng</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          Xem trên {orderDetail.platform}
        </Button>
      </div>
      <div className="space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className='flex flex-col'>
            <div className='text-gray-500'>Mã đơn hàng</div>
            <div className="font-medium">#{orderDetail.id}</div>
          </div>
          <div className='flex flex-col'>
            <div className='text-gray-500'>Ngày đặt</div>
            <div className="font-medium">{orderDetail.orderDate}</div>
          </div>
          <div className='flex flex-col'>
            <div className='text-gray-500'>Mã đóng gói</div>
            <div className="font-medium">{orderDetail.packingCode}</div>
          </div>
          <div className='flex flex-col'>
            <div className='text-gray-500'>Bán tại</div>
            <div className="font-medium">{orderDetail.soldAt}</div>
          </div>
          <div className='flex flex-col'>
            <div className='text-gray-500'>Ngày bán</div>
            <div className="font-medium">{orderDetail.salesDate}</div>
          </div>
          <div className='flex flex-col'>
            <div className='text-gray-500'>Nền tảng</div>
            <div className="font-medium">{orderDetail.platform}</div>
          </div>
          <div className='flex flex-col'>
            <div className='text-gray-500'>Trạng thái</div>
            <div className="font-medium">{orderDetail.status}</div>
          </div>
          <div className='flex flex-col'>
            <div className='text-gray-500'>Hình thức giao hàng</div>
            <div className="font-medium">{orderDetail.deliveryMethod}</div>
          </div>
          <div className='flex flex-col'>
            <div className='text-gray-500'>Bán bởi</div>
            <div className="font-medium">{orderDetail.soldBy}</div>
          </div>
          <div className='flex flex-col'>
            <div className='text-gray-500'>Kênh bán hàng</div>
            <div className="font-medium">{orderDetail.salesChannel}</div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default OrderInformation;