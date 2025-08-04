'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import Layout from '@/components/dashboard/Layout'
import CustomersHeader from '@/components/customers/CustomersHeader';
import FilterCustomers from '@/components/customers/FilterCustomers';
import CustomerList from '@/components/customers/CustomerList';

export default function CustomerListPage() {
  return (
    <Layout>
      <div className="p-8 flex flex-col gap-6">
        <CustomersHeader />
        <FilterCustomers />
        <CustomerList />

        {/* Danh sách khách hàng */}
        {/* <div className="space-y-4">
          {customers.map((c) => (
            <Card key={c.code} className="p-4">
              <CardContent className="p-0 flex flex-col md:flex-row md:items-center justify-between">
                <div className="space-y-1">
                  <div className="font-semibold text-base">
                    {c.name} <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">{c.code}</span>
                  </div>
                  <div className="text-sm text-gray-600 flex flex-col md:flex-row md:items-center md:gap-4">
                    <div>📞 {c.phone}</div>
                    <div>✉️ {c.email}</div>
                  </div>
                  <div className="text-sm text-gray-600 flex gap-4">
                    <div>Tổng chi tiêu: {c.totalSpend.toLocaleString()}₫</div>
                    <div>Đơn hàng: {c.orders}</div>
                    <div>Điểm tích lũy: {c.points}</div>
                  </div>
                  <div className="text-sm text-gray-600">Nhóm: {c.group}</div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-end text-sm text-gray-600">
                  <div className="mb-2">Mua cuối: {c.lastPurchase}</div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> Xem
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}
      </div>
    </Layout>
  )
}