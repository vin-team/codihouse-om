import { OrderResult } from '@/pages/search';
import React from 'react';
import SearchOrderItem from './SearchOrderItem';

interface SearchOrderProps {
  orders: OrderResult[];
}

const SearchOrder: React.FC<SearchOrderProps> = ({ orders }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Danh sách đơn hàng ({orders.length})</h2>
      </div>

      <div className="p-6 space-y-4">
        {orders.map((order, index) => (
          <SearchOrderItem key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default SearchOrder;