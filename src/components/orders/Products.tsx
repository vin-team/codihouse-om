'use client';

import { formatCurrency } from '@/utils/data.util';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '../ui/table';

export default function Products({ order }: { order: any }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className='flex flex-row justify-between pb-2'>
            <span className='text-xl font-medium'>Sản phẩm trong đơn hàng</span>
          </div>
        </CardTitle>
        <CardDescription>Chi tiết các sản phẩm đã đặt</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Đơn giá</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Thành tiền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products.map((product: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.price.toLocaleString()}₫</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.total.toLocaleString()}₫</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6 space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Tạm tính:</span>
            <span>{order.subtotal.toLocaleString()}₫</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Giảm giá:</span>
              <span>-{order.discount.toLocaleString()}₫</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Tổng cộng:</span>
            <span className="text-green-600">{order.finalAmount.toLocaleString()}₫</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}