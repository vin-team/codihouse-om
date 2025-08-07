'use client';

import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { orderService } from '@/services/order.service';
import { getOrders, getOrdersCount, setPage } from '@/slices/orderSlice';
import { formatCurrency } from '@/utils/data.util';
import { getDateFromISOString, getTimeFromISOString } from '@/utils/date.util';
import { Order } from '@/model/Order.model';

export default function OrderList() {
  const dispatch = useAppDispatch();
  const visibleColumns = useAppSelector(state => state.order.visibleColumns);
  const orders = useAppSelector(state => state.order.orders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const pagination = useAppSelector(state => state.order.pagination);
  const filter = useAppSelector(state => state.order.filter);

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
      case "Web": return "outline"
      default: return "outline"
    }
  }

  const orderMatchesFilter = (order: Order): boolean => {
    if (filter.search && filter.search.trim() !== '') {
      const searchTerm = filter.search.toLowerCase();
      const matchesSearch =
        order.code?.toLowerCase().includes(searchTerm) ||
        order.email?.toLowerCase().includes(searchTerm) ||
        order.customer?.first_name?.toLowerCase().includes(searchTerm) ||
        order.customer?.last_name?.toLowerCase().includes(searchTerm) ||
        order.customer?.phone?.toLowerCase().includes(searchTerm) ||
        order.branch?.title?.toLowerCase().includes(searchTerm);

      if (!matchesSearch) return false;
    }

    if (filter.status && filter.status !== 'all') {
      const statusMap: { [key: string]: string } = {
        'processing': 'Đang giao dịch',
        'completed': 'Hoàn thành',
        'pending': 'Chờ thanh toán',
        'cancelled': 'Đã hủy',
      };

      if (order.status !== statusMap[filter.status]) {
        return false;
      }
    }

    if (filter.branch && filter.branch !== 'all') {
      if (order.branch.toString() !== filter.branch) {
        return false;
      }
    }

    if (filter.dateRange) {
      const { from, to } = filter.dateRange;

      const hasStartDate = !!from;
      const hasEndDate = !!to;

      if (hasStartDate || hasEndDate) {
        if (!order.date_created) return false;

        const orderDate = new Date(order.date_created);
        if (isNaN(orderDate.getTime())) return false;

        if (hasStartDate) {
          const startDate = new Date(from);
          if (isNaN(startDate.getTime())) return false;
          if (orderDate < startDate) return false;
        }

        if (hasEndDate) {
          const endDate = new Date(to);
          if (isNaN(endDate.getTime())) return false;
          endDate.setHours(23, 59, 59, 999);
          if (orderDate > endDate) return false;
        }
      }
    }

    return true;
  };

  useEffect(() => {
    const filtered = orders.filter(orderMatchesFilter);
    setFilteredOrders(filtered);
  }, [filter, orders]);

  useEffect(() => {
    dispatch(getOrdersCount());
  }, []);

  useEffect(() => {
    dispatch(getOrders({ page: pagination.page, limit: pagination.limit }));
  }, [pagination.page, pagination.limit]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">
          {filteredOrders.length} đơn hàng
          {filteredOrders.length !== orders.length && ` (trong tổng số ${orders.length})`}
        </h2>
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
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.code}</TableCell>
                {visibleColumns.get('customer') && <TableCell>{[order.customer.first_name, order.customer.last_name].filter(Boolean).join(' ')}</TableCell>}
                {visibleColumns.get('customerPhone') && <TableCell>{order.customer.phone ?? '-'}</TableCell>}
                {visibleColumns.get('customerEmail') && <TableCell>{order.customer.email ?? '-'}</TableCell>}
                {visibleColumns.get('branch') && <TableCell>{order.branch.title}</TableCell>}
                {visibleColumns.get('source') && (
                  <TableCell>
                    {order.source !== "-" ? (
                      <Badge variant={getSalesChannelColor(order.source)}>
                        {order.source}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                )}
                {visibleColumns.get('amount') && <TableCell>{formatCurrency(order.total_price?.toString() || "0")}₫</TableCell>}
                {visibleColumns.get('status') && (
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                )}
                {visibleColumns.get('date') && <TableCell>{order.date_created ? getDateFromISOString(order.date_created) : "-"}</TableCell>}
                {visibleColumns.get('time') && <TableCell>{order.date_created ? getTimeFromISOString(order.date_created) : "-"}</TableCell>}
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

      <div className="pb-6 flex justify-center">
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages || 1}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}