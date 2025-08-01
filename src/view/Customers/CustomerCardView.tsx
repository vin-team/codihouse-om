import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export interface Customer {
  code: string
  name: string
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

export function CustomerCardView({ customer }: Props) {
  return (
    <Card>
      <CardContent className="p-4 space-y-1 text-sm text-gray-700">
        <div className="font-semibold">{customer.name}</div>
        <div className="text-xs text-muted-foreground">Mã KH: {customer.code}</div>
        <div>📞 {customer.phone}</div>
        <div>✉️ {customer.email}</div>
        <div>Nhóm: <Badge>{customer.group}</Badge></div>
        <div>
          Tổng chi tiêu: {customer.totalSpend.toLocaleString()}₫ – Đơn hàng: {customer.orders}
        </div>
        <div>Điểm tích lũy: {customer.points}</div>
        <div>Mua cuối: {customer.lastPurchase}</div>
        <div className="text-right">
          <Link href={`/customers/${customer.code}`}>
            <Button variant="outline" size="sm">Xem</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
