import React from 'react';
import OrderItem from './OrderItem';

interface Order {
  orderId: string;
  source: 'SHOPIFY' | 'SAPO';
  customerName: string;
  products: string[];
  phone: string;
  orderDate: string;
  totalAmount: string;
  status: 'completed' | 'pending';
  statusDate: string;
}

interface RecentOrdersProps {
  orders: Order[];
  onViewAll?: () => void;
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders, onViewAll }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Đơn hàng gần đây</h2>
      </div>
      
      <div className="p-6 space-y-4">
        {orders.map((order, index) => (
          <OrderItem
            key={index}
            orderId={order.orderId}
            source={order.source}
            customerName={order.customerName}
            products={order.products}
            phone={order.phone}
            orderDate={order.orderDate}
            totalAmount={order.totalAmount}
            status={order.status}
            statusDate={order.statusDate}
          />
        ))}
      </div>

      {/* View All Orders Button */}
      <div className="p-6 border-t border-gray-200 text-center">
        <button 
          onClick={onViewAll}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Xem tất cả đơn hàng
        </button>
      </div>
    </div>
  );
};

export default RecentOrders; 