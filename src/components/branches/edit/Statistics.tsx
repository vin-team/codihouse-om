import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Branch } from "@/model/Branch.model";
import { formatCurrency } from "@/utils/data.util";

export default function BranchEditStatistics({ branch }: { branch: Branch }) {
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
            <p className="text-2xl font-bold">{branch?.today_order_count || 0}</p>
            <p className="text-sm text-gray-600">Đơn hàng hôm nay</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold">{formatCurrency(branch?.today_revenue?.toString() || '0')}₫</p>
            <p className="text-sm text-gray-600">Doanh thu hôm nay</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold">{branch?.total_customers || 0}</p>
            <p className="text-sm text-gray-600">Tổng khách hàng</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}