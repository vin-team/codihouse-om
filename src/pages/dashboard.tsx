import Layout from '@/components/dashboard/Layout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import SearchBar from '@/components/dashboard/SearchBar';
import RecentOrders from '@/components/dashboard/RecentOrders';
import React from 'react';

interface dashboardProps {
  // Define props here
}

const dashboard: React.FC<dashboardProps> = ({ }) => {
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

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    // Implement search logic here
  };

  const handleViewAll = () => {
    console.log('View all orders clicked');
    // Implement navigation to orders page
  };

  return (
    <Layout>
      <div className="p-8">
        <DashboardHeader />
        <SummaryCards />
        <SearchBar onSearch={handleSearch} />
        <RecentOrders orders={recentOrders} onViewAll={handleViewAll} />
      </div>
    </Layout>
  );
};

export default dashboard;