import React from 'react';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';
import { formatCurrency } from '@/utils/data.util';
import Link from 'next/dist/client/link';
import { SearchOrder } from '@/model/Search.model';
import { getOrderStatusColor } from '@/utils/order.util';
import { Badge } from '../ui/badge';
import { getDateFromISOString } from '@/utils/date.util';

export default function SearchOrderItem({ order }: { order: SearchOrder }) {
  return (
    <Link href={`/orders/${order.id}`}>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
        <div className='flex flex-row items-center gap-4 flex-1'>
          <div className={`w-3 h-3 ${getOrderStatusColor(order.status)} rounded-full`}></div>
          <div className='flex-1 flex flex-col gap-1'>
            <div className='flex flex-row'>
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900">{order.code}</span>
                <Badge variant="secondary" className="text-xs">
                  {order.source}
                </Badge>
                {order.status === "Hoàn thành" ? (
                  <Badge className={getOrderStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                ) : (
                  <span className="text-sm text-gray-600">{order.status}</span>
                )}
              </div>
            </div>
            <div className='flex flex-row justify-between'>
              <div className="text-sm text-gray-600 w-1/3">
                <p><strong>Khách hàng: {order.customer_name}</strong></p>
              </div>
              <div className='flex flex-row justify-around w-2/3'>
                <p className="text-sm text-gray-500"><strong>SĐT: </strong>{order.customer_phone || '-'}</p>
                <p className="text-sm text-gray-500"><strong>Ngày: </strong>{order.date_created ? getDateFromISOString(order.date_created) : '-'}</p>
              </div>
            </div>
            <div className='flex flex-row'>
              <div className="flex items-center space-x-1">
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 1.8335L2 4.50016V13.8335C2 14.1871 2.14048 14.5263 2.39052 14.7763C2.64057 15.0264 2.97971 15.1668 3.33333 15.1668H12.6667C13.0203 15.1668 13.3594 15.0264 13.6095 14.7763C13.8595 14.5263 14 14.1871 14 13.8335V4.50016L12 1.8335H4Z" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 4.5H14" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.6666 7.1665C10.6666 7.87375 10.3857 8.55203 9.8856 9.05212C9.3855 9.55222 8.70722 9.83317 7.99998 9.83317C7.29274 9.83317 6.61446 9.55222 6.11436 9.05212C5.61426 8.55203 5.33331 7.87375 5.33331 7.1665" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className='text-xs text-gray-500'>{order.products || '-'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right flex flex-col items-end w-32">
          <p className="text-lg font-semibold inline-block">{formatCurrency(order.total_price.toString())} đ</p>
          <p className="text-xs text-gray-500">1 sản phẩm</p>
        </div>
        <Link href={`/orders/${order.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 ml-4">
            <Eye className="h-4 w-4" />
            Xem
          </Button>
        </Link>
      </div>
    </Link>
  );
}