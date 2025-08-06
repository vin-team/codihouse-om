'use client';

import React from 'react';
import Pagination from './Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useAppSelector } from '@/hooks/redux';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { orderService } from '@/services/order.service';

export default function OrderList() {
  const visibleColumns = useAppSelector(state => state.order.visibleColumns);

  const orders = [
    {
      id: "DH001234",
      customer: "Nguyễn Văn A",
      customerPhone: "0901234567",
      customerEmail: "nguyenvana@email.com",
      branch: "Quận 1",
      salesChannel: "-",
      amount: "450,000",
      status: "Đang xử lý",
      date: "2024-01-15",
      time: "08:30",
      note: "Khách yêu cầu giao hàng nhanh",
      products: [
        { name: "Áo thun basic", price: 150000, quantity: 2, total: 300000 },
        { name: "Quần jean slim", price: 250000, quantity: 1, total: 250000 }
      ],
      subtotal: 550000,
      discount: 100000,
      finalAmount: 450000
    },
    {
      id: "DH001235",
      customer: "Trần Thị B",
      customerPhone: "0907654321",
      customerEmail: "tranthib@email.com",
      branch: "Online",
      salesChannel: "Facebook",
      amount: "680,000",
      status: "Hoàn thành",
      date: "2024-01-15",
      time: "09:15",
      note: "Đã thanh toán COD",
      products: [
        { name: "Áo sơ mi", price: 280000, quantity: 1, total: 280000 },
        { name: "Chân váy", price: 200000, quantity: 2, total: 400000 }
      ],
      subtotal: 680000,
      discount: 0,
      finalAmount: 680000
    },
    {
      id: "DH001236",
      customer: "Lê Văn C",
      customerPhone: "0912345678",
      customerEmail: "levanc@email.com",
      branch: "Quận 7",
      salesChannel: "-",
      amount: "320,000",
      status: "Chờ thanh toán",
      date: "2024-01-15",
      time: "10:00",
      note: "Khách đặt cọc 50%",
      products: [
        { name: "Áo khoác", price: 320000, quantity: 1, total: 320000 }
      ],
      subtotal: 320000,
      discount: 0,
      finalAmount: 320000
    },
    {
      id: "DH001237",
      customer: "Phạm Thị D",
      customerPhone: "0987654321",
      customerEmail: "phamthid@email.com",
      branch: "Online",
      salesChannel: "Zalo",
      amount: "890,000",
      status: "Hoàn thành",
      date: "2024-01-15",
      time: "10:30",
      note: "",
      products: [
        { name: "Áo len", price: 350000, quantity: 1, total: 350000 },
        { name: "Quần tây", price: 450000, quantity: 1, total: 450000 },
        { name: "Giày thể thao", price: 90000, quantity: 1, total: 90000 }
      ],
      subtotal: 890000,
      discount: 0,
      finalAmount: 890000
    },
    {
      id: "DH001238",
      customer: "Hoàng Văn E",
      customerPhone: "0965432109",
      customerEmail: "hoangvane@email.com",
      branch: "Online",
      salesChannel: "Website",
      amount: "1,200,000",
      status: "Đã hủy",
      date: "2024-01-15",
      time: "11:00",
      note: "Khách hàng hủy do thay đổi ý kiến",
      products: [
        { name: "Áo dạ hội", price: 800000, quantity: 1, total: 800000 },
        { name: "Giày cao gót", price: 400000, quantity: 1, total: 400000 }
      ],
      subtotal: 1200000,
      discount: 0,
      finalAmount: 1200000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoàn thành": return "default"
      case "Đang xử lý": return "secondary"
      case "Chờ thanh toán": return "outline"
      case "Đã hủy": return "destructive"
      default: return "outline"
    }
  }

  const getSalesChannelColor = (channel: string) => {
    switch (channel) {
      case "Facebook": return "default"
      case "Zalo": return "secondary"
      case "Website": return "outline"
      default: return "outline"
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">{orders.length} đơn hàng</h2>
      </div>
      <div className='p-5'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn hàng</TableHead>
              {Array.from(visibleColumns.keys()).map((column) => (
                <TableHead key={column}>{orderService.translateColumn(column)}</TableHead>
              ))}
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                {visibleColumns.get('customer') && <TableCell>{order.customer}</TableCell>}
                {visibleColumns.get('customerPhone') && <TableCell>{order.customerPhone}</TableCell>}
                {visibleColumns.get('customerEmail') && <TableCell>{order.customerEmail}</TableCell>}
                {visibleColumns.get('branch') && <TableCell>{order.branch}</TableCell>}
                {visibleColumns.get('salesChannel') && (
                  <TableCell>
                    {order.salesChannel !== "-" ? (
                      <Badge variant={getSalesChannelColor(order.salesChannel)}>
                        {order.salesChannel}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                )}
                {visibleColumns.get('amount') && <TableCell>{order.amount}₫</TableCell>}
                {visibleColumns.get('status') && (
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                )}
                {visibleColumns.get('date') && <TableCell>{order.date}</TableCell>}
                {visibleColumns.get('time') && <TableCell>{order.time}</TableCell>}
                {visibleColumns.get('note') && (
                  <TableCell className="max-w-[200px] truncate">
                    {order.note || "-"}
                  </TableCell>
                )}
                <TableCell>
                  <Link href={`/orders/${order.id}`}>
                    <Button variant="outline" size="sm">Xem chi tiết</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <div className="pb-6 flex justify-center">
        <Pagination />
      </div> */}
    </div>
  );
}