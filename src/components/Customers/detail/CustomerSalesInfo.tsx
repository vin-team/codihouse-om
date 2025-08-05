import React from 'react';

interface CustomerSalesInfoProps {
  customerId: string
}

const CustomerSalesInfo: React.FC<CustomerSalesInfoProps> = ({ customerId }: { customerId: string }) => {
  const sales = {
    pricePolicy: "Giá bán lẻ",
    discount: "5%",
    paymentMethod: "Chuyển khoản"
  }

  return (
    <div key={customerId} className="w-full h-full bg-white border border-[#E4E4E7] shadow-sm rounded-[8px] p-[25px] flex flex-col gap-[24px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-semibold leading-[24px] tracking-[-0.6px] text-[#09090B]">
          Thông tin gợi ý khi bán hàng
        </h3>
        <button className="px-[12px] h-[36px] rounded-[6px] text-[14px] font-medium text-[#2563EB] flex items-center">
          Cập nhật
        </button>
      </div>

      {/* Nội dung */}
      <div className="flex flex-col gap-[20px] text-[14px] leading-[20px] text-[#6B7280]">
        <div>
          <div>Chính sách giá mặc định</div>
          <div className="text-black">{sales.pricePolicy}</div>
        </div>
        <div>
          <div>Chiết khấu khách hàng</div>
          <div className="text-black">{sales.discount}</div>
        </div>
        <div>
          <div>Hình thức thanh toán mặc định</div>
          <div className="text-black">{sales.paymentMethod}</div>
        </div>
      </div>
    </div>
  )
};

export default CustomerSalesInfo;