'use client';

import Layout from '@/components/Layout';
import React from 'react';
import CustomerPersonalInfo from '@/components/customers/Details/CustomerPersonalInfo';
import CustomerSalesInfo from '@/components/customers/Details/CustomerSalesInfo';
import CustomerPointsInfo from '@/components/customers/Details/CustomerPointInfo';
import CustomerOrderHistory from '@/components/customers/Details/Customerorderhistory';
import CustomerPurchaseInfo from '@/components/customers/Details/CustomerPurchaseInfo';
import { useRouter } from 'next/dist/client/components/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';

interface CustomerDetailProps {}

export function CustomerDetailView({
  customerDetail
}: {
  customerDetail: any;
}) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Layout>
  <div className="px-8 py-6 max-w-screen-xl mx-auto space-y-6">
    {/* Header */}
    <div className="flex items-center gap-3">
      <button onClick={handleBack} className="text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="text-2xl font-bold">Chi tiết khách hàng</h1>
    </div>

    {/* Row 1: Thông tin cá nhân | Gợi ý bán hàng */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CustomerPersonalInfo customer={customerDetail} />
      <CustomerSalesInfo customerId={customerDetail.id} />
    </div>

    {/* Row 2: Thông tin mua hàng | Thông tin tích điểm */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CustomerPurchaseInfo customerId={customerDetail.id} />
      <CustomerPointsInfo points={customerDetail.points} />
    </div>

    {/* Row 3: Lịch sử mua hàng */}
    <div className="grid grid-cols-1 gap-6">
      <CustomerOrderHistory customerId={customerDetail.id} />
    </div>
  </div>
</Layout>
  );
}