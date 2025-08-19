"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Branch } from "@/model/Branch.model";
import { getOrderCountByBranch, getStatisticsByBranchAndDate, setFilter } from "@/slices/orderSlice";
import { formatCurrency } from "@/utils/data.util";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BranchEditStatistics({ branch }: { branch: Branch }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const statistics = useAppSelector(state => state.order.statistics);

  const handleClick = () => {
    dispatch(setFilter({ branch: branch.id.toString() }))
    router.push(`/orders`);
  }

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    if (branch.id) {
      dispatch(getStatisticsByBranchAndDate({ branch_id: branch.id, year: year, month: month, day: day }));
      dispatch(getOrderCountByBranch({ branch_id: branch.id }));
    }
  }, [branch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className='text-xl font-medium'>Thống kê chi nhánh</span>
        </CardTitle>
        <CardDescription>Thông tin hoạt động của chi nhánh</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button role="button" onClick={handleClick} className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold">{statistics?.totalOrders || 0}</p>
            <p className="text-sm text-gray-600">Tổng số đơn hàng</p>
          </button>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold">{statistics?.totalOrdersToday || 0}</p>
            <p className="text-sm text-gray-600">Đơn hàng hôm nay</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold">{formatCurrency(statistics?.totalRevenue?.toString() || '0')} ₫</p>
            <p className="text-sm text-gray-600">Doanh thu hôm nay</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold">{statistics?.totalCustomers || 0}</p>
            <p className="text-sm text-gray-600">Tổng khách hàng</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}