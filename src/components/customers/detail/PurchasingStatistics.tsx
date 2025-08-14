import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Customer } from "@/model/Customer.model";
import { getStatisticsByCustomer } from "@/slices/orderSlice";
import { formatCurrency } from "@/utils/data.util";
import { useEffect } from "react";

export default function PurchasingStatistics({ customer }: { customer: Customer }) {
  const dispatch = useAppDispatch();
  const statisticsByCustomer = useAppSelector(state => state.order.statisticsByCustomer);

  useEffect(() => {
    if (customer.id) {
      dispatch(getStatisticsByCustomer({ customer_id: customer.id }));
    }
  }, [customer])

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
            <p className="text-2xl font-bold text-blue-600">{customer.total_order || 0}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Tổng chi tiêu</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(customer.total_expenditure.toString() || '0')}₫</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Đơn hàng cuối</p>
            <p className="text-lg">{customer.orders && customer.orders.length > 0 ? customer.orders[0].code : '-'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Giá trị trung bình</p>
            <p className="text-lg font-semibold">
              {formatCurrency(statisticsByCustomer.averagePrice.toString() || '0')} ₫
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 