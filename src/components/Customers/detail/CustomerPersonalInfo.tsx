'use client';

import { Badge } from '@/components/ui/badge';
import React from 'react';

interface CustomerPersonalInfoProps {
  customer: any
}

const CustomerPersonalInfo: React.FC<CustomerPersonalInfoProps> = ({ customer }: { customer: any }) => {
  return (
    <div className="bg-white border border-[#E4E4E7] shadow-sm rounded-lg p-6 w-full">
      <div className="flex flex-row justify-between items-center mb-6">
        <h3 className="text-[20px] font-semibold leading-6 tracking-[-0.6px] text-[#09090B]">
          Thông tin cá nhân
        </h3>
        <button className="text-sm font-medium text-[#2563EB] px-3 py-2 rounded-md hover:underline">
          Cập nhật
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-[253px] gap-y-[15.8px] text-sm text-[#6B7280]">
        <div>
          <div className="text-[14px] leading-5">Ngày sinh</div>
          <div className="text-black leading-5">{customer.birthday || "—"}</div>
        </div>
        <div>
          <div className="text-[14px] leading-5">Nhóm khách hàng</div>
          <div className="text-[#2563EB] leading-5">{customer.group || "—"}</div>
        </div>
        <div>
          <div className="text-[14px] leading-5">Giới tính</div>
          <div className="text-black leading-5">{customer.gender || "—"}</div>
        </div>
        <div>
          <div className="text-[14px] leading-5">Mã khách hàng</div>
          <div className="text-black leading-5">{customer.code || "—"}</div>
        </div>
        <div>
          <div className="text-[14px] leading-5">Số điện thoại</div>
          <div className="text-black leading-5">{customer.phone || "—"}</div>
        </div>
        <div>
          <div className="text-[14px] leading-5">Mô tả</div>
          <div className="text-black leading-5">{customer.description || "—"}</div>
        </div>
        <div className="col-span-2">
          <div className="text-[14px] leading-5">Email</div>
          <div className="text-black leading-5">{customer.email || "—"}</div>
        </div>
        <div className="col-span-2">
          <div className="text-[16px] font-normal text-[#6B7280] leading-6 mb-[4.5px]">Tags</div>
          <div className="flex gap-[3.78px]">
            {(customer?.tags ?? []).length > 0 ? (
              customer.tags.map((tag: string) => (
                <Badge key={tag} className="bg-[#F4F4F5] text-[#18181B] px-[11px] py-[3px] text-[12px] font-semibold rounded-full">
                  {tag}
                </Badge>
              ))
            ) : (
              <span className="text-black">Không có</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default CustomerPersonalInfo;