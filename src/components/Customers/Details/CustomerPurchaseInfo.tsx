'use client'

export function CustomerPurchaseInfo({ customerId }: { customerId: string }) {
  const info = {
    totalSpent: "979.000₫",
    totalOrders: 2,
    totalProducts: 3,
    totalReturns: 0,
    lastPurchase: "2024-01-15",
    debt: "0₫"
  }

  return (
    <div className="w-full h-full bg-white border border-[#E4E4E7] shadow-sm rounded-[8px] p-[24px] flex flex-col gap-[24px]">
      {/* Header */}
      <div className="flex items-center justify-between w-[856px] h-[36px]">
        <h3 className="text-[20px] font-semibold leading-[24px] tracking-[-0.6px] text-[#09090B]">
          Thông tin mua hàng
        </h3>
        <button className="text-[14px] font-medium leading-[20px] text-[#2563EB] px-[12px] h-[36px] rounded-[6px]">
          Cập nhật
        </button>
      </div>

      {/* Nội dung thông tin */}
      <div className="flex justify-between gap-[268px] w-[856px] h-[152px] text-[14px] leading-[20px] text-[#6B7280]">
        {/* Cột trái */}
        <div className="flex flex-col gap-[16px] w-[428px]">
          <div>
            <div>Tổng chi tiêu</div>
            <div className="text-black">{info.totalSpent}</div>
          </div>
          <div>
            <div>Tổng SL đơn hàng</div>
            <div className="text-black">{info.totalOrders}</div>
          </div>
          <div>
            <div>Ngày cuối cùng mua hàng</div>
            <div className="text-black">{info.lastPurchase}</div>
          </div>
        </div>

        {/* Cột phải */}
        <div className="flex flex-col gap-[16px] w-[428px]">
          <div>
            <div>Tổng SL sản phẩm đã mua</div>
            <div className="text-black">{info.totalProducts}</div>
          </div>
          <div>
            <div>Tổng SL sản phẩm hoàn trả</div>
            <div className="text-black">{info.totalReturns}</div>
          </div>
          <div>
            <div>Công nợ hiện tại</div>
            <div className="text-black">{info.debt}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerPurchaseInfo
