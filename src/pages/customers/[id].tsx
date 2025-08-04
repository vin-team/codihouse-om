import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { ArrowLeft, Pencil } from "lucide-react";
import { CustomerPersonalInfo } from "@/components/customers/Details/CustomerPersonalInfo";
import { CustomerPointsInfo } from "@/components/customers/Details/CustomerPointInfo";
import { CustomerOrderHistory } from "@/components/customers/Details/Customerorderhistory";
import { CustomerPurchaseInfo } from "@/components/customers/Details/CustomerPurchaseInfo";
import { CustomerSalesInfo } from "@/components/customers/Details/CustomerSalesInfo";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";

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
        <div className="flex items-center justify-center h-screen w-full max">
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
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          {/* Cột trái: Mũi tên + Tên + ID */}
          <div>
            <button onClick={handleBack} className="flex items-center gap-1 text-sm text-muted-foreground mb-1 hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </button>
            <h1 className="text-xl font-semibold">{customerDetail.name}</h1>
            <p className="text-sm text-muted-foreground">Mã khách hàng: {customerDetail.id}</p>
          </div>

          {/* Cột phải: Nút cập nhật */}
          <Button variant="outline" className="gap-2 h-9">
            <Pencil className="w-4 h-4" />
            Cập nhật
          </Button>
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

        {/* Row 3: Lịch sử mua hàng (full width) */}
        <div className="grid grid-cols-1 gap-6">
          <CustomerOrderHistory customerId={customerDetail.id} />
        </div>
      </div>
    </Layout >
  );
};

export default CustomerDetailPage;
