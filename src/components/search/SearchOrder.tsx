'use client';

import { useAppSelector } from '@/hooks/redux';
import React, { useState } from 'react';
import SearchOrderItem from './SearchOrderItem';
import DataNotFound from '../DataNotFound';
import Pagination from '../orders/Pagination';

export default function SearchOrder() {
  const orders = useAppSelector((state) => state.search.searchResult.orders);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(orders.length / 5);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedOrders = orders.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Danh sách đơn hàng ({orders.length})</h2>
      </div>

      {orders.length > 0 ? <div className="p-6 flex flex-col space-y-4">
        {paginatedOrders.map((order, index) => (
          <SearchOrderItem key={index} order={order} />
        ))}
      </div> : <DataNotFound />}

      {orders.length > 5 && <div className="p-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>}
    </div>
  );
}