'use client';
import Layout from '@/components/Layout';
import React from 'react';
import CustomerPersonalInfo from '@/components/customers/Details/CustomerPersonalInfo';
import CustomerSalesInfo  from '@/components/customers/Details/CustomerSalesInfo';
import CustomerPointsInfo from '@/components/customers/Details/CustomerPointInfo';
import CustomerOrderHistory from '@/components/customers/Details/Customerorderhistory';
import CustomerPurchaseInfo from '@/components/customers/Details/CustomerPurchaseInfo';
import { useRouter } from 'next/dist/client/components/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';

interface CustomerDetailProps { }

export function CustomerDetailView({
  customerDetail
}: {
  customerDetail: any;
}) {
  const router = useRouter();
  return (
    <div className="space-y-6 px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" onClick={() => router.back()} />
          <div>
            <h1 className="text-xl font-semibold">{customerDetail.name}</h1>
            <p className="text-sm text-muted-foreground">
              Mã khách hàng: {customerDetail.code}
            </p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Pencil className="w-4 h-4" /> Cập nhật
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomerPersonalInfo customer={customerDetail} />
        <CustomerPointsInfo points={customerDetail.points} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomerSalesInfo customerId={customerDetail.id} />
        <CustomerPurchaseInfo customerId={customerDetail.id} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <CustomerOrderHistory customerId={customerDetail.id} />
      </div>
    </div>
  );
}
