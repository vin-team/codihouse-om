'use client';

import React from 'react';
import OrderItem from './OrderItem';
export interface Order {
  id: string,
  customer: string,
  customerPhone: string,
  customerEmail: string,
  branch: string,
  salesChannel: string,
  amount: string,
  status: string,
  date: string,
  time: string,
  note: string,
  products:
  { name: string, price: number, quantity: number, total: number }[],
  subtotal: number,
  discount: number,
  finalAmount: number
}

interface RecentOrdersProps {
  orders: Order[];
  onViewAll?: () => void;
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders, onViewAll }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Đơn hàng gần đây</h2>
      </div>

      <div className="p-6 space-y-4">
        {orders.map((order, index) => (
          <OrderItem
            id={order.id}
            customer={order.customer}
            customerPhone={order.customerPhone}
            customerEmail={order.customerEmail}
            branch={order.branch}
            salesChannel={order.salesChannel}
            amount={order.amount}
            date={order.date}
            time={order.time}
            products={order.products}
            status={order.status as 'completed' | 'pending'}
            statusDate={order.date}
            phone={order.customerPhone}
            orderDate={order.date}
            totalAmount={order.amount}
            key={index}
          />
        ))}
      </div>

      <div className="pb-6 text-center">
        <button
          onClick={onViewAll}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Xem tất cả đơn hàng
        </button>
      </div>
    </div>
  );
};

export default RecentOrders; 