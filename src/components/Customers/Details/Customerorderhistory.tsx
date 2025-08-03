import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CustomerOrderHistory() {
  return (
    <Card className="p-6">
      <CardHeader className="p-0 mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Lịch sử mua hàng</h3>
        <Button variant="link" size="sm">Cập nhật</Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-center justify-between text-sm py-2 border rounded-md px-4">
          <div className="flex flex-col">
            <span className="font-medium">#ORD-001</span>
            <span className="text-muted-foreground text-xs">2024-01-15</span>
          </div>
          <div className="text-right">
            <p className="font-medium">30.319.000₫</p>
            <span className="text-xs bg-green-100 text-green-700 rounded px-2 py-0.5">Hoàn thành</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
