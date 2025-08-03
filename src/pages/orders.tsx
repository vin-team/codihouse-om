'use client';

import Layout from '@/components/dashboard/Layout';
import FilterOrders from '@/components/orders/FilterOrders';
import OrderList from '@/components/orders/OrderList';
import OrdersHeader from '@/components/orders/OrdersHeader';
import React from 'react';

interface OrdersProps { }

const Order: React.FC<OrdersProps> = ({ }) => {
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