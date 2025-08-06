'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SearchBar from '@/components/dashboard/SearchBar';
import RecentOrders from '@/components/dashboard/RecentOrders';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { setIsOpenSearchDialog } from '@/slices/app';
import { roleService } from '@/services/role.service';
import Branches from '@/components/dashboard/Branches';

const dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const isAdmin = roleService.isAdmin();

  useKeyboardShortcut({
    key: 'k',
    callback: () => dispatch(setIsOpenSearchDialog(true)),
    modifier: 'cmd'
  });

  return (
    <div className="min-h-full flex flex-col gap-4">
      <DashboardHeader />
      <SearchBar />
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isAdmin ? 'w-full' : 'w-[75%] mx-auto'}`}>
        <Branches />
        <RecentOrders />
      </div>
    </div>
  );
};

export default dashboard;
