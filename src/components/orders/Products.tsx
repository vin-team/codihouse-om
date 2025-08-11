'use client';

import { formatCurrency } from '@/utils/data.util';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '../ui/table';
import { Order } from '@/model/Order.model';

export default function Products({ order }: { order: Order }) {
  
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
            {order?.line_items?.map((product: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{formatCurrency(product?.price?.toString() || '0') + ' đ'}</TableCell>
                <TableCell>{product?.quantity}</TableCell>
                <TableCell>{formatCurrency(String((product?.price || 0) * (product?.quantity || 0))) + ' đ'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6 space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Tạm tính:</span>
            <span>{formatCurrency(String(order?.line_items?.reduce((acc: number, product: any) => acc + (product.price || 0) * (product.quantity || 0), 0))) + ' đ'}</span>
          </div>
          <div className="flex justify-between">
            <span>Phí vận chuyển:</span>
            <span>{formatCurrency(String(order?.shipping_fee || 0)) + ' đ'}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>Giảm giá:</span>
            <span>{formatCurrency(String(order?.total_discount || 0)) + ' đ'}</span>
          </div>
          <div className="flex flex-col gap-2 border-t pt-2">
            <div className='flex-1 flex flex-row justify-between'>
              <span>Số tiền khách đã trả:</span>
              <span>{order?.paid_amount ? formatCurrency(String(order?.paid_amount)) : 0}₫</span>
            </div>
            <div className='flex-1 flex flex-row justify-between font-bold text-lg'>
              <span>Tổng cộng:</span>
              <span className="text-green-600">{order?.total_price ? order?.total_price.toLocaleString() : 0}₫</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}