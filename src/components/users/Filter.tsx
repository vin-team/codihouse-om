import { useState } from "react";
import { Button } from "../ui/button";
import { Combobox } from "../ui/combobox";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { searchUsers, setFilter } from "@/slices/userSlice";
export default function UsersFilter() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.user.filter);

  const handleSearch = () => {
    dispatch(searchUsers({ search: filter.search }));
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
              placeholder={"Tìm kiếm người dùng..."}
              onChange={(e) => dispatch(setFilter({ ...filter, search: e.target.value }))}
              className="block w-full pl-12 pr-20 h-10 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <Button variant="outline" className='h-10 whitespace-nowrap' onClick={handleSearch}>
            <span>Tìm kiếm</span>
          </Button>
        </div>
      </div>
    </div>
  );
}