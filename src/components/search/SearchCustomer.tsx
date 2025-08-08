'use client';

import { useAppSelector } from '@/hooks/redux';
import React, { useState } from 'react';
import SearchCustomerItem from './SearchCustomerItem';
import Pagination from '../orders/Pagination';
import DataNotFound from '../DataNotFound';

export default function SearchCustomer() {
  const customers = useAppSelector((state) => state.search.searchResult.customers);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(customers.length / 5);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedCustomers = customers.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">
          Danh sách khách hàng ({customers.length})
        </h2>
      </div>
      {customers.length > 0 ? <div className="p-6 flex flex-col space-y-4">
        {paginatedCustomers.map((customer, index) => (
          <SearchCustomerItem key={index} customer={customer} />
        ))}
      </div> : <DataNotFound />}

      {customers.length > 5 && <div className="p-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>}
    </div>
  );
}