'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import OrderHeader from '@/components/orders/OrderHeader';
import OrderInformation from '@/components/orders/OrderInformation';
import CustomerInformation from '@/components/orders/CustomerInformation';
import Product from '@/components/orders/Product';
import History from '@/components/orders/History';
import Loading from '@/components/Loading';

interface OrderDetailProps { }

export interface OrderDetail {
  id: string,
  customer: string,
  customerId: string,
  customerPhone: string,
  customerEmail: string,
  customerStatus: string,
  branch: string,
  salesChannel: string,
  status: string,
  date: string,
  time: string,
  note: string,
  shippingAddress: {
    recipientName: string,
    recipientPhone: string,
    address: string
  },
  requiresShipping: true,
  products: { name: string, price: number, quantity: number, total: number }[],
  subtotal: number,
  discount: number,
  finalAmount: number
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
        id: "DH001234",
        customer: "Nguyễn Văn A",
        customerId: "KH001",
        customerPhone: "0901234567",
        customerEmail: "nguyenvana@email.com",
        customerStatus: "VIP",
        branch: "Quận 1",
        salesChannel: "-",
        status: "Đang xử lý",
        date: "2024-01-15",
        time: "08:30",
        note: "Khách yêu cầu giao hàng nhanh",
        shippingAddress: {
          recipientName: "Nguyễn Thị Mai",
          recipientPhone: "0912345678",
          address: "456 Lê Lợi, Quận 1, TP.HCM"
        },
        requiresShipping: true,
        products: [
          { name: "Áo thun basic", price: 150000, quantity: 2, total: 300000 },
          { name: "Quần jean slim", price: 250000, quantity: 1, total: 250000 }
        ],
        subtotal: 550000,
        discount: 100000,
        finalAmount: 450000
      };

      setOrderDetail(mockOrderDetail);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Loading />
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
      <div className='absolute top-[75px] left-8'>
        <button onClick={handleBack} className='flex items-center gap-3 hover:underline'>
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