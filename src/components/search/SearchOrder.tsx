'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import React, { useEffect, useState } from 'react';
import SearchOrderItem from './SearchOrderItem';
import DataNotFound from '../DataNotFound';
import Pagination from '../orders/Pagination';
import { searchOrders, setCurrentPageOrders } from '@/slices/searchSlice';
import { useRouter } from 'next/router';
import { LoaderCircle } from 'lucide-react';

export default function SearchOrder() {
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.search.searchResult.orders);
  const currentPageOrders = useAppSelector((state) => state.search.currentPageOrders);
  const requestState=useAppSelector(state=>state.search.requestState)
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPageOrders(page - 1));
    dispatch(searchOrders({ query: keyword as string, page: currentPageOrders, limit: 5 }));
  };
  useEffect(() => {
      if (keyword) {
        dispatch(searchOrders({ query: keyword as string, page: 0, limit: 5 }));
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
        <h2 className="text-xl font-bold text-gray-900">Danh sách đơn hàng ({orders.length})</h2>
        {loading&&<div className="min-h-full flex flex-col gap-4 items-center justify-center">
         <LoaderCircle className='w-6 h-6 text-blue-400 animate-spin' />
       </div>}
      </div>

      {orders.length > 0 ? <div className="p-6 flex flex-col space-y-4">
        {orders.map((order, index) => (
          <SearchOrderItem key={index} order={order} />
        ))}
      </div> : <DataNotFound />}

      {orders.length > 4 && <div className="p-6">
        <Pagination
          currentPage={currentPageOrders + 1}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      </div>}
    </div>
  );
}