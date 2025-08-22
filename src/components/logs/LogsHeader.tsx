'use client';

import React from 'react';
import { BackButton } from '../ui/back-button';
import { ImportLog } from '@/model/ImportLog.model';

export default function LogsHeader({ id }: { id: string }) {

  return (
    <div className='flex-1 flex flex-row justify-between'>
      <div className='flex flex-col space-y-2'>
        <BackButton fallbackHref="/logs" />
        <h1 className="text-3xl font-bold text-gray-900">Chi tiết logs import</h1>
        <p className="tet-gray-600">Thông tin logs import {id}</p>
      </div>
    </div>
  );
}