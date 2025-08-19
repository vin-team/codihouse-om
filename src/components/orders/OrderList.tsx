'use client';

import React, { useEffect } from 'react';
import Pagination from './Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { orderService } from '@/services/order.service';
import { getOrderCountByBranch, getOrders, getOrdersCount, setPage } from '@/slices/orderSlice';
import { formatCurrency } from '@/utils/data.util';
import { getDateFromISOString, getTimeFromISOString } from '@/utils/date.util';
import DataNotFound from '../DataNotFound';
import { getOrderStatusColor } from '@/utils/order.util';
import { LoaderCircle } from 'lucide-react';

export default function OrderList() {
  const dispatch = useAppDispatch();
  const visibleColumns = useAppSelector(state => state.order.visibleColumns);
  const orders = useAppSelector(state => state.order.orders);
  const pagination = useAppSelector(state => state.order.pagination);
  const filter = useAppSelector(state => state.order.filter);
  const ordersRequestState = useAppSelector(state => state.order.actionState);
  const getSalesChannelColor = (channel: string) => {
    switch (channel) {
      case "Facebook": return "default"
      case "Zalo": return "secondary"
      case "Web": return "outline"
      default: return "outline"
    }
  }

  useEffect(() => {
    if (filter.branch) {
      dispatch(getOrderCountByBranch({ branch_id: filter.branch }));
      return
    }

    dispatch(getOrdersCount({}));
  }, []);

  useEffect(() => {
    const filters = {
      keyword: filter.search,
      state: filter.state,
      branch_id: filter.branch,
      date_range: filter.dateRange
    }

    dispatch(getOrdersCount(filters));
    dispatch(getOrders({
      filters,
      pagination: { page: pagination.page, limit: pagination.limit }
    }));
  }, [pagination.page, pagination.limit, filter.search, filter.state, filter.branch, filter.dateRange]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">
          {pagination.totalRecords} đơn hàng
        </h2>
      </div>

      {ordersRequestState?.type === 'getOrders' && ordersRequestState?.status === 'loading' ?
        <div className="p-5">
          <div className="flex justify-center items-center">
            <LoaderCircle className='w-12 h-12 text-blue-400 animate-spin' />
          </div>
        </div> :
        <div className='p-5'>
          {orders.length === 0 ? <DataNotFound /> :
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-fit text-nowrap'>Mã đơn hàng</TableHead>
                  {Array.from(visibleColumns.keys()).map((column) => (
                    <TableHead className='w-fit text-nowrap' hidden={!visibleColumns.get(column)} key={column}>{orderService.translateColumn(column)}</TableHead>
                  ))}
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.code}</TableCell>
                    {visibleColumns.get('customer') && <TableCell>{[order.customer?.first_name, order.customer?.last_name].filter(Boolean).join(' ')}</TableCell>}
                    {visibleColumns.get('customerPhone') && <TableCell>{order.customer?.phone ?? '-'}</TableCell>}
                    {visibleColumns.get('customerEmail') && <TableCell>{order.customer?.email ?? '-'}</TableCell>}
                    {visibleColumns.get('branch') && <TableCell>{order.branch?.title ?? '-'}</TableCell>}
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
                        <Badge variant='outline' className={getOrderStatusColor(order.state || '')}>
                          <span className='w-fit text-nowrap'>{order.state}</span>
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
            </Table>}
        </div>}
      {orders.length > 0 &&
        <div hidden={ordersRequestState?.type === 'getOrders' && ordersRequestState?.status === 'loading'}
          className="pb-6 flex justify-center">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </div>}
    </div>
  );
}