import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { getCustomers, getCustomersCount, setPage } from '@/slices/customerSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Customer } from '@/model/Customer.model';
import { formatCurrency } from '@/utils/data.util';
import Pagination from '../orders/Pagination';

export default function CustomerList() {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(state => state.customer.pagination);
  const customers = useAppSelector(state => state.customer.customers);
  const filter = useAppSelector(state => state.customer.filter);

  const [filterCustomers, setFilterCustomers] = useState<Customer[]>([]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    dispatch(getCustomersCount());
  }, []);

  useEffect(() => {
    dispatch(getCustomers({ page: pagination.page, limit: pagination.limit }));
  }, [pagination.page, pagination.limit]);

  const customerMatchesFilter = (customer: Customer): boolean => {
    if (filter.search && filter.search.trim() !== '') {
      const searchTerm = filter.search.toLowerCase();
      const matchesSearch =
        customer.code?.toLowerCase().includes(searchTerm) ||
        customer.email?.toLowerCase().includes(searchTerm) ||
        customer.first_name?.toLowerCase().includes(searchTerm) ||
        customer.last_name?.toLowerCase().includes(searchTerm)

      if (!matchesSearch) return false;
    }

    if (filter.status && filter.status !== 'all') {
      const statusMap: { [key: string]: string } = {};

      if (customer.status !== statusMap[filter.status]) {
        return false;
      }
    }

    if (filter.orderCount && filter.orderCount !== 'all') {
      if (customer.total_order.toString() !== filter.orderCount) {
        return false;
      }
    }

    if (filter.totalExpenditure && filter.totalExpenditure !== 'all') {
      if (customer.total_expenditure.toString() !== filter.totalExpenditure) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    const filtered = customers.filter(customerMatchesFilter);
    setFilterCustomers(filtered);
  }, [filter, customers]);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Kết quả ({customers.length} khách hàng)</h2>
      </div>

      <div className="p-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã KH</TableHead>
              <TableHead>Tên khách hàng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Điện thoại</TableHead>
              <TableHead>Tổng đơn</TableHead>
              <TableHead>Tổng chi tiêu</TableHead>
              <TableHead>Đơn cuối</TableHead>
              <TableHead>Chi nhánh</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.code}</TableCell>
                <TableCell>{[customer.first_name, customer.last_name].filter(Boolean).join(' ')}</TableCell>
                <TableCell>{customer.email || '-'}</TableCell>
                <TableCell>{customer.phone || '_'}</TableCell>
                <TableCell>{customer.total_order}</TableCell>
                <TableCell>{formatCurrency(customer.total_expenditure.toString())}₫</TableCell>
                <TableCell>{customer.orders.length > 0 ? customer.orders[0]?.code : '-'}</TableCell>
                <TableCell className='max-w-[250px] truncate'>{customer.address_book.length > 0 ? customer.address_book[0]?.address : '-'}</TableCell>
                <TableCell>
                  <Badge variant={
                    customer.status === "VIP" ? "default" :
                      customer.status === "Mới" ? "secondary" : "outline"
                  }>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/customers/${customer.id}`}>
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