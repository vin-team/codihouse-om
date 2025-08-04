'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import SearchBar from '@/components/dashboard/SearchBar';
import RecentOrders, { Order } from '@/components/dashboard/RecentOrders';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { setIsOpenSearchDialog } from '@/slices/app';
import { useAppSelector } from '@/hooks/redux';
import ExampleItem from '@/components/dashboard/ExampleItem';
import Layout from '@/components/Layout';

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
  const recentOrders: Order[] = [
    {
      id: "DH001234",
      customer: "Nguyễn Văn A",
      customerPhone: "0901234567",
      customerEmail: "nguyenvana@email.com",
      branch: "Quận 1",
      salesChannel: "-",
      amount: "450,000",
      status: "Đang xử lý",
      date: "2024-01-15",
      time: "08:30",
      note: "Khách yêu cầu giao hàng nhanh",
      products: [
        { name: "Áo thun basic", price: 150000, quantity: 2, total: 300000 },
        { name: "Quần jean slim", price: 250000, quantity: 1, total: 250000 }
      ],
      subtotal: 550000,
      discount: 100000,
      finalAmount: 450000
    },
    {
      id: "DH001235",
      customer: "Trần Thị B",
      customerPhone: "0907654321",
      customerEmail: "tranthib@email.com",
      branch: "Online",
      salesChannel: "Facebook",
      amount: "680,000",
      status: "Hoàn thành",
      date: "2024-01-15",
      time: "09:15",
      note: "Đã thanh toán COD",
      products: [
        { name: "Áo sơ mi", price: 280000, quantity: 1, total: 280000 },
        { name: "Chân váy", price: 200000, quantity: 2, total: 400000 }
      ],
      subtotal: 680000,
      discount: 0,
      finalAmount: 680000
    },
    {
      id: "DH001236",
      customer: "Lê Văn C",
      customerPhone: "0912345678",
      customerEmail: "levanc@email.com",
      branch: "Quận 7",
      salesChannel: "-",
      amount: "320,000",
      status: "Chờ thanh toán",
      date: "2024-01-15",
      time: "10:00",
      note: "Khách đặt cọc 50%",
      products: [
        { name: "Áo khoác", price: 320000, quantity: 1, total: 320000 }
      ],
      subtotal: 320000,
      discount: 0,
      finalAmount: 320000
    },
    {
      id: "DH001237",
      customer: "Phạm Thị D",
      customerPhone: "0987654321",
      customerEmail: "phamthid@email.com",
      branch: "Online",
      salesChannel: "Zalo",
      amount: "890,000",
      status: "Hoàn thành",
      date: "2024-01-15",
      time: "10:30",
      note: "",
      products: [
        { name: "Áo len", price: 350000, quantity: 1, total: 350000 },
        { name: "Quần tây", price: 450000, quantity: 1, total: 450000 },
        { name: "Giày thể thao", price: 90000, quantity: 1, total: 90000 }
      ],
      subtotal: 890000,
      discount: 0,
      finalAmount: 890000
    },
    {
      id: "DH001238",
      customer: "Hoàng Văn E",
      customerPhone: "0965432109",
      customerEmail: "hoangvane@email.com",
      branch: "Online",
      salesChannel: "Website",
      amount: "1,200,000",
      status: "Đã hủy",
      date: "2024-01-15",
      time: "11:00",
      note: "Khách hàng hủy do thay đổi ý kiến",
      products: [
        { name: "Áo dạ hội", price: 800000, quantity: 1, total: 800000 },
        { name: "Giày cao gót", price: 400000, quantity: 1, total: 400000 }
      ],
      subtotal: 1200000,
      discount: 0,
      finalAmount: 1200000
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
        {/* {isAdmin && <SummaryCards />} */}
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