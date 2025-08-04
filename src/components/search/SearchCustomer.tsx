'use client';

import { CustomerResult } from '@/pages/search';
import React from 'react';
import SearchCustomerItem from './SearchCustomerItem';

interface SearchCustomerProps {
  customers: CustomerResult[];
}

const SearchCustomer: React.FC<SearchCustomerProps> = ({ customers }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">
          Danh sách khách hàng ({customers.length})
        </h2>
      </div>
      <div className="p-6 space-y-4">
        {customers.map((customer, index) => (
          <SearchCustomerItem key={index} customer={customer} />
        ))}
      </div>
    </div>
  );
};

export default SearchCustomer;