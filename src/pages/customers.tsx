'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import Layout from '@/components/dashboard/Layout'
import CustomersHeader from '@/components/customers/CustomersHeader';
import FilterCustomers from '@/components/customers/FilterCustomers';
import CustomerList from '@/components/customers/CustomerList';

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