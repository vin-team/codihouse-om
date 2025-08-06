import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function BranchEditStatistics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className='text-xl font-medium'>Thống kê chi nhánh</span>
        </CardTitle>
        <CardDescription>Thông tin hoạt động của chi nhánh</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold">45</p>
            <p className="text-sm text-gray-600">Đơn hàng hôm nay</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold">12.5M</p>
            <p className="text-sm text-gray-600">Doanh thu hôm nay</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold">234</p>
            <p className="text-sm text-gray-600">Tổng khách hàng</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}