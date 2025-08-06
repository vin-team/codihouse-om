'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import React from 'react';

export default function CustomerPersonalInfo({ customer }: { customer: any }) {
  return <Card>
    <CardHeader>
      <CardTitle>
        <span className='text-xl font-medium'>Thông tin cá nhân</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-600">Tên khách hàng</p>
        <div className="flex items-center space-x-2">
          <p className="text-lg font-semibold">{customer.name}</p>
          <Badge variant={customer.status === "VIP" ? "default" : "secondary"}>
            {customer.status}
          </Badge>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Số điện thoại</p>
        <p className="text-lg">{customer.phone}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Email</p>
        <p className="text-lg">{customer.email}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Địa chỉ</p>
        <p className="text-lg">{customer.address}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Ngày tham gia</p>
        <p className="text-lg">{customer.joinDate}</p>
      </div>
    </CardContent>
  </Card>
}