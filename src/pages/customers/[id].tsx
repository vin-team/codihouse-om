'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import CustomerDetailHeader from "@/components/customers/CustomerDetailHeader";
import CustomerPersonalInfo from "@/components/customers/detail/CustomerPersonalInfo";
import PurchasingStatistics from "@/components/customers/detail/PurchasingStatistics";
import CustomerOrderHistory from "@/components/customers/detail/CustomerOrderHistory";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCustomer } from "@/slices/customerSlice";
import { useToastContext } from "@/contexts/ToastContext";

export default function CustomerDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const { error } = useToastContext();

  const requestState = useAppSelector(state => state.customer.requestState);
  const customer = useAppSelector(state => state.customer.customer);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(getCustomer(id as string));
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (requestState?.type === 'getCustomer') {
      switch (requestState.status) {
        case 'loading':
          setLoading(true);
          break;
        case 'completed':
          setLoading(false);
          break;
        case 'failed':
          error(requestState.error || 'Không tìm thấy khách hàng');
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000)
          break;
      }
    }
  }, [requestState])

  if (loading || !customer) {
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