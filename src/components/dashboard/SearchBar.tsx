'use client';

import { roleService } from '@/services/role.service';
import { setIsOpenSearchDialog } from '@/slices/app';
import React from 'react';
import { useDispatch } from 'react-redux';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Nhấn để tìm kiếm đơn hàng... (⌘K)",
}) => {
  const dispatch = useDispatch();
    const isAdmin = roleService.isAdmin();

  if (isAdmin) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="relative bg-white rounded-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.16667 16.3333C12.8486 16.3333 15.8333 13.3486 15.8333 9.66667C15.8333 5.98477 12.8486 3 9.16667 3C5.48477 3 2.5 5.98477 2.5 9.66667C2.5 13.3486 5.48477 16.3333 9.16667 16.3333Z" stroke="#9CA3AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.5 17.9998L13.9167 14.4165" stroke="#9CA3AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={placeholder}
            onClick={() => dispatch(setIsOpenSearchDialog(true))}
            className="block w-full pl-12 pr-20 h-10 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <kbd className="inline-flex items-center px-2 py-1 border border-gray-300 rounded text-xs font-mono text-gray-500 bg-gray-50">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center'>
      <div className="bg-white rounded-lg p-6 border border-gray-200 w-[75%]">
        <div className="relative bg-white rounded-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.16667 16.3333C12.8486 16.3333 15.8333 13.3486 15.8333 9.66667C15.8333 5.98477 12.8486 3 9.16667 3C5.48477 3 2.5 5.98477 2.5 9.66667C2.5 13.3486 5.48477 16.3333 9.16667 16.3333Z" stroke="#9CA3AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.5 17.9998L13.9167 14.4165" stroke="#9CA3AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={"Tìm theo mã đơn hàng, số điện thoại, tên khách hàng hoặc tên sản phẩm"}
            onClick={() => dispatch(setIsOpenSearchDialog(true))}
            className="block w-full pl-12 pr-20 h-10 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <kbd className="inline-flex items-center px-2 py-1 border border-gray-300 rounded text-xs font-mono text-gray-500 bg-gray-50">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 