'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
import { LoaderCircle, ChevronDown, ChevronUp } from 'lucide-react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Order } from '@/model/Order.model';

export default function OrderList() {
  const dispatch = useAppDispatch();
  const visibleColumns = useAppSelector(state => state.order.visibleColumns);
  const orders = useAppSelector(state => state.order.orders);
  const pagination = useAppSelector(state => state.order.pagination);
  const filter = useAppSelector(state => state.order.filter);
  const ordersRequestState = useAppSelector(state => state.order.actionState);
  const [sorting, setSorting] = useState<SortingState>([]);
  const getSalesChannelColor = (channel: string) => {
    switch (channel) {
      case "Facebook": return "default"
      case "Zalo": return "secondary"
      case "Web": return "outline"
      default: return "outline"
    }
  }

  const columns: ColumnDef<Order, any>[] = useMemo(() => {
    const cols: ColumnDef<Order, any>[] = [];
    cols.push({
      id: 'code',
      accessorKey: 'code',
      header: () => (
        <div className='w-fit text-nowrap'>Mã đơn hàng</div>
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.code}</span>
      ),
      enableSorting: true,
    });

    if (visibleColumns.get('customer')) {
      cols.push({
        id: 'customer',
        header: () => <div className='w-fit text-nowrap'>{orderService.translateColumn('customer')}</div>,
        accessorFn: (row) => [row.customer?.first_name, row.customer?.last_name].filter(Boolean).join(' '),
        cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      });
    }
    if (visibleColumns.get('customerPhone')) {
      cols.push({
        id: 'customerPhone',
        header: () => <div className='w-fit text-nowrap'>{orderService.translateColumn('customerPhone')}</div>,
        accessorFn: (row) => row.customer?.phone ?? '-',
        cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      });
    }
    if (visibleColumns.get('customerEmail')) {
      cols.push({
        id: 'customerEmail',
        header: () => <div className='w-fit text-nowrap'>{orderService.translateColumn('customerEmail')}</div>,
        accessorFn: (row) => row.customer?.email ?? '-',
        cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      });
    }
    if (visibleColumns.get('branch')) {
      cols.push({
        id: 'branch',
        header: () => <div className='w-fit text-nowrap'>{orderService.translateColumn('branch')}</div>,
        accessorFn: (row) => row.branch?.title ?? '-',
        cell: ({ getValue }) => <span>{getValue<string>()}</span>,
      });
    }
    if (visibleColumns.get('source')) {
      cols.push({
        id: 'source',
        header: () => <div className='w-fit text-nowrap'>{orderService.translateColumn('source')}</div>,
        accessorKey: 'source',
        cell: ({ row }) => (
          <>
            {row.original.source !== '-' ? (
              <Badge variant={getSalesChannelColor(row.original.source)}>
                {row.original.source}
              </Badge>
            ) : ('-')}
          </>
        ),
      });
    }
    if (visibleColumns.get('amount')) {
      cols.push({
        id: 'amount',
        header: () => <div className='w-fit text-nowrap'>{orderService.translateColumn('amount')}</div>,
        accessorFn: (row) => Number(row.total_price ?? 0),
        cell: ({ getValue }) => <span>{formatCurrency(String(getValue<number>() || 0))}₫</span>,
        sortingFn: 'auto',
      });
    }
    if (visibleColumns.get('status')) {
      cols.push({
        id: 'status',
        header: () => <div className='w-fit text-nowrap'>{orderService.translateColumn('status')}</div>,
        accessorFn: (row) => row.state ?? '',
        cell: ({ row }) => (
          <Badge variant='outline' className={getOrderStatusColor(row.original.state || '')}>
            <span className='w-fit text-nowrap'>{row.original.state}</span>
          </Badge>
        ),
      });
    }
    if (visibleColumns.get('date')) {
      cols.push({
        id: 'date',
        header: () => <div className='w-fit text-nowrap'>{orderService.translateColumn('date')}</div>,
        accessorFn: (row) => (row.date_created ? Date.parse(row.date_created) : 0),
        cell: ({ row }) => <span>{row.original.date_created ? getDateFromISOString(row.original.date_created) : '-'}</span>,
      });
    }
    if (visibleColumns.get('time')) {
      cols.push({
        id: 'time',
        header: () => <div className='w-fit text-nowrap'>{orderService.translateColumn('time')}</div>,
        accessorFn: (row) => (row.date_created ? Date.parse(row.date_created) : 0),
        cell: ({ row }) => <span>{row.original.date_created ? getTimeFromISOString(row.original.date_created) : '-'}</span>,
      });
    }
    if (visibleColumns.get('note')) {
      cols.push({
        id: 'note',
        header: () => <div className='w-fit text-nowrap'>{orderService.translateColumn('note')}</div>,
        accessorFn: (row) => row.note ?? '',
        cell: ({ getValue }) => (
          <span className="max-w-[200px] truncate block">{getValue<string>() || '-'}</span>
        ),
      });
    }

    cols.push({
      id: 'actions',
      header: () => <div>Thao tác</div>,
      cell: ({ row }) => (
        <Link href={`/orders/${row.original.id}`}>
          <Button variant="outline" size="sm">Xem chi tiết</Button>
        </Link>
      ),
      enableSorting: false,
    });

    return cols;
  }, [visibleColumns]);

  const table = useReactTable({
    data: orders as Order[],
    columns,
    state: {
      sorting,
    },
    onSortingChange: (updater: any) => {
      setSorting((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        if (!Array.isArray(next) || next.length === 0) return next;

        const previousById = new Map(prev.map(s => [s.id, s] as const));
        let changedId: string | null = null;

        for (const item of next) {
          const prevItem = previousById.get(item.id);
          if (!prevItem || prevItem.desc !== item.desc) {
            changedId = item.id;
            break;
          }
        }

        if (!changedId) {
          changedId = next[next.length - 1]?.id ?? null;
        }

        if (changedId) {
          const primary = next.find(s => s.id === changedId)!;
          const rest = next.filter(s => s.id !== changedId);
          return [primary, ...rest];
        }

        return next;
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
    enableMultiSort: true,
    isMultiSortEvent: () => true,
  });

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
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      const isSorted = header.column.getIsSorted();
                      return (
                        <TableHead
                          key={header.id}
                          className={`w-fit text-nowrap ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
                          onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                        >
                          <span className='inline-flex items-center'>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {isSorted === 'asc' && <ChevronUp className='w-3 h-3 ml-1' />}
                            {isSorted === 'desc' && <ChevronDown className='w-3 h-3 ml-1' />}
                          </span>
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map(row => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
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