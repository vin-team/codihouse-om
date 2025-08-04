export function CustomerSalesInfo({ customerId }: { customerId: string }) {
  // Dữ liệu tạm
  const sales = {
    pricePolicy: "Giá bán lẻ",
    discount: "5%",
    paymentMethod: "Chuyển khoản"
  }

  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="text-base font-medium">Thông tin gợi ý khi bán hàng</div>
        <button className="text-sm text-blue-600 hover:underline">Cập nhật</button>
      </div>

      <div className="text-sm text-muted-foreground grid gap-3">
        <div>
          <div className="text-[13px]">Chính sách giá mặc định</div>
          <div className="text-black">{sales.pricePolicy}</div>
        </div>
        <div>
          <div className="text-[13px]">Chiết khấu khách hàng</div>
          <div className="text-black">{sales.discount}</div>
        </div>
        <div>
          <div className="text-[13px]">Hình thức thanh toán mặc định</div>
          <div className="text-black">{sales.paymentMethod}</div>
        </div>
      </div>
    </div>
  )
}
export default CustomerSalesInfo;