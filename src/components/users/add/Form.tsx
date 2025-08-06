'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function UsersAddForm() {
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin người dùng</CardTitle>
        <CardDescription>Điền đầy đủ thông tin tài khoản</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Tên đầy đủ <span className="text-red-500">*</span></Label>
            <Input id="name" placeholder="Nhập tên đầy đủ" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input id="email" type="email" placeholder="Nhập email" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></Label>
            <Input id="phone" placeholder="Nhập số điện thoại" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Vai trò <span className="text-red-500">*</span></Label>
            <Combobox
              className='w-full flex-1'
              options={[
                { value: 'admin', label: 'Quản trị viên' },
                { value: 'branch', label: 'Chi nhánh' },
              ]}
              value={role}
              onChange={setRole}
              placeholder='Chọn vai trò'
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch">Chi nhánh <span className="text-red-500">*</span></Label>
          <Combobox
            className='w-full flex-1'
            options={[
              { value: 'branch1', label: 'Chi nhánh Quận 1' },
              { value: 'branch7', label: 'Chi nhánh Quận 7' },
            ]}
            value={branch}
            onChange={setBranch}
            placeholder='Chọn chi nhánh'
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu <span className="text-red-500">*</span></Label>
            <Input id="password" type="password" placeholder="Nhập mật khẩu" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Xác nhận mật khẩu <span className="text-red-500">*</span></Label>
            <Input id="confirm-password" type="password" placeholder="Xác nhận mật khẩu" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Trạng thái</Label>
          <Combobox
            className='w-full flex-1'
            options={[
              { value: 'active', label: 'Hoạt động' },
              { value: 'inactive', label: 'Tạm dừng' },
            ]}
            value={status}
            onChange={setStatus}
            placeholder='Chọn trạng thái'
          />

        </div>

        <div className="flex space-x-4">
          <Button>Tạo người dùng</Button>
          <Link href="/users">
            <Button variant="outline">Hủy</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}