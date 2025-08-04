import { Badge } from "@/components/ui/badge"

export function CustomerPersonalInfo({ customer }: { customer: any }) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="text-base font-medium">Thông tin cá nhân</div>
        <button className="text-sm text-blue-600 hover:underline">Cập nhật</button>
      </div>

      <div className="grid grid-cols-2 gap-y-3 text-sm text-muted-foreground">
        <div>
          <div className="text-[13px]">Ngày sinh</div>
          <div className="text-black">{customer.birthday || "—"}</div>
        </div>
        <div>
          <div className="text-[13px]">Nhóm khách hàng</div>
          <div className="text-blue-600">{customer.group || "—"}</div>
        </div>
        <div>
          <div className="text-[13px]">Giới tính</div>
          <div className="text-black">{customer.gender || "—"}</div>
        </div>
        <div>
          <div className="text-[13px]">Mã khách hàng</div>
          <div className="text-black">{customer.code}</div>
        </div>
        <div>
          <div className="text-[13px]">Số điện thoại</div>
          <div className="text-black">{customer.phone}</div>
        </div>
        <div>
          <div className="text-[13px]">Mô tả</div>
          <div className="text-black">{customer.description || "—"}</div>
        </div>
        <div className="col-span-2">
          <div className="text-[13px]">Email</div>
          <div className="text-black">{customer.email}</div>
        </div>
        <div className="col-span-2">
          <div className="text-[13px]">Tags</div>
          <div className="flex gap-2 pt-1">
            {(customer.tags ?? []).length > 0 ? (
              customer.tags.map((tag: string) => (
                <Badge key={tag}>{tag}</Badge>
              ))
            ) : (
              <span>Không có</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default CustomerPersonalInfo;
