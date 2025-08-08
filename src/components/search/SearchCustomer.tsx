'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import React, { useEffect, useState } from 'react';
import SearchCustomerItem from './SearchCustomerItem';
import Pagination from '../orders/Pagination';
import DataNotFound from '../DataNotFound';
import { searchCustomers, setCurrentPageCustomers } from '@/slices/searchSlice';
import { useRouter } from 'next/router';

export default function SearchCustomer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { keyword } = router.query;
  const customers = useAppSelector((state) => state.search.searchResult.customers);
  const currentPageCustomers = useAppSelector((state) => state.search.currentPageCustomers);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPageCustomers(page - 1));
    dispatch(searchCustomers({ query: keyword as string, page: currentPageCustomers, limit: 5 }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">
          Danh sách khách hàng ({customers.length})
        </h2>
      </div>
      {customers.length > 0 ? <div className="p-6 flex flex-col space-y-4">
        {customers.map((customer, index) => (
          <SearchCustomerItem key={index} customer={customer} />
        ))}
      </div> : <DataNotFound />}

      {customers.length > 4 && <div className="p-6">
        <Pagination
          currentPage={currentPageCustomers + 1}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      </div>}
    </div>
  );
}