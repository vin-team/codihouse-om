'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { CustomerCard, Customer } from "@/components/Customers/CustomerCard"
import Layout from '@/components/dashboard/Layout'

const customers = [
  {
    name: 'Bùi Thị Hạnh',
    code: 'CUSN12185',
    phone: '0904500014',
    email: 'trantientoan@email.com',
    group: 'Bán lẻ',
    totalSpend: 979000,
    orders: 2,
    points: 97,
    lastPurchase: '2024-01-15',
  },
  {
    name: 'Nguyễn Thị Lan',
    code: 'CUSN12186',
    phone: '0987654321',
    email: 'nguyenthilian@email.com',
    group: 'Bán sỉ',
    totalSpend: 1250000,
    orders: 5,
    points: 245,
    lastPurchase: '2024-01-18',
  },
  {
    name: 'Lê Minh Cường',
    code: 'CUSN12187',
    phone: '0912345678',
    email: 'leminhcuong@email.com',
    group: 'Bán lẻ',
    totalSpend: 31310000,
    orders: 1,
    points: 156,
    lastPurchase: '2024-01-14',
  },
]

export default function CustomerListPage() {
  return (
    <Layout children={<>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Danh sách khách hàng</h1>
        </div>

        {/* Bộ lọc */}
        <div className="flex flex-col md:flex-row gap-4">
          <Input placeholder="Tìm theo tên, SDT, mã khách hàng, email..." />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tất cả nhóm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả nhóm</SelectItem>
              <SelectItem value="retail">Bán lẻ</SelectItem>
              <SelectItem value="wholesale">Bán sỉ</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tất cả hạng thẻ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả hạng thẻ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Kết quả */}
        <div className="text-sm text-muted-foreground">
          Kết quả ({customers.length} khách hàng)
        </div>

        {/* Danh sách khách hàng */}
        <div className="space-y-4">
          {customers.map((c) => (
            <><CustomerCard key={c.code} customer={c} /><Card key={c.code} className="p-4">
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
            </Card></>
          ))}
        </div>
      </div>
    </>} />
  )
}