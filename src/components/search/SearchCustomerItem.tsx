'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Eye, Mail, Phone } from 'lucide-react';
import { formatCurrency } from '@/utils/data.util';
import Link from 'next/dist/client/link';
import { SearchCustomer } from '@/model/Search.model';
import { getDateFromISOString } from '@/utils/date.util';

export default function SearchCustomerItem({ customer }: { customer: SearchCustomer }) {
  return (
    <Link href={`/customers/${customer.code}`}>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
        <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-row items-center gap-4 flex-1'>
            <div className='flex-1 flex flex-col gap-1'>
              <div className='flex flex-row'>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{customer.first_name}</span>
                  <span className={`px-2 py-1 border border-gray-200 text-xs font-semibold rounded-full`}>
                    {customer.code}
                  </span>
                </div>
              </div>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-row justify-around space-x-4'>
                  <p className="text-sm text-gray-500 flex flex-row items-center gap-2"><Phone className="w-4 h-4" />{customer.phone || '-'}</p>
                  <p className="text-sm text-gray-500 flex flex-row items-center gap-2"><Mail className="w-4 h-4" />{customer.email || '-'}</p>
                  <p className="text-sm text-gray-500 flex flex-row items-center gap-2 pl-8"><strong>Nhóm: </strong>{customer.group_title || '-'}</p>
                </div>
                {customer.last_purchase_date && <p className="text-sm text-gray-500 flex flex-row items-center gap-2 pl-8">Mua cuối: {getDateFromISOString(customer.last_purchase_date)}</p>}
              </div>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-row justify-around space-x-4'>
                  <p className="text-xs text-gray-500 flex flex-row items-center gap-2">Tổng chi tiêu: {formatCurrency(customer.total_expenditure.toString())} đ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link href={`/customers/${customer.id}`}>
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