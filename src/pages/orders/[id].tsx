'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import OrderHeader from '@/components/orders/OrderHeader';
import OrderInformation from '@/components/orders/OrderInformation';
import CustomerInformation from '@/components/orders/CustomerInformation';
import Loading from '@/components/Loading';
import DeliveryInformation from '@/components/orders/DeliveryInfor';
import Products from '@/components/orders/Products';

const OrderDetailPage: React.FC = () => {
  const order = {
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
  }

  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Get order detail from backend
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (<Loading />);
  }

  return (
    <div>
      <div className="min-h-full flex flex-col gap-4">
        <OrderHeader order={order} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrderInformation order={order} />
          </div>
          <div className="lg:col-span-1">
            <CustomerInformation order={order} />
          </div>

          {order.requiresShipping ? <>
            <div className="lg:col-span-2">
              <Products order={order} />
            </div>

            <div className="lg:col-span-1">
              <DeliveryInformation order={order} />
            </div>
          </> : <div className='lg:col-span-3'>
            <Products order={order} />
          </div>}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage; 