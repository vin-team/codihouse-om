import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Order } from "@/model/Order.model";

export default function DeliveryInformation({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin giao hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Người nhận</p>
          <p className="text-lg">{order.shipping_address?.name || '-'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Số điện thoại</p>
          <p className="text-lg">{order.shipping_address?.phone || '-'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Địa chỉ nhận hàng</p>
          <p className="text-lg">{order.shipping_address?.address || '-'}</p>
        </div>
      </CardContent>
    </Card>
  );
}