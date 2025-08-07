'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderHeader from '@/components/orders/OrderHeader';
import OrderInformation from '@/components/orders/OrderInformation';
import CustomerInformation from '@/components/orders/CustomerInformation';
import Loading from '@/components/Loading';
import DeliveryInformation from '@/components/orders/DeliveryInfor';
import Products from '@/components/orders/Products';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getOrder } from '@/slices/orderSlice';
import { roleService } from '@/services/role.service';

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const isAdmin = roleService.isAdmin();

  const order = useAppSelector(state => state.order.order);
  const actionState = useAppSelector(state => state.order.actionState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(getOrder(id as string));
    }
  }, [id]);

  useEffect(() => {
    if (actionState.type === 'getOrder') {
      switch (actionState.status) {
        case 'loading':
          setLoading(true);
          break;
        case 'completed':
          setLoading(false);
          break;
        case 'failed':
          if (isAdmin) {
            router.push('/orders');
          } else {
            router.push('/dashboard');
          }
          break;
      }
    }
  }, [actionState]);

  if (loading || !order) {
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

          {order?.shipping_address ? <>
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
}