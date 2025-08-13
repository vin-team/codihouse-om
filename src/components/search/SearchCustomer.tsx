'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import React, { useEffect, useState } from 'react';
import SearchCustomerItem from './SearchCustomerItem';
import DataNotFound from '../DataNotFound';
import { searchCustomers, setCurrentPageCustomers } from '@/slices/searchSlice';
import { useRouter } from 'next/router';
import { LoaderCircle } from 'lucide-react';
import Pagination from './Pagination';

export default function SearchCustomer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { keyword } = router.query;
  const customers = useAppSelector((state) => state.search.searchResult.customers);
  const currentPageCustomers = useAppSelector((state) => state.search.pagination.customers.currentPage);
  const requestState = useAppSelector(state => state.search.requestState)
  const estimatedTotalHits = useAppSelector(state => state.search.pagination.customers.estimatedTotalHits)

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPageCustomers(page - 1));
    dispatch(searchCustomers({ query: keyword as string, page: currentPageCustomers, limit: 5 }));
  };

  useEffect(() => {
    if (keyword) {
      dispatch(searchCustomers({ query: keyword as string, page: 0, limit: 5 }));
    }
  }, [keyword]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    switch (requestState?.status) {
      case 'loading':
        setLoading(true);
        break;
      case 'completed':
        setLoading(false);
        break;
      case 'failed':
        setLoading(false);
        break;
    }
  }, [requestState]);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0 flex justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Danh sách khách hàng ({customers.length})
        </h2>
        {loading && <div className="min-h-full flex flex-col gap-4 items-center justify-center">
          <LoaderCircle className='w-6 h-6 text-blue-400 animate-spin' />
        </div>}
      </div>
      {customers.length > 0 ? <div className="p-6 flex flex-col space-y-4">
        {customers.map((customer, index) => (
          <SearchCustomerItem key={index} customer={customer} />
        ))}
      </div> : <DataNotFound />}

      <div className="p-6">
        <Pagination
          currentPage={currentPageCustomers + 1}
          estimatedTotalHits={estimatedTotalHits}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}