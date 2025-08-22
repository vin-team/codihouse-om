'use client';

export default function LogsHeader() {

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý logs import</h1>
        <p className="text-gray-600">Quản lý tất cả logs import trong hệ thống</p>
      </div>
    </div>
  );
}