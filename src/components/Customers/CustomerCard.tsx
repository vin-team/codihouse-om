import { Customer } from "@/Data/Customers"
import { Card, CardContent } from "@/components/ui/card"
import { Eye } from "lucide-react"

export function CustomerCardView({ customer }: { customer: Customer }) {
  return (
    <Card className="flex justify-between items-center px-4 py-3">
      <CardContent className="p-0 space-y-1">
        <div className="font-semibold text-lg">{customer.name}</div>
        <div className="text-sm text-muted-foreground">{customer.phone} • {customer.email}</div>
        <div className="text-sm">
          Tổng chi tiêu: {customer.totalSpend.toLocaleString()}₫ — Đơn hàng: {customer.orders} — Điểm tích lũy: {customer.points}
        </div>
        <div className="text-sm">Nhóm: {customer.group}</div>
      </CardContent>
      <div className="text-sm text-muted-foreground text-right space-y-2">
        <div>Mua cuối: {customer.lastPurchase}</div>
        <button className="text-blue-600 flex items-center gap-1 hover:underline">
          <Eye size={16} /> Xem
        </button>
      </div>
    </Card>
  )
}


