import { useRouter } from 'next/router';
import React from 'react';
import { MenuUser } from './ui/menu_user';
import { useAppSelector } from '@/hooks/redux';

const Header: React.FC = () => {
  const router = useRouter();
  const isLogined = useAppSelector(state => state.app.isLogined);

  if (!isLogined) {
    return <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-screen px-10">
          <div className="flex justify-center items-center h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => { router.push('/dashboard') }}
                className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OM</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Order Manager</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-screen px-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => { router.push('/dashboard') }}
              className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">OM</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Order Manager</span>
            </button>
          </div>

          <div className="flex items-center">
            <MenuUser />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;