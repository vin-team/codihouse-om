import { CustomerPersonalInfo } from "./customers/Details/CustomerPersonalInfo"
import { CustomerSalesInfo } from "./customers/Details/CustomerSalesInfo"
import { CustomerPointsInfo } from "./customers/Details/CustomerPointInfo"
import { CustomerOrderHistory } from "./customers/Details/Customerorderhistory"
import { CustomerPurchaseInfo } from "./customers/Details/CustomerPurchaseInfo"
import { Button } from "./ui/button"

export function CustomerDetailView() {
  <main className="px-8 py-6 space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Bùi Thị Hạnh</h1>
        <p className="text-sm text-muted-foreground">Mã khách hàng: CUSN12185</p>
      </div>
      <Button variant="outline" size="sm">
        Cập nhật
      </Button>
    </div>

    {/* Thông tin chi tiết */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CustomerPersonalInfo />
      <CustomerPointsInfo />
    </div>

    {/* Thông tin mua hàng */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CustomerPurchaseInfo totalSpending={""} totalOrders={0} totalProducts={0} totalReturnedProducts={0} lastPurchaseDate={""} currentDebt={""} />
      <CustomerOrderHistory />
    </div>
  </main>
}