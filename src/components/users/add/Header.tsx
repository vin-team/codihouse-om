'use client';

import { Button } from "@/components/ui/button";
import router from "next/dist/client/router";

export default function UsersAddHeader() {
  const handleBack = () => {
    router.push('/users');
  }

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm người dùng mới</h1>
        <p className="text-gray-600">Tạo tài khoản mới cho nhân viên chi nhánh</p>
      </div>
      <div className='flex flex-row gap-2'>
        <Button variant="outline" onClick={handleBack}>Quay lại</Button>
      </div>
    </div>
  );
}