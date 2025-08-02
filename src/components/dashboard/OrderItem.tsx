import React from 'react';

interface OrderItemProps {
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

const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  source,
  customerName,
  products,
  phone,
  orderDate,
  totalAmount,
  status,
  statusDate
}) => {
  const getStatusColor = () => {
    return status === 'completed' ? 'bg-green-500' : 'bg-blue-500';
  };

  const getStatusText = () => {
    return status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý';
  };

  const getStatusBadgeColor = () => {
    return status === 'completed' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const getSourceBadgeColor = () => {
    return source === 'SHOPIFY' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-green-100 text-green-800';
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 ${getStatusColor()} rounded-full`}></div>
          <span className="font-medium text-gray-900">{orderId}</span>
          <span className={`px-2 py-1 ${getSourceBadgeColor()} text-xs rounded-full`}>
            {source}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          <p><strong>Khách hàng:</strong> {customerName}</p>
          {products.map((product, index) => (
            <div key={index} className="flex items-center space-x-1 mt-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4L7 1L12 4V11C12 11.5523 11.5523 12 11 12H3C2.44772 12 2 11.5523 2 11V4Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{product}</span>
            </div>
          ))}
          <p className="mt-1"><strong>SĐT:</strong> {phone}</p>
          <p className="mt-1"><strong>Ngày:</strong> {orderDate}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">{totalAmount}</p>
        <span className={`inline-block px-3 py-1 ${getStatusBadgeColor()} text-sm rounded-full mt-2`}>
          {getStatusText()}
        </span>
        <p className="text-xs text-gray-500 mt-1">{statusDate}</p>
      </div>
    </div>
  );
};

export default OrderItem; 