'use client'

import React from 'react';
import Layout from '@/components/Layout'
import CustomerList from '@/components/customers/CustomerList';
import CustomersHeader from '@/components/customers/CustomersHeader';
import FilterCustomers from '@/components/customers/FilterCustomers';

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