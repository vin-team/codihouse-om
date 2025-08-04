// src/components/customer/CustomerPurchaseInfo.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomerPurchaseInfoProps {
  totalSpending: string
  totalOrders: number
  totalProducts: number
  totalReturnedProducts: number
  lastPurchaseDate: string
  currentDebt: string
}

export function CustomerPurchaseInfo({
  totalSpending,
  totalOrders,
  totalProducts,
  totalReturnedProducts,
  lastPurchaseDate,
  currentDebt,
}: CustomerPurchaseInfoProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Thông tin mua hàng</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <div>
          <p className="text-muted-foreground">Tổng chi tiêu</p>
          <p className="text-foreground font-medium">{totalSpending}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Tổng SL sản phẩm đã mua</p>
          <p className="text-foreground font-medium">{totalProducts}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Tổng SL đơn hàng</p>
          <p className="text-foreground font-medium">{totalOrders}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Tổng SL sản phẩm hoàn trả</p>
          <p className="text-foreground font-medium">{totalReturnedProducts}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Ngày cuối cùng mua hàng</p>
          <p className="text-foreground font-medium">{lastPurchaseDate}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Công nợ hiện tại</p>
          <p className="text-foreground font-medium">{currentDebt}</p>
        </div>
      </CardContent>
    </Card>
  )
}
