import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function DeliveryInformation({ order }: { order: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin giao hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Người nhận</p>
          <p className="text-lg">{order.shippingAddress.recipientName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Số điện thoại</p>
          <p className="text-lg">{order.shippingAddress.recipientPhone}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Địa chỉ nhận hàng</p>
          <p className="text-lg">{order.shippingAddress.address}</p>
        </div>
      </CardContent>
    </Card>
  );
}