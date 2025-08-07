'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Order } from '@/model/Order.model';

export default function CustomerInformation({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className='flex flex-row items-center gap-2'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8332 17.5V15.8333C15.8332 14.9493 15.482 14.1014 14.8569 13.4763C14.2317 12.8512 13.3839 12.5 12.4998 12.5H7.49984C6.61578 12.5 5.76794 12.8512 5.14281 13.4763C4.51769 14.1014 4.1665 14.9493 4.1665 15.8333V17.5" stroke="#09090B" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.99984 9.16667C11.8408 9.16667 13.3332 7.67428 13.3332 5.83333C13.3332 3.99238 11.8408 2.5 9.99984 2.5C8.15889 2.5 6.6665 3.99238 6.6665 5.83333C6.6665 7.67428 8.15889 9.16667 9.99984 9.16667Z" stroke="#09090B" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className='text-xl font-medium'>Thông tin khách hàng</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className='flex flex-col space-y-2'>
          <p className="text-sm font-medium text-gray-600">Tên khách hàng</p>
          <div className="flex items-center space-x-3">
            <p className="text-lg font-semibold">{[order.customer.first_name, order.customer.last_name].join('')}</p>
            <Link href={`/customers/${order.customer.id}`}>
              <Button variant="outline" size="sm">Xem hồ sơ</Button>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Số điện thoại</p>
          <p className="text-lg">{order.customer?.phone || '-'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Email</p>
          <p className="text-lg">{order.customer?.email || '-'}</p>
        </div>
      </CardContent>
    </Card>

  );
}