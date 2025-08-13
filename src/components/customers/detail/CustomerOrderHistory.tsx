'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { formatCurrency, getStatusColor } from '@/utils/data.util';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Customer } from '@/model/Customer.model';
import { getDateFromISOString } from '@/utils/date.util';

export default function CustomerOrderHistory({ customer }: { customer: Customer }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lịch sử mua hàng</CardTitle>
        <CardDescription>Tất cả đơn hàng từ các chi nhánh</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn hàng</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Chi nhánh</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Số tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customer.orders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.code}</TableCell>
                <TableCell>{order.date_created ? getDateFromISOString(order.date_created) : '-'}</TableCell>
                <TableCell>
                  <Badge variant={order.branch === "Online" ? "default" : "secondary"}>
                    {order.branch.title}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px]">
                    {order?.line_items?.map((item: any) => item.name).join(", ")}
                  </div>
                </TableCell>
                <TableCell>{formatCurrency(order?.total_price?.toString() || '0')}₫</TableCell>
                <TableCell>
                  {order.state ? <Badge variant={getStatusColor(order.state)}>
                    {order.state}
                  </Badge> : '-'}
                </TableCell>
                <TableCell>
                  <Link href={`/orders/${order.id}`}>
                    <Button variant="outline" size="sm">Xem đơn</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}