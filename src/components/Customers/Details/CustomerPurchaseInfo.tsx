export function CustomerPurchaseInfo({ customerId }: { customerId: string }) {
  // Dữ liệu tạm
  const info = {
    totalSpent: "979.000₫",
    totalOrders: 2,
    totalProducts: 3,
    totalReturns: 0,
    lastPurchase: "2024-01-15",
    debt: "0₫"
  }

  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="text-base font-medium">Thông tin mua hàng</div>
        <button className="text-sm text-blue-600 hover:underline">Cập nhật</button>
      </div>

      <div className="text-sm text-muted-foreground grid grid-cols-2 gap-y-3">
        <div>
          <div className="text-[13px]">Tổng chi tiêu</div>
          <div className="text-black">{info.totalSpent}</div>
        </div>
        <div>
          <div className="text-[13px]">Tổng SL sản phẩm đã mua</div>
          <div className="text-black">{info.totalProducts}</div>
        </div>
        <div>
          <div className="text-[13px]">Tổng SL đơn hàng</div>
          <div className="text-black">{info.totalOrders}</div>
        </div>
        <div>
          <div className="text-[13px]">Tổng SL sản phẩm hoàn trả</div>
          <div className="text-black">{info.totalReturns}</div>
        </div>
        <div>
          <div className="text-[13px]">Ngày cuối cùng mua hàng</div>
          <div className="text-black">{info.lastPurchase}</div>
        </div>
        <div>
          <div className="text-[13px]">Công nợ hiện tại</div>
          <div className="text-black">{info.debt}</div>
        </div>
      </div>
    </div>
  )
}


export default CustomerPurchaseInfo;