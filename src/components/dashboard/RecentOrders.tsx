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

  useEffect(() => {
    dispatch(getRecentOrders());
  }, []);

  const sliceOrders = orders.length > 5 ? orders.slice(0, 5) : orders;

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
                  <p className="font-medium">#{order.id}</p>
                  <p className="text-sm text-gray-500">{[order?.customer?.first_name, order?.customer?.last_name].join(' ')} • {order?.branch?.title}</p>
                </div>
                <Badge className={`${getStatusColor(order.status)}`} variant="secondary">{order.status}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}