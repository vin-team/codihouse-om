import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PurchasingStatistics({ customer }: { customer: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className='text-xl font-medium'>Thống kê mua hàng</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Tổng đơn hàng</p>
            <p className="text-2xl font-bold text-blue-600">{customer.totalOrders}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Tổng chi tiêu</p>
            <p className="text-2xl font-bold text-green-600">{customer.totalSpent}₫</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Đơn hàng cuối</p>
            <p className="text-lg">{customer.lastOrder}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Giá trị trung bình</p>
            <p className="text-lg font-semibold">
              {Math.round(parseInt(customer.totalSpent.replace(',', '')) / customer.totalOrders).toLocaleString()}₫
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 