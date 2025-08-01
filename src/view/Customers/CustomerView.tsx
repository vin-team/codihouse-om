'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Customer, CustomerListView } from "./CustomerListView"

const mockData: Customer[] = [
  {
    code: "CUSN12185",
    name: "Bùi Thị Hạnh",
    phone: "0904500014",
    email: "trantientoan@email.com",
    group: "Bán lẻ",
    totalSpend: 979000,
    orders: 2,
    points: 97,
    lastPurchase: "2024-01-15"
  },
  // thêm dữ liệu mẫu khác nếu cần
]

export function CustomersView() {
  const [query, setQuery] = useState("")
  const filtered = mockData.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.email.toLowerCase().includes(query.toLowerCase()) ||
    c.phone.includes(query)
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Danh sách khách hàng</h1>
        <p className="text-sm text-muted-foreground">Quản lý thông tin khách hàng</p>
      </div>

      {/* Tìm kiếm và lọc */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Tìm theo tên, email, SĐT..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
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
      </div>

      <div className="text-sm text-muted-foreground">
        Kết quả: {filtered.length} khách hàng
      </div>

      <CustomerListView customers={filtered} />
    </div>
  )
}
