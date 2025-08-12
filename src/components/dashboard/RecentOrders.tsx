'use client';

import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getRecentOrders } from '@/slices/orderSlice';
import { getStatusColor } from '@/utils/data.util';
import Link from 'next/link';

export default function RecentOrders() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.order.recentOrders);
  const sliceOrders = orders.length > 5 ? orders.slice(0, 5) : orders;

  useEffect(() => {
    dispatch(getRecentOrders());
  }, []);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Đơn hàng gần đây</CardTitle>
        <CardDescription>Các đơn hàng mới nhất từ tất cả chi nhánh</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sliceOrders.map((order) => (
            <Link href={`/orders/${order.id}`} key={order.id}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{order?.code || '-'}</p>
                  <div className='flex flex-row gap-2'>
                    <p className="text-sm text-gray-500">{[order?.customer?.first_name, order?.customer?.last_name].join(' ')}</p>
                    {order?.branch?.title && <p className="text-sm text-gray-500">• {order?.branch?.title || '-'}</p>}
                  </div>
                </div>
                {order?.state && <Badge className={`${getStatusColor(order.state || '')}`} variant="secondary">{order.state}</Badge>}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}