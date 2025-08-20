import React, { useEffect, useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { getCustomers, getCustomersCount, setPage } from '@/slices/customerSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { formatCurrency } from '@/utils/data.util';
import Pagination from '../orders/Pagination';
import DataNotFound from '../DataNotFound';
import { LoaderCircle, ChevronDown, ChevronUp } from 'lucide-react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Customer } from '@/model/Customer.model';

export default function CustomerList() {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(state => state.customer.pagination);
  const customers = useAppSelector(state => state.customer.customers);
  const filter = useAppSelector(state => state.customer.filter);
  const customersRequestState = useAppSelector(state => state.customer.requestState);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    dispatch(getCustomersCount({}));
  }, []);

  useEffect(() => {
    const filters = {
      search: filter.search,
      state: filter.state,
      orderCount: filter.orderCount,
      totalExpenditure: filter.totalExpenditure
    }
    dispatch(getCustomersCount(filters));
    dispatch(getCustomers({
      filters,
      pagination: {
        page: pagination.page,
        limit: pagination.limit
      }
    }));
  }, [pagination.page, pagination.limit, filter.search, filter.state, filter.orderCount, filter.totalExpenditure]);

  const columns: ColumnDef<Customer, any>[] = useMemo(() => [
    {
      id: 'code',
      accessorKey: 'code',
      header: () => <div className='w-fit text-nowrap'>Mã KH</div>,
      cell: ({ row }) => <span className="font-medium">{row.original.code}</span>,
    },
    {
      id: 'name',
      header: () => <div className='w-fit text-nowrap'>Tên khách hàng</div>,
      accessorFn: (row) => [row.first_name, row.last_name].filter(Boolean).join(' '),
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
      id: 'email',
      header: () => <div className='w-fit text-nowrap'>Email</div>,
      accessorFn: (row) => row.email || '-',
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
      id: 'phone',
      header: () => <div className='w-fit text-nowrap'>Điện thoại</div>,
      accessorFn: (row) => row.phone || '-',
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
      id: 'total_order',
      header: () => <div className='w-fit text-nowrap'>Tổng đơn</div>,
      accessorFn: (row) => Number(row.total_order || 0),
      cell: ({ getValue }) => <span>{getValue<number>()}</span>,
      sortingFn: 'auto',
    },
    {
      id: 'total_expenditure',
      header: () => <div className='w-fit text-nowrap'>Tổng chi tiêu</div>,
      accessorFn: (row) => Number(row.total_expenditure || 0),
      cell: ({ getValue }) => <span>{formatCurrency(String(getValue<number>() || 0))}₫</span>,
      sortingFn: 'auto',
    },
    {
      id: 'last_order',
      header: () => <div className='w-fit text-nowrap'>Đơn cuối</div>,
      accessorFn: (row) => (row.orders && row.orders.length > 0 ? row.orders[0]?.code : '-'),
      cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
      id: 'state',
      header: () => <div className='w-fit text-nowrap'>Trạng thái</div>,
      accessorFn: (row) => row.state || '',
      cell: ({ row }) => (
        row.original.state ? (
          <Badge variant='outline'><span className='text-nowrap'>{row.original.state}</span></Badge>
        ) : '-'
      ),
    },
    {
      id: 'actions',
      header: () => <div className='w-fit text-nowrap'>Thao tác</div>,
      cell: ({ row }) => (
        <Link href={`/customers/${row.original.id}`}>
          <Button variant="outline" size="sm">Xem chi tiết</Button>
        </Link>
      ),
      enableSorting: false,
    },
  ], []);

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: customers as Customer[],
    columns,
    state: { sorting },
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

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Kết quả ({pagination.totalRecords} khách hàng)</h2>
      </div>
      {customersRequestState?.type === 'getCustomers' && customersRequestState?.status === 'loading' ?
        <div className="p-5">
          <div className="flex justify-center items-center">
            <LoaderCircle className='w-12 h-12 text-blue-400 animate-spin' />
          </div>
        </div> :
        <div className="p-5">
          {customers.length === 0 ? <DataNotFound /> :
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

      {customers.length > 0 && <div hidden={customersRequestState?.type === 'getCustomers' && customersRequestState?.status === 'loading'} className="pb-6 flex justify-center">
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages || 1}
          onPageChange={handlePageChange}
        />
      </div>}
    </div>
  );
}