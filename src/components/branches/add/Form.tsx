import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/dist/client/link";
import { useState } from "react";

export default function BranchAddForm() {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className='text-xl font-medium'>Thông tin chi nhánh</span>
        </CardTitle>
        <CardDescription>Điền đầy đủ thông tin chi nhánh</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Tên chi nhánh <span className="text-red-500">*</span></Label>
            <Input id="name" placeholder="Nhập tên chi nhánh" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Loại chi nhánh <span className="text-red-500">*</span></Label>
            <Combobox
              className='w-full flex-1'
              options={[
                { value: 'all', label: 'Tất cả' },
                { value: 'offline', label: 'Offline' },
                { value: 'online', label: 'Online' },
              ]}
              value={type}
              onChange={setType}
              placeholder='Chọn loại chi nhánh'
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ <span className="text-red-500">*</span></Label>
            <Input id="address" placeholder="Nhập địa chỉ chi nhánh" />
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></Label>
            <Input type="number" id="phone" placeholder="Nhập số điện thoại" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manager">Người quản lý <span className="text-red-500">*</span></Label>
            <Input id="manager" placeholder="Nhập tên người quản lý" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Ghi chú</Label>
          <Input id="notes" placeholder="Ghi chú thêm về chi nhánh" />
        </div>

        <div className="space-y-4">
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Tích hợp Sapo.vn</h3>
            <p className="text-sm text-gray-600 mb-4">
              Nhập thông tin API để đồng bộ dữ liệu từ Sapo.vn.
              <Link href="https://help.sapo.vn/ung-dung-rieng-private-apps"
                target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline ml-1">
                Hướng dẫn tạo Private App
              </Link>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input id="apiKey" placeholder="Nhập API Key từ Sapo.vn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiSecret">API Secret</Label>
                <Input id="apiSecret" type="password" placeholder="Nhập API Secret từ Sapo.vn" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button>Tạo chi nhánh</Button>
          <Link href="/branches">
            <Button variant="outline">Hủy</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}