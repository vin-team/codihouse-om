'use client'

import React, { useEffect } from 'react';
import Layout from '@/components/Layout'
import CustomerList from '@/components/customers/CustomerList';
import CustomersHeader from '@/components/customers/CustomersHeader';
import FilterCustomers from '@/components/customers/FilterCustomers';
import router from 'next/dist/client/router';
import { roleService } from '@/services/role.service';

export default function CustomerListPage() {
  const isAdmin = roleService.isAdmin();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin])

  return (
    <div className="min-h-full flex flex-col gap-4">
      <CustomersHeader />
      <FilterCustomers />
      <CustomerList />
    </div>

  )
}