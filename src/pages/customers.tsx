'use client'

import React from 'react';
import Layout from '@/components/Layout'
import CustomerList from '@/components/Customers/CustomerList';
import CustomersHeader from '@/components/Customers/CustomersHeader';
import FilterCustomers from '@/components/Customers/FilterCustomers';

export default function CustomerListPage() {
  return (
    <Layout>
      <div className="p-8 flex flex-col gap-6">
        <CustomersHeader />
        <FilterCustomers />
        <CustomerList />
      </div>
    </Layout>
  )
}