'use client';

import React, { useEffect } from 'react';
import { Combobox } from '../ui/combobox';
import { Button } from '../ui/button';
import { RangeCalendar } from '../ui/range-calendar';
import ColumnOptions from './ColumnOptions';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getOrders, getOrdersCount, setFilter, toggleColumn } from '@/slices/orderSlice';
import { getBranches } from '@/slices/branchSlice';

export default function FilterOrders() {
  const dispatch = useAppDispatch();
  const branches = useAppSelector(state => state.branch.branches);
  const columns = useAppSelector(state => state.order.visibleColumns);
  const filter = useAppSelector(state => state.order.filter);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ ...filter, search: e.target.value }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (filter.search?.trim() === '') {
      handleSelectAll();
      return;
    }
  }

  const handleClearFilter = () => {
    const clearedFilter = {
      search: '',
      state: '',
      branch: '',
      dateRange: null,
    };
    dispatch(setFilter(clearedFilter));
    handleSelectAll();
  }

  const handleSelectAll = () => {
    dispatch(getOrdersCount());
    dispatch(getOrders({ page: 1, limit: 25 }));
  }

  useEffect(() => {
    dispatch(getBranches());
  }, []);

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
              value={filter.search}
              placeholder={"Tìm theo mã đơn hàng, số điện thoại hoặc email..."}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="block w-full pl-12 pr-20 h-10 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <Button variant="outline" className='h-10 whitespace-nowrap' onClick={handleSearch}>
            <span>Tìm kiếm</span>
          </Button>
        </div>

        {/* Filters Row */}
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 flex-wrap'>
          <Combobox
            className='w-full flex-1'
            options={[
              { value: 'all', label: 'Tất cả' },
              { value: 'Đang giao dịch', label: 'Đang giao dịch' },
              { value: 'Hoàn thành', label: 'Hoàn thành' },
              { value: 'Chờ thanh toán', label: 'Chờ thanh toán' },
              { value: 'Đã hủy', label: 'Đã hủy' },
            ]}
            value={filter.state}
            onChange={(value) => {
              dispatch(setFilter({ ...filter, state: value }));
              if (value === 'all') {
                handleSelectAll();
              } else {
                // dispatch(searchOrders({
                //   keyword: filter.search,
                //   state: value,
                //   branch_id: filter.branch,
                //   date_range: filter.dateRange
                // }));
              }
            }}
            placeholder='Trạng thái'
          />
          <Combobox
            className='w-full flex-1'
            options={[
              { value: 'all', label: 'Tất cả' },
              ...branches.map(branch => ({
                value: branch.id.toString(),
                label: branch.title
              }))
            ]}
            value={filter.branch}
            onChange={(value) => {
              dispatch(setFilter({ ...filter, branch: value }));
              if (value === 'all') {
                handleSelectAll();
              }
            }}
            placeholder='Chi nhánh'
          />
          <RangeCalendar className='w-full flex-1'
            dateRange={filter.dateRange || undefined}
            onChangeDateRange={(dateRange) => {
              dispatch(setFilter({
                ...filter, dateRange: dateRange
              }));
            }} />
          <div className='flex flex-row gap-2'>
            <Button variant="outline" className='h-10 w-full sm:w-24' onClick={handleClearFilter}>
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