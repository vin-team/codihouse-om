export function CustomerOrderHistory({ customerId }: { customerId: string }) {
  const orders = [
    {
      id: "#ORD-001",
      date: "2024-01-15",
      amount: "30.319.000₫",
      status: "Hoàn thành"
    }
  ]

  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="text-base font-medium">Lịch sử mua hàng</div>
        <button className="text-sm text-blue-600 hover:underline">Cập nhật</button>
      </div>

      <div className="text-sm text-muted-foreground space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between">
            <div>
              <div className="text-black font-medium">{order.id}</div>
              <div className="text-muted-foreground text-xs">{order.date}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-black font-semibold">{order.amount}</div>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-black">
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerOrderHistory;