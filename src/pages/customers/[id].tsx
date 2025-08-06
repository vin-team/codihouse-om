'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import CustomerDetailHeader from "@/components/customers/CustomerDetailHeader";
import CustomerPersonalInfo from "@/components/customers/detail/CustomerPersonalInfo";
import PurchasingStatistics from "@/components/customers/detail/PurchasingStatistics";
import CustomerOrderHistory from "@/components/customers/detail/CustomerOrderHistory";

export default function CustomerDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  const mockCustomer = {
    id: "KH001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0901234567",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    status: "VIP",
    totalOrders: 12,
    totalSpent: "2,450,000",
    joinDate: "2023-05-15",
    lastOrder: "2024-01-15",
    orderHistory: [
      {
        id: "DH001234",
        date: "2024-01-15",
        branch: "Quận 1",
        amount: "450,000",
        status: "Đang xử lý",
        products: ["Áo thun basic", "Quần jean slim"]
      },
      {
        id: "DH001123",
        date: "2024-01-10",
        branch: "Quận 1",
        amount: "320,000",
        status: "Hoàn thành",
        products: ["Áo khoác"]
      },
      {
        id: "DH001050",
        date: "2024-01-08",
        branch: "Quận 7",
        amount: "680,000",
        status: "Hoàn thành",
        products: ["Áo sơ mi", "Chân váy"]
      },
      {
        id: "DH000934",
        date: "2024-01-05",
        branch: "Online",
        amount: "1,200,000",
        status: "Hoàn thành",
        products: ["Áo dạ hội", "Giày cao gót"]
      }
    ],
  }


  useEffect(() => {
    if (id) {
      setCustomer(mockCustomer);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <div className="min-h-full flex flex-col gap-4">
        <CustomerDetailHeader customer={customer} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CustomerPersonalInfo customer={customer} />
          </div>
          <div className="lg:col-span-1">
            <PurchasingStatistics customer={customer} />
          </div>
        </div>
        <CustomerOrderHistory customer={customer} />
      </div>
    </div>
  );
}