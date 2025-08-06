import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function UsersEditForm() {
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@company.com",
    phone: "0901234567",
    role: "branch",
    branch: "branch1",
    status: "active",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className='text-xl font-medium'>Thông tin người dùng</span>
        </CardTitle>
        <CardDescription>Chỉnh sửa thông tin tài khoản</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Tên đầy đủ <span className="text-red-500">*</span></Label>
            <Input id="name" defaultValue="Nguyễn Văn A" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input id="email" type="email" defaultValue="nguyenvana@company.com" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></Label>
            <Input type="number" id="phone" defaultValue="0901234567" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Vai trò <span className="text-red-500">*</span></Label>
            <Combobox
              className="w-full flex-1"
              options={[
                { value: 'admin', label: 'Quản trị viên' },
                { value: 'branch', label: 'Chi nhánh' },
              ]}
              value={user.role}
              onChange={(value) => setUser({ ...user, role: value })}
              placeholder="Chọn vai trò"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="branch">Chi nhánh <span className="text-red-500">*</span></Label>
            <Combobox
              className="w-full flex-1"
              options={[
                { value: 'branch1', label: 'Chi nhánh Quận 1' },
                { value: 'branch7', label: 'Chi nhánh Quận 7' },
                { value: 'online', label: 'Chi nhánh Online' },
                { value: 'thuduc', label: 'Chi nhánh Thủ Đức' },
              ]}
              value={user.branch}
              onChange={(value) => setUser({ ...user, branch: value })}
              placeholder="Chọn chi nhánh"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="status">Trạng thái <span className="text-red-500">*</span></Label>
            <div className="flex flex-col space-y-2">
              <Combobox
                className="w-full flex-1"
                options={[
                  { value: 'active', label: 'Hoạt động' },
                  { value: 'inactive', label: 'Tạm khóa' },
                ]}
                value={user.status}
                onChange={(value) => setUser({ ...user, status: value })}
                placeholder="Chọn trạng thái"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button>Cập nhật người dùng</Button>
          <Link href="/users">
            <Button variant="outline">Hủy</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}