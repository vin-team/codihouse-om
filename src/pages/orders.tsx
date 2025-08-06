'use client';

import FilterOrders from '@/components/orders/FilterOrders';
import OrderList from '@/components/orders/OrderList';
import OrdersHeader from '@/components/orders/OrdersHeader';
import { roleService } from '@/services/role.service';
import router from 'next/dist/client/router';
import React, { useEffect } from 'react';

interface OrdersProps { }

const Order: React.FC<OrdersProps> = ({ }) => {
  const isAdmin = roleService.isAdmin();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin])

  return (
    <div className="min-h-full flex flex-col gap-4">
      <OrdersHeader />
      <FilterOrders />
      <OrderList />
    </div>
  );
};

export default Order;