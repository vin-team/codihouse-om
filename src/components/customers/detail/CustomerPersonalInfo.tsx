'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import React from 'react';
import { Customer } from '@/model/Customer.model';
import { getDateFromISOString } from '@/utils/date.util';

export default function CustomerPersonalInfo({ customer }: { customer: Customer }) {
  return <Card>
    <CardHeader>
      <CardTitle>
        <span className='text-xl font-medium'>Thông tin cá nhân</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-600">Tên khách hàng</p>
        <div className="flex items-center space-x-8">
          <p className="text-lg font-semibold">{[customer?.first_name, customer?.last_name].join(' ')}</p>
          {customer.group?.code && <Badge variant='outline'>
            {customer.group?.code}
          </Badge>}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Số điện thoại</p>
        <p className="text-lg">{customer.phone || '-'}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Email</p>
        <p className="text-lg">{customer.email || '-'}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Địa chỉ</p>
        <p className="text-lg">{customer.address_book && customer.address_book.length > 0 ? customer.address_book[0].address : '-'}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Ngày tham gia</p>
        <p className="text-lg">{customer.date_created ? getDateFromISOString(customer.date_created) : '-'}</p>
      </div>
    </CardContent>
  </Card>
}