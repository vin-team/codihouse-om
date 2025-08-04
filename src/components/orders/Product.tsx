'use client';

import { OrderDetail } from '@/pages/orders/[id]';
import React from 'react';

interface ProductProps {
  orderDetail: OrderDetail
}

const Product: React.FC<ProductProps> = ({ orderDetail }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className='flex flex-row justify-between pb-2'>
        <span className='text-xl font-medium'>Sản phẩm</span>
      </div>
      <div className='flex flex-col space-y-2 pb-4'>
        {orderDetail.products.map((product, index) => (
          <div key={index} className="flex flex-row justify-between space-x-2 items-center p-2 border border-gray-100 rounded-lg">
            <div className='p-4 rounded-lg bg-blue-100'>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 4.77002L16.5 9.92002" stroke="#2563EB" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 8.4999C20.9996 8.14918 20.9071 7.80471 20.7315 7.50106C20.556 7.19742 20.3037 6.94526 20 6.7699L13 2.7699C12.696 2.59437 12.3511 2.50195 12 2.50195C11.6489 2.50195 11.304 2.59437 11 2.7699L4 6.7699C3.69626 6.94526 3.44398 7.19742 3.26846 7.50106C3.09294 7.80471 3.00036 8.14918 3 8.4999V16.4999C3.00036 16.8506 3.09294 17.1951 3.26846 17.4987C3.44398 17.8024 3.69626 18.0545 4 18.2299L11 22.2299C11.304 22.4054 11.6489 22.4979 12 22.4979C12.3511 22.4979 12.696 22.4054 13 22.2299L20 18.2299C20.3037 18.0545 20.556 17.8024 20.7315 17.4987C20.9071 17.1951 20.9996 16.8506 21 16.4999V8.4999Z" stroke="#2563EB" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.2998 7.5L11.9998 12.5L20.6998 7.5" stroke="#2563EB" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22.5V12.5" stroke="#2563EB" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-600">
                Số lượng: {product.quantity}
              </div>
            </div>
            <div className='flex flex-col items-end'>
              <div className="font-medium">{product.total}</div>
              <div className="text-sm text-gray-600">
                Tổng: {product.total}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Tạm tính:</span>
          <span>{orderDetail.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển:</span>
          <span>0</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Tổng cộng:</span>
          <span>{orderDetail.finalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;