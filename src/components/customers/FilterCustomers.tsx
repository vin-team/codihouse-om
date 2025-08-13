import React, { useEffect } from 'react';
import { Combobox } from '../ui/combobox';
import { Button } from '../ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getCustomers, getCustomersCount, searchCustomers, setFilter } from '@/slices/customerSlice';
import { OrderCountFilter, TotalExpenditureFilter } from '@/model/Customer.model';

export default function FilterCustomers() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.customer.filter);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    dispatch(searchCustomers({
      search: filter.search,
      state: filter.state,
      orderCount: filter.orderCount,
      totalExpenditure: filter.totalExpenditure
    }));
  }

  const handleClearSearch = () => {
    dispatch(setFilter({
      search: '',
      status: '',
      orderCount: '',
      totalExpenditure: '',
    }));
    handleSelectAll();
  };

  const handleSelectAll = () => {
    dispatch(getCustomersCount());
    dispatch(getCustomers({ page: 1, limit: 25 }));
  }

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
              onChange={(e) => dispatch(setFilter({ ...filter, search: e.target.value }))}
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
              { value: 'Đang giao dịch', label: 'Đang giao dịch' }
            ]}
            value={filter.state}
            onChange={(value) => {
              dispatch(setFilter({ ...filter, state: value }));
              if (value === 'all') {
                handleSelectAll();
              } else {
                dispatch(searchCustomers({
                  search: filter.search,
                  state: value,
                  orderCount: filter.orderCount,
                  totalExpenditure: filter.totalExpenditure
                }));
              }
            }}
            placeholder='Trạng thái'
          />
          <Combobox
            className='w-full flex-1'
            options={[
              { value: OrderCountFilter.ALL, label: 'Tất cả' },
              { value: OrderCountFilter.RANGE_1_5, label: '1-5 đơn' },
              { value: OrderCountFilter.RANGE_6_15, label: '6-15 đơn' },
              { value: OrderCountFilter.RANGE_16_30, label: '16-30 đơn' },
              { value: OrderCountFilter.OVER_30, label: 'Trên 30 đơn' },
            ]}
            value={filter.orderCount}
            onChange={(value) => {
              dispatch(setFilter({ ...filter, orderCount: value }));
              if (value === 'all') {
                handleSelectAll();
              } else {
                dispatch(searchCustomers({
                  search: filter.search,
                  state: filter.state,
                  orderCount: value,
                  totalExpenditure: filter.totalExpenditure
                }));
              }
            }}
            placeholder='Số lượng đơn hàng'
          />
          <Combobox
            className='w-full flex-1'
            options={[
              { value: TotalExpenditureFilter.ALL, label: 'Tất cả' },
              { value: TotalExpenditureFilter.UNDER_1M, label: 'Dưới 1M' },
              { value: TotalExpenditureFilter.RANGE_1_3M, label: '1M-3M' },
              { value: TotalExpenditureFilter.RANGE_3_5M, label: '3M-5M' },
              { value: TotalExpenditureFilter.OVER_5M, label: 'Trên 5M' },
            ]}
            value={filter.totalExpenditure}
            onChange={(value) => {
              dispatch(setFilter({ ...filter, totalExpenditure: value }));
              if (value === 'all') {
                handleSelectAll();
              } else {
                dispatch(searchCustomers({
                  search: filter.search,
                  state: filter.state,
                  orderCount: filter.orderCount,
                  totalExpenditure: value
                }));
              }
            }}
            placeholder='Tổng chỉ tiêu'
          />
          <div className='flex flex-row gap-2'>
            <Button variant="outline" className='h-10 w-full sm:w-24' onClick={handleClearSearch}>
              <span>Xóa lọc</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}