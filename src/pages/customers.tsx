'use client'

import React from 'react';
import Layout from '@/components/Layout'
import CustomerList from '@/components/customers/CustomerList';
import CustomersHeader from '@/components/customers/CustomersHeader';
import FilterCustomers from '@/components/customers/FilterCustomers';

export default function CustomerListPage() {
  return (
    <div className="min-h-full flex flex-col gap-4">
      <CustomersHeader />
      <FilterCustomers />
      <CustomerList />
    </div>

  )
}