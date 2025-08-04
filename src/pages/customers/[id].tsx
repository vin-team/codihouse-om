import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import { CustomerPersonalInfo } from "@/components/customers/Details/CustomerPersonalInfo";
import { CustomerPointsInfo } from "@/components/customers/Details/CustomerPointInfo";
import { CustomerOrderHistory } from "@/components/customers/Details/Customerorderhistory";
import { CustomerPurchaseInfo } from "@/components/customers/Details/CustomerPurchaseInfo";
import { CustomerSalesInfo } from "@/components/customers/Details/CustomerSalesInfo";
import Loading from "@/components/Loading";

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
    router.push('/customers');
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
      <div className="p-8">
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="text-gray-600 hover:text-gray-900 mr-4">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Chi tiết khách hàng</h1>
        </div>
        <CustomerPersonalInfo customer={customerDetail} />
        <CustomerPointsInfo points={customerDetail.points} />
        <CustomerOrderHistory customerId={customerDetail.id} />
        <CustomerPurchaseInfo customerId={customerDetail.id} />
        <CustomerSalesInfo customerId={customerDetail.id} />
      </div>
    </Layout>
  )
}
export default CustomerDetailPage; 