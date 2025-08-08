import React from 'react';
import { MenuUser } from './ui/menu_user';
import { useAppSelector } from '@/hooks/redux';
import Link from 'next/dist/client/link';

const Header: React.FC = () => {
  const isLogined = useAppSelector(state => state.app.isLogined);

  if (!isLogined) {
    return <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-screen px-10">
          <div className="flex justify-center items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href={'/dashboard'}>
                <button
                  className="flex items-center space-x-3">
                  <img src="/favicon.ico" alt="LNC" className="w-8 h-8" />
                  <span className="text-xl font-bold text-gray-900">LNC</span>
                </button>
              </Link>
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
            <Link href={'/dashboard'}>
              <button
                className="flex items-center space-x-3">
                <img src="/favicon.ico" alt="LNC" className="w-10 h-10" />
                <span className="text-xl font-bold text-gray-900">LNC</span>
              </button>
            </Link>
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