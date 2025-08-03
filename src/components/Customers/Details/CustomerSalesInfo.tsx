import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CustomerSalesInfo() {
  return (
    <Card className="p-6">
      <CardHeader className="p-0 mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Thông tin mua hàng</h3>
        <Button variant="link" size="sm">Cập nhật</Button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm p-0">
        <div><p className="text-muted-foreground">Tổng chi tiêu</p><p>979.000₫</p></div>
        <div><p className="text-muted-foreground">Tổng SL sản phẩm đã mua</p><p>3</p></div>
        <div><p className="text-muted-foreground">Tổng SL đơn hàng</p><p>2</p></div>
        <div><p className="text-muted-foreground">Tổng SL sản phẩm hoàn trả</p><p>0</p></div>
        <div><p className="text-muted-foreground">Ngày cuối cùng mua hàng</p><p>2024-01-15</p></div>
        <div><p className="text-muted-foreground">Công nợ hiện tại</p><p>0₫</p></div>
      </CardContent>
    </Card>
  )
}
