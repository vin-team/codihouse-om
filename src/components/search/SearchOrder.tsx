'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import React, { useEffect, useState } from 'react';
import SearchOrderItem from './SearchOrderItem';
import DataNotFound from '../DataNotFound';
import Pagination from '../orders/Pagination';
import { searchOrders, setCurrentPageOrders } from '@/slices/searchSlice';
import { useRouter } from 'next/router';

export default function SearchOrder() {
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.search.searchResult.orders);
  const currentPageOrders = useAppSelector((state) => state.search.currentPageOrders);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPageOrders(page - 1));
    dispatch(searchOrders({ query: keyword as string, page: currentPageOrders, limit: 5 }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Danh sách đơn hàng ({orders.length})</h2>
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