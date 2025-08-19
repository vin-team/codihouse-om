import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { getCustomers, getCustomersCount, setPage } from '@/slices/customerSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { formatCurrency } from '@/utils/data.util';
import Pagination from '../orders/Pagination';
import DataNotFound from '../DataNotFound';
import { LoaderCircle } from 'lucide-react';

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
                <TableRow>
                  <TableHead className='w-fit text-nowrap'>Mã KH</TableHead>
                  <TableHead className='w-fit text-nowrap'>Tên khách hàng</TableHead>
                  <TableHead className='w-fit text-nowrap'>Email</TableHead>
                  <TableHead className='w-fit text-nowrap'>Điện thoại</TableHead>
                  <TableHead className='w-fit text-nowrap'>Tổng đơn</TableHead>
                  <TableHead className='w-fit text-nowrap'>Tổng chi tiêu</TableHead>
                  <TableHead className='w-fit text-nowrap'>Đơn cuối</TableHead>
                  <TableHead hidden className='w-fit text-nowrap'>Chi nhánh</TableHead>
                  <TableHead className='w-fit text-nowrap'>Trạng thái</TableHead>
                  <TableHead className='w-fit text-nowrap'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.code}</TableCell>
                    <TableCell>{[customer.first_name, customer.last_name].filter(Boolean).join(' ')}</TableCell>
                    <TableCell>{customer.email || '-'}</TableCell>
                    <TableCell>{customer.phone || '_'}</TableCell>
                    <TableCell>{customer.total_order}</TableCell>
                    <TableCell>{formatCurrency(customer.total_expenditure.toString())}₫</TableCell>
                    <TableCell>{customer.orders.length > 0 ? customer.orders[0]?.code : '-'}</TableCell>
                    <TableCell hidden className='max-w-[250px] truncate'>{customer.staff?.branch?.title ?? '-'}</TableCell>
                    <TableCell>
                      {customer.state ? <Badge variant='outline'><span className='text-nowrap'>{customer.state}</span></Badge> : '-'}
                    </TableCell>
                    <TableCell>
                      <Link href={`/customers/${customer.id}`}>
                        <Button variant="outline" size="sm">Xem chi tiết</Button>
                      </Link>
                    </TableCell>
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