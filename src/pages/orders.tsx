'use client';

import FilterOrders from '@/components/orders/FilterOrders';
import OrderList from '@/components/orders/OrderList';
import OrdersHeader from '@/components/orders/OrdersHeader';
import React from 'react';

interface OrdersProps { }

const Order: React.FC<OrdersProps> = ({ }) => {
  return (
    <div className="min-h-full flex flex-col gap-4">
      <OrdersHeader />
      <FilterOrders />
      <OrderList />
    </div>
  );
};

export default Order;