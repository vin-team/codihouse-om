'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';
import { getStatusColor } from '@/utils/data.util';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CustomerOrderHistory({ customer }: { customer: any }) {
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
            {customer.orderHistory.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant={order.branch === "Online" ? "default" : "secondary"}>
                    {order.branch}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px]">
                    {order.products.join(", ")}
                  </div>
                </TableCell>
                <TableCell>{order.amount}₫</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
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