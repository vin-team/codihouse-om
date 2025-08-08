'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LoaderCircle, Search } from 'lucide-react';
import SearchHeader from '@/components/search/SearchHeader';
import SearchOrder from '@/components/search/SearchOrder';
import SearchCustomer from '@/components/search/SearchCustomer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { search } from '@/slices/searchSlice';

export default function SearchPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { keyword } = router.query;
  const orders = useAppSelector((state) => state.search.searchResult.orders);
  const customers = useAppSelector((state) => state.search.searchResult.customers);

  const requestState = useAppSelector((state) => state.search.requestState);
  const totalResults = orders.length + customers.length;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (keyword) {

      dispatch(search(keyword as string));
    }
  }, [keyword]);

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

  if (loading) {
    return (
      <div className="min-h-full flex flex-col gap-4 items-center justify-center">
        <LoaderCircle className='w-16 h-16 text-blue-400 animate-spin' />
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col gap-4">
      <SearchHeader keyword={keyword as string} totalResults={totalResults} />
      {orders.length > 0 && <SearchOrder />}
      {customers.length > 0 && <SearchCustomer />}

      {totalResults === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy kết quả</h3>
          <p className="text-gray-600">
            Không có kết quả nào cho từ khóa "{keyword}". Vui lòng thử từ khóa khác.
          </p>
        </div>
      )}
    </div>
  );
};
