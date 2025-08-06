'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export default function RecentOrders() {
  const orders = [
    {
      id: "DH001234",
      customer: "Nguyễn Văn A",
      branch: "Chi nhánh Quận 1",
      status: "Đang xử lý"
    },
    {
      id: "DH001235",
      customer: "Trần Thị B",
      branch: "Chi nhánh Online",
      status: "Hoàn thành"
    },
    {
      id: "DH001236",
      customer: "Lê Văn C",
      branch: "Chi nhánh Quận 7",
      status: "Đã hủy"
    },
  ]

  const statusColor = (status: string) => {
    if (status === "Đang xử lý") return "bg-gray-100";
    if (status === "Hoàn thành") return "bg-black text-white hover:bg-black";
    if (status === "Đã hủy") return "bg-red-500 text-white hover:bg-red-500";
    return "bg-gray-100";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đơn hàng gần đây</CardTitle>
        <CardDescription>Các đơn hàng mới nhất từ tất cả chi nhánh</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">#{order.id}</p>
                <p className="text-sm text-gray-500">{order.customer} • {order.branch}</p>
              </div>
              <Badge className={`${statusColor(order.status)}`} variant="secondary">{order.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}