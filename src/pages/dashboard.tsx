'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SearchBar from '@/components/dashboard/SearchBar';
import RecentOrders from '@/components/dashboard/RecentOrders';
import React from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { setIsOpenSearchDialog } from '@/slices/app';
import Branches from '@/components/dashboard/Branches';
import { authService } from '@/services/auth.service';

const dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAdmin = authService.isAdmin();

  useKeyboardShortcut({
    key: 'k',
    callback: () => dispatch(setIsOpenSearchDialog(true)),
    modifier: 'cmd'
  });

  return (
    <div className="min-h-full flex flex-col gap-4">
      <DashboardHeader />
      <SearchBar />
      {isAdmin && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 'w-full">
        <Branches />
        <RecentOrders />
      </div>}
    </div>
  );
};

export default dashboard;
