'use client';

import { BackButton } from "@/components/ui/back-button";

export default function UsersAddHeader() {

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm người dùng mới</h1>
        <p className="text-gray-600">Tạo tài khoản mới cho nhân viên chi nhánh</p>
      </div>
      <div className='flex flex-row gap-2'>
        <BackButton fallbackHref="/users" />
      </div>
    </div>
  );
}