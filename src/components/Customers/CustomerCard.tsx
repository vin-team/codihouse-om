import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export interface Customer {
  name: string
  code: string
  phone: string
  email: string
  group: string
  totalSpend: number
  orders: number
  points: number
  lastPurchase: string
}

interface Props {
  customer: Customer
}

export function CustomerCard({ customer }: Props) {
  return (
    <Card className="p-4">
      <CardContent className="p-0 flex flex-col md:flex-row md:items-center justify-between">
        <div className="space-y-1">
          <div className="font-semibold text-base">
            {customer.name}
            <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">
              {customer.code}
            </span>
          </div>
          <div className="text-sm text-gray-600 flex flex-col md:flex-row md:items-center md:gap-4">
            <div>📞 {customer.phone}</div>
            <div>✉️ {customer.email}</div>
          </div>
          <div className="text-sm text-gray-600 flex gap-4">
            <div>Tổng chi tiêu: {customer.totalSpend.toLocaleString()}₫</div>
            <div>Đơn hàng: {customer.orders}</div>
            <div>Điểm tích lũy: {customer.points}</div>
          </div>
          <div className="text-sm text-gray-600">Nhóm: {customer.group}</div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col items-end text-sm text-gray-600">
          <div className="mb-2">Mua cuối: {customer.lastPurchase}</div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Eye className="w-4 h-4" /> Xem
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
