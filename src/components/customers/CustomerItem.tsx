import React from 'react';
import { Badge } from '../ui/badge';
import { Eye, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { formatCurrency } from '@/utils/data.util';
import Link from 'next/dist/client/link';

interface CustomerItemProps {
  key: number;
  name: string;
  code: string;
  phone: string;
  email: string;
  group: string;
  totalSpend: number;
  orders: number;
  points: number;
  lastPurchase: string;
}

const CustomerItem: React.FC<CustomerItemProps> = (props) => {

  return (
    <Link href={`/customers/${props.code}`}>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
        <div className='flex flex-row items-center gap-4 flex-1'>
          <div className='flex-1 flex flex-col gap-1'>
            <div className='flex flex-row'>
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900">{props.name}</span>
                <Badge className='bg-white rounded-full border border-gray-200 hover:bg-white text-black'>{props.code}</Badge>
              </div>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row flex-1 space-x-4'>
                <p className="text-sm text-gray-500 flex flex-row items-center gap-2"><Phone className='w-4 h-4' />{props.phone}</p>
                <p className="text-sm text-gray-500 flex flex-row items-center gap-2"><Mail className='w-4 h-4' />{props.email}</p>
              </div>
              <div className='flex-1'>
                <p className='text-sm text-gray-500 flex flex-row items-center gap-2 pl-8'>Nhóm: {props.group}</p>
              </div>
              <div className="text-sm text-gray-600 flex-1">
                <p className='text-sm text-gray-500 flex flex-row items-center gap-2'>Mua cuối: {props.lastPurchase}</p>
              </div>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row justify-around space-x-4'>
                <p className="text-xs text-gray-500 flex flex-row items-center gap-2">Tổng chi tiêu: {formatCurrency(props.totalSpend.toString())} đ</p>
                <p className="text-xs text-gray-500 flex flex-row items-center gap-2">Đơn hàng: {props.orders}</p>
                <p className="text-xs text-gray-500 flex flex-row items-center gap-2 pl-8">Điểm tích luỹ: {props.points}</p>
              </div>
            </div>
          </div>
        </div>
        <Link href={`/customers/${props.code}`}>
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
};

export default CustomerItem;