import React from 'react';
import { Combobox } from '../ui/combobox';

interface FilterCustomersProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const FilterCustomers: React.FC<FilterCustomersProps> = ({
  placeholder = "Tìm theo tên, SDT, mã khách hàng, email...",
  onSearch
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 flex flex-row justify-between space-x-6">
      <div className='flex flex-col space-y-3 w-full'>
        <div className='flex flex-row space-x-2 items-center'>
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3332 3H1.6665L8.33317 10.8833V16.3333L11.6665 18V10.8833L18.3332 3Z" stroke="#09090B" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h1 className='text-xl font-bold'>Tìm kiếm và lọc</h1>
        </div>
        <div className='flex flex-row space-x-4 w-full'>
          <div className="flex-1 relative bg-white rounded-lg w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.16667 16.3333C12.8486 16.3333 15.8333 13.3486 15.8333 9.66667C15.8333 5.98477 12.8486 3 9.16667 3C5.48477 3 2.5 5.98477 2.5 9.66667C2.5 13.3486 5.48477 16.3333 9.16667 16.3333Z" stroke="#9CA3AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5 17.9998L13.9167 14.4165" stroke="#9CA3AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={placeholder}
              onChange={handleChange}
              className="block w-full pl-12 pr-20 h-10 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <Combobox
            options={[
              { value: 'all', label: 'Tất cả nhóm' },
              { value: 'retail', label: 'Bán lẻ' },
              { value: 'wholesale', label: 'Bán sỉ' },
            ]}
            value="all"
            onChange={() => { }}
            placeholder='Tất cả nhóm'
          />
          <Combobox
            options={[
              { value: 'all', label: 'Tất cả hạng thẻ' },
              { value: 'gold', label: 'Vàng' },
              { value: 'silver', label: 'Bạc' },
              { value: 'bronze', label: 'Đồng' },
            ]}
            value="all"
            onChange={() => { }}
            placeholder='Tất cả trạng thái'
          />
        </div>
      </div>
    </div>
  );
};

export default FilterCustomers;