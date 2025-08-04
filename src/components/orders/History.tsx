import { OrderDetail } from '@/pages/orders/[id]';
import React from 'react';

interface HistoryProps {
  orderDetail: OrderDetail
}

const History: React.FC<HistoryProps> = ({ orderDetail }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className='flex flex-row justify-between pb-2'>
        <div className='flex flex-row items-center gap-2'>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.6665 1.6665V4.99984" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.3335 1.6665V4.99984" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.8333 3.3335H4.16667C3.24619 3.3335 2.5 4.07969 2.5 5.00016V16.6668C2.5 17.5873 3.24619 18.3335 4.16667 18.3335H15.8333C16.7538 18.3335 17.5 17.5873 17.5 16.6668V5.00016C17.5 4.07969 16.7538 3.3335 15.8333 3.3335Z" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.5 8.3335H17.5" stroke="#09090B" stroke-width="1.66667" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className='text-xl font-medium'>Lịch sử</span>
        </div>
      </div>

      <div className="space-y-4">
        {orderDetail.history.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${item.status === 'completed' ? 'bg-blue-500' :
              item.status === 'created' ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>
            <div className="flex-1">
              <div className="font-medium">{item.action}</div>
              <div className="text-sm text-gray-600">{item.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;