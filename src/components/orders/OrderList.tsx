'use client';

import React from 'react';
import OrderItem from './OrderItem';
import Pagination from './Pagination';

interface OrderListProps { }

const OrderList: React.FC<OrderListProps> = ({ }) => {
  const orders = [
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

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">1356 đơn hàng</h2>
      </div>

      <div className="p-6 space-y-4">
        {orders.map((order, index) => (
          <OrderItem
            key={index}
            orderId={order.orderId}
            source={order.source}
            customerName={order.customerName}
            products={order.products}
            phone={order.phone}
            orderDate={order.orderDate}
            totalAmount={order.totalAmount}
            status={order.status}
            statusDate={order.statusDate}
          />
        ))}
      </div>

      <div className="pb-6 flex justify-center">
        <Pagination />
      </div>
    </div>
  );
};

export default OrderList;