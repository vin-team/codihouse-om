'use client';

import { formatCurrency } from '@/utils/data.util';
import React from 'react';

interface CustomerOrderHistoryProps {
  customerId: string
}

const CustomerOrderHistory: React.FC<CustomerOrderHistoryProps> = ({ customerId }: { customerId: string }) => {
  const orders = [
    {
      id: "#ORD-001",
      date: "2024-01-15",
      amount: "30319000",
      status: "Hoàn thành"
    }
  ]

  return (
    <div key={customerId} className="w-full h-full bg-white border border-[#E4E4E7] shadow-sm rounded-[8px] p-[24px] flex flex-col gap-[24px]">
      {/* Header */}
      <div className="flex items-center justify-between w-full h-[36px]">
        <h3 className="text-[20px] font-semibold leading-[24px] tracking-[-0.6px] text-[#09090B]">
          Lịch sử mua hàng
        </h3>
        <button className="text-[14px] font-medium leading-[20px] text-[#2563EB] px-[12px] h-[36px] rounded-[6px]">
          Cập nhật
        </button>
      </div>

      {/* Orders */}
      <div className="w-full h-full border border-[#E4E4E7] rounded-[8px] px-4 py-3 relative">
        {orders.map((order) => (
          <div key={order.id} className="flex justify-between items-center h-full">
            {/* Left side */}
            <div className="flex flex-col gap-[1px]">
              <span className="text-[16px] font-medium leading-[24px] text-[#09090B]">
                {order.id}
              </span>
              <span className="text-[14px] font-normal leading-[20px] text-[#4B5563]">
                {order.date}
              </span>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-end gap-[4px]">
              <span className="text-[16px] font-medium leading-[24px] text-[#09090B] text-right">
                {formatCurrency(order.amount)} đ
              </span>
              <span className="text-[12px] font-semibold leading-[16px] text-[#FAFAFA] bg-[#18181B] px-[11px] py-[3px] rounded-full">
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default CustomerOrderHistory;