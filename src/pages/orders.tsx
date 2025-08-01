import Layout from '@/components/dashboard/Layout';
import React from 'react';

interface OrdersProps {
  // Define props here
}

const Order: React.FC<OrdersProps> = ({ }) => {
  return (
    <Layout
      children={
        <div>
          <h1>Welcome to Orders</h1>
          <p>This is the page of managing your orders.</p>
        </div>
      } />
  );
};

export default Order;