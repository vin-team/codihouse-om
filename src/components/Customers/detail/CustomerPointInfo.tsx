'use client';

import React from 'react';

interface CustomerPointInfoProps {
  points: any
}

const CustomerPointInfo: React.FC<CustomerPointInfoProps> = ({ points }: { points: any }) => {
  return (
    <div className="w-full h-full bg-white border border-[#E4E4E7] shadow-sm rounded-[8px] p-[25px] flex flex-col gap-[20px] relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-semibold leading-[24px] tracking-[-0.6px] text-[#09090B]">
          Thông tin tích điểm
        </h3>
        <button className="text-[14px] font-medium leading-[20px] text-[#2563EB] px-[12px] py-0 h-[36px] rounded-[6px]">
          Chi tiết
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[20px] pt-[10px] text-sm">
        <div>
          <p className="text-[14px] text-[#6B7280] leading-[20px]">Điểm hiện tại</p>
          <p className="text-[18px] font-medium leading-[28px] text-[#09090B]">{points?.current || 0}</p>
        </div>

        <div>
          <p className="text-[14px] text-[#6B7280] leading-[20px]">Hạng thẻ hiện tại</p>
          <p className="text-[14px] text-black leading-[20px]">{points?.rank || '—'}</p>
        </div>

        <div>
          <p className="text-[14px] text-[#6B7280] leading-[20px]">Ngày hết hạn thẻ</p>
          <p className="text-[14px] text-black leading-[20px]">{points?.expire || '—'}</p>
        </div>

        <div>
          <p className="text-[14px] text-[#6B7280] leading-[20px]">Giá trị còn lại để lên hạng</p>
          <p className="text-[14px] text-black leading-[20px]">{points?.toNextRank || '—'}</p>
        </div>
      </div>
    </div>
  )
};

export default CustomerPointInfo;