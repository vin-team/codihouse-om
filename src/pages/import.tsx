import React from 'react';
import ImportHeader from '@/components/import/Header';
import ImportForm from '@/components/import/Form';

export default function Import() {
  return (
    <div className="min-h-full flex flex-col gap-4">
      <ImportHeader />
      <ImportForm />
    </div>
  )
}