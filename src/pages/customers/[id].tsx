'use client';

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import Loading from "@/components/Loading";
import CustomerDetailHeader from "@/components/customers/CustomerDetailHeader";
import CustomerOrderHistory from "@/components/customers/detail/CustomerOrderHistory";
import CustomerPersonalInfo from "@/components/customers/detail/CustomerPersonalInfo";
import CustomerPointsInfo from "@/components/customers/detail/CustomerPointInfo";
import CustomerPurchaseInfo from "@/components/customers/detail/CustomerPurchaseInfo";
import CustomerSalesInfo from "@/components/customers/detail/CustomerSalesInfo";

interface CustomerDetailProps { }

export interface CustomerDetail {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  branch: string;
  salesChannel: string;
  totalSpent: number;
  totalOrders: number;
  points: number;
}

const CustomerDetailPage: React.FC<CustomerDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [customerDetail, setCustomerDetail] = useState<CustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.push("/customers");
  };

  useEffect(() => {
    if (id) {
      const mockCustomerDetail: CustomerDetail = {
        id: "KH001",
        name: "Nguyễn Văn A",
        phone: "0901234567",
        email: "nguyenvana@123.com",
        status: "VIP",
        branch: "Quận 1",
        salesChannel: "Online",
        totalSpent: 5000000,
        totalOrders: 10,
        points: 1500,
      };
      setCustomerDetail(mockCustomerDetail);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        children={<></>}
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      </Layout>
    );
  }

  if (!customerDetail) {
    return (
      <Layout>
        children={<></>}
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Không tìm thấy thông tin khách hàng.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='absolute top-[75px] left-8'>
        <button onClick={handleBack} className='flex items-center gap-3 hover:underline'>
          <ArrowLeft className="h-4 w-4" />
          <p className='text-sm'>Quay lại</p>
        </button>
      </div>
      <div className="p-8 space-y-6">
        <CustomerDetailHeader customerName={customerDetail.name} customerCode={customerDetail.id} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CustomerPersonalInfo customer={customerDetail} />
          </div>
          <div className="lg:col-span-1">
            <CustomerSalesInfo customerId={customerDetail.id} />
          </div>

          <div className="lg:col-span-2">
            <CustomerPurchaseInfo customerId={customerDetail.id} />
          </div>
          <div className="lg:col-span-1">
            <CustomerPointsInfo points={customerDetail.points} />
          </div>
        </div>
        <CustomerOrderHistory customerId={customerDetail.id} />
      </div>
    </Layout>
  );
};

export default CustomerDetailPage;
