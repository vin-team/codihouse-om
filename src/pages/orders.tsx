'use client';

import Layout from '@/components/Layout';
import FilterOrders from '@/components/orders/FilterOrders';
import OrderList from '@/components/orders/OrderList';
import OrdersHeader from '@/components/orders/OrdersHeader';
import { roleService } from '@/services/role.service';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface OrdersProps { }

const Order: React.FC<OrdersProps> = ({ }) => {
  const router = useRouter();
  const isAdmin = roleService.isAdmin();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin])

  return (
    <Layout
      children={
        <div className="p-8 flex flex-col gap-6">
          <OrdersHeader />
          <FilterOrders />
          <OrderList />
        </div>
      } />
  );
};

export default Order;