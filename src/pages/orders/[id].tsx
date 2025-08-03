'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/dashboard/Layout';
import { ArrowLeft } from 'lucide-react';
import OrderHeader from '@/components/orders/OrderHeader';
import OrderInformation from '@/components/orders/OrderInformation';
import CustomerInformation from '@/components/orders/CustomerInformation';
import Product from '@/components/orders/Product';
import History from '@/components/orders/History';

interface OrderDetailProps { }

export interface OrderDetail {
  id: string;
  orderDate: string;
  packingCode: string;
  soldAt: string;
  salesDate: string;
  platform: string;
  status: string;
  deliveryMethod: string;
  soldBy: string;
  salesChannel: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    group: string;
    totalSpending: string;
  };
  products: Array<{
    name: string;
    quantity: number;
    price: string;
    total: string;
  }>;
  summary: {
    subtotal: string;
    shippingFee: string;
    total: string;
  };
  history: Array<{
    action: string;
    date: string;
    status: 'completed' | 'pending' | 'created';
  }>;
}

const OrderDetailPage: React.FC<OrderDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.push('/orders');
  };

  useEffect(() => {
    if (id) {
      const mockOrderDetail: OrderDetail = {
        id: id as string,
        orderDate: '2024-01-15',
        packingCode: 'FUN86833',
        soldAt: 'LETHNIC QUANG TRUNG',
        salesDate: '23/05/2025 11:17',
        platform: 'Shopify',
        status: 'Hoàn thành',
        deliveryMethod: 'Nhận tại cửa hàng',
        soldBy: 'Lethnic Gò Vấp - Ca Sáng (Ngọc Yến)',
        salesChannel: 'POS',
        customer: {
          name: 'Nguyễn Văn An',
          phone: '0901234567',
          address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
          group: 'Bán lẻ',
          totalSpending: '979.000₫'
        },
        products: [
          {
            name: 'iPhone 15 Pro Max',
            quantity: 1,
            price: '29.990.000₫',
            total: '29.990.000₫'
          },
          {
            name: 'Ốp lưng iPhone 15 Pro Max',
            quantity: 1,
            price: '299.000₫',
            total: '299.000₫'
          }
        ],
        summary: {
          subtotal: '30.289.000₫',
          shippingFee: '0₫',
          total: '30.289.000₫'
        },
        history: [
          {
            action: 'Đơn hàng được tạo',
            date: '2024-01-15',
            status: 'created'
          },
          {
            action: 'Đơn hàng hoàn thành',
            date: '2 ngày trước',
            status: 'completed'
          }
        ]
      };

      setOrderDetail(mockOrderDetail);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  if (!orderDetail) {
    return (
      <Layout>
        <div className="p-8">
          <h1>Không tìm thấy đơn hàng</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='absolute top-[72px] left-8'>
        <button onClick={handleBack} className='flex items-center gap-3'>
          <ArrowLeft className="h-4 w-4" />
          <p className='text-sm'>Quay lại</p>
        </button>
      </div>
      <div className="p-8 space-y-6">
        <OrderHeader orderDetail={orderDetail} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrderInformation orderDetail={orderDetail} />
          </div>
          <div className="lg:col-span-1">
            <CustomerInformation orderDetail={orderDetail} />
          </div>

          <div className="lg:col-span-2">
            <Product orderDetail={orderDetail} />
          </div>
          <div className="lg:col-span-1">
            <History orderDetail={orderDetail} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailPage; 