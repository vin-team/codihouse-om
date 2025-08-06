'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { getStatusColor } from '@/utils/data.util';

export default function OrderInformation({ order }: { order: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className='flex flex-row items-center gap-2'>
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.25 4.05811L13.75 8.34977" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.5 7.16675C17.4997 6.87448 17.4225 6.58742 17.2763 6.33438C17.13 6.08134 16.9198 5.87122 16.6667 5.72508L10.8333 2.39175C10.58 2.24547 10.2926 2.16846 10 2.16846C9.70744 2.16846 9.42003 2.24547 9.16667 2.39175L3.33333 5.72508C3.08022 5.87122 2.86998 6.08134 2.72372 6.33438C2.57745 6.58742 2.5003 6.87448 2.5 7.16675V13.8334C2.5003 14.1257 2.57745 14.4127 2.72372 14.6658C2.86998 14.9188 3.08022 15.1289 3.33333 15.2751L9.16667 18.6084C9.42003 18.7547 9.70744 18.8317 10 18.8317C10.2926 18.8317 10.58 18.7547 10.8333 18.6084L16.6667 15.2751C16.9198 15.1289 17.13 14.9188 17.2763 14.6658C17.4225 14.4127 17.4997 14.1257 17.5 13.8334V7.16675Z" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2.75 6.3335L10 10.5002L17.25 6.3335" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 18.8333V10.5" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className='text-xl font-medium'>Thông tin đơn hàng</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Mã đơn hàng</p>
            <p className="text-lg font-semibold">{order.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Trạng thái</p>
            <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Ngày tạo</p>
            <p className="text-lg">{order.date} {order.time}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Chi nhánh</p>
            <p className="text-lg">{order.branch}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Nguồn bán</p>
            <p className="text-lg">{order.salesChannel === "-" ? "Cửa hàng" : order.salesChannel}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Tổng tiền</p>
            <p className="text-lg font-semibold text-green-600">{order.finalAmount.toLocaleString()}₫</p>
          </div>
        </div>
        {order.note && (
          <div>
            <p className="text-sm font-medium text-gray-600">Ghi chú</p>
            <p className="text-sm bg-gray-50 p-2 rounded">{order.note}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}