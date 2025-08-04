'use client';

import Layout from '@/components/dashboard/Layout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import SearchBar from '@/components/dashboard/SearchBar';
import RecentOrders from '@/components/dashboard/RecentOrders';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { setIsOpenSearchDialog } from '@/slices/app';
import { useAppSelector } from '@/hooks/redux';
import ExampleItem from '@/components/dashboard/ExampleItem';

const dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const role = useAppSelector(state => state.app.role);
  const isAdmin = role === 'admin';

  useKeyboardShortcut({
    key: 'k',
    callback: () => dispatch(setIsOpenSearchDialog(true)),
    modifier: 'cmd'
  });

  // Mock data for recent orders
  const recentOrders = [
    {
      orderId: "#ORD-001",
      source: "SHOPIFY" as const,
      customerName: "Nguyễn Văn An",
      products: ["Bao da Airpods 4 & Airpods 4 Anc (1)"],
      phone: "0901234567",
      orderDate: "2024-01-15",
      totalAmount: "30.319.000₫",
      status: "completed" as const,
      statusDate: "2024-01-15"
    },
    {
      orderId: "#SP-123",
      source: "SAPO" as const,
      customerName: "Trần Thị Bình",
      products: [
        "Ốp lưng kèm ví - Flip Cover IPhone 16 Pro Max... (1)",
        "Túi đeo chéo dạng hộp Unisex - SOWER M (1)"
      ],
      phone: "0901234567",
      orderDate: "2024-01-15",
      totalAmount: "26.010.000₫",
      status: "pending" as const,
      statusDate: "2024-01-16"
    },
    {
      orderId: "#ORD-002",
      source: "SHOPIFY" as const,
      customerName: "Lê Minh Cường",
      products: ["Ví nam dáng đứng gập 3 Cian V (1)"],
      phone: "0901234567",
      orderDate: "2024-01-15",
      totalAmount: "31.310.000₫",
      status: "completed" as const,
      statusDate: "2024-01-14"
    },
    {
      orderId: "#SP-124",
      source: "SAPO" as const,
      customerName: "Phạm Thị Dung",
      products: ["Ốp lưng nắp gập nam châm IPhone 16 Series - MagCover (1)"],
      phone: "0901234567",
      orderDate: "2024-01-15",
      totalAmount: "28.010.000₫",
      status: "pending" as const,
      statusDate: "2024-01-17"
    },
    {
      orderId: "#ORD-003",
      source: "SAPO" as const,
      customerName: "Hoàng Văn Em",
      products: ["Ví Dài Meron L - Lethnic (1)"],
      phone: "0901234567",
      orderDate: "2024-01-15",
      totalAmount: "14.300.000₫",
      status: "completed" as const,
      statusDate: "2024-01-13"
    }
  ];

  const example = [
    { title: "Mã đơn hàng", content: "VD: ORD-001, SP-123" },
    { title: "Số điện thoại", content: "VD: 0901234567" },
    { title: "Tên khách hàng", content: "VD: Nguyễn Văn A" },
    { title: "Tên sản phẩm", content: "VD: iPhone 15" },
  ]

  const handleViewAll = () => {
    console.log('View all orders clicked');
  };

  return (
    <Layout>
      <div className={`p-8 flex flex-col gap-6`}>
        <DashboardHeader />
        {isAdmin && <SummaryCards />}
        <SearchBar />
        {isAdmin && <RecentOrders orders={recentOrders} onViewAll={handleViewAll} />}
        {!isAdmin && example.length > 0 && <div className='flex justify-center'>
          <div className='w-[75%] grid grid-cols-4 gap-4'>
            {example.map((item, index) => (
              <ExampleItem
                key={index}
                title={item.title}
                content={item.content} />
            ))}
          </div>
        </div>
        }
      </div>
    </Layout>
  );
};

export default dashboard;