'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';

interface CustomerDetailHeaderProps {
  customerName: string;
  customerCode: string;
}
const CustomerDetailHeader: React.FC<CustomerDetailHeaderProps> = ({
  customerName,
  customerCode
}) => {
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{customerName}</h1>
        <p className="text-gray-600">Mã khách hàng: {customerCode}</p>
      </div>
      <div className='flex flex-col justify-end'>
        <Button variant="outline" className="gap-2 py-2 px-6">
          <Pencil className="w-4 h-4" />
          Cập nhật
        </Button>
      </div>
    </div>
  );
};
export default CustomerDetailHeader;