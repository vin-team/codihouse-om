'use client';

import React, { useState } from 'react';
import { Combobox } from '../ui/combobox';
import { Button } from '../ui/button';
import { RangeCalendar } from '../ui/range-calendar';
import ColumnOptions from './ColumnOptions';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toggleColumn } from '@/slices/orderSlice';

export default function FilterOrders() {
  const dispatch = useAppDispatch();
  const columns = useAppSelector(state => state.order.visibleColumns);
  const [search, setSearch] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch?.(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
      <div className='flex flex-col space-y-4'>
        {/* Search Row */}
        <div className='flex flex-row sm:flex-row gap-4'>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.16667 16.3333C12.8486 16.3333 15.8333 13.3486 15.8333 9.66667C15.8333 5.98477 12.8486 3 9.16667 3C5.48477 3 2.5 5.98477 2.5 9.66667C2.5 13.3486 5.48477 16.3333 9.16667 16.3333Z" stroke="#9CA3AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5 17.9998L13.9167 14.4165" stroke="#9CA3AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              placeholder={"Tìm theo mã đơn hàng, số điện thoại hoặc email..."}
              onChange={handleChange}
              className="block w-full pl-12 pr-20 h-10 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <Button variant="outline" className='h-10 whitespace-nowrap'>
            <span>Tìm kiếm</span>
          </Button>
        </div>

        {/* Filters Row */}
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 flex-wrap'>
          <Combobox
            className='w-full flex-1'
            options={[
              { value: 'all', label: 'Tất cả' },
              { value: 'processing', label: 'Đang xử lý' },
              { value: 'completed', label: 'Hoàn thành' },
              { value: 'pending', label: 'Chờ thanh toán' },
              { value: 'cancelled', label: 'Đã hủy' },
            ]}
            value=""
            onChange={() => { }}
            placeholder='Trạng thái'
          />
          <Combobox
            className='w-full flex-1'
            options={[
              { value: 'all', label: 'Tất cả' },
              { value: 'q1', label: 'Quận 1' },
              { value: 'q2', label: 'Quận 2' },
              { value: 'q3', label: 'Quận 3' },
              { value: 'q4', label: 'Quận 4' },
              { value: 'q5', label: 'Quận 5' },
              { value: 'q6', label: 'Quận 6' },
              { value: 'q7', label: 'Quận 7' },
              { value: 'offline', label: 'Offline' },
            ]}
            value=""
            onChange={() => { }}
            placeholder='Chi nhánh'
          />
          <RangeCalendar className='w-full flex-1' />
          <div className='flex flex-row gap-2'>
            <Button variant="outline" className='h-10 w-full sm:w-24'>
              <span>Lọc</span>
            </Button>
            <Button variant="outline" className='h-10 w-full sm:w-24'>
              <span>Xóa lọc</span>
            </Button>
            <ColumnOptions
              className='w-full flex-1'
              visibleColumns={columns}
              onToggle={(column) => {
                dispatch(toggleColumn(column));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}