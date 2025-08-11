import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToastContext } from "@/contexts/ToastContext";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { createBranch } from "@/slices/branchSlice";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BranchAddForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { success, error } = useToastContext();
  const requestState = useAppSelector(state => state.branch.requestState);
  const users = useAppSelector(state => state.user.users);

  const [form, setForm] = useState({
    title: "",
    type: "",
    address: "",
    state: "",
    phone: "",
    manager: "",
    note: "",
    api_key: "",
    api_secret: "",
  });

  const handleCreateBranch = () => {
    if (form.title === '' || form.type === '' || form.address === '' || form.phone === '' || form.manager === '') {
      error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    dispatch(createBranch(form));
  }

  useEffect(() => {
    if (requestState?.type === 'createBranch') {
      switch (requestState?.status) {
        case 'loading':
          break;
        case 'completed':
          success('Tạo chi nhánh thành công');
          router.push(`/branches`);
          break;
        case 'failed':
          const message = requestState?.error || "Có lỗi xảy ra. Vui lòng thử lại.";
          error("Tạo chi nhánh thất bại", message);
          break;
      }
    }
  }, [requestState]);

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
            <Input id="name" placeholder="Nhập tên chi nhánh" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
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
              value={form.type || ''}
              placeholder='Chọn loại chi nhánh'
              onChange={(value) => setForm({ ...form, type: value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ <span className="text-red-500">*</span></Label>
            <Input id="address" placeholder="Nhập địa chỉ chi nhánh" value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Combobox
              className='w-full flex-1'
              options={[
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Tạm dừng' },
              ]}
              value={form.state}
              onChange={(value) => setForm({ ...form, state: value })}
              placeholder='Chọn trạng thái'
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></Label>
            <Input type="number" id="phone" placeholder="Nhập số điện thoại" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manager">Người quản lý <span className="text-red-500">*</span></Label>
            <Combobox
              className='w-full flex-1'
              options={users.map(user => ({ value: user.id.toString(), label: `${[user?.first_name, user?.last_name].join(' ')}` }))}
              value={form?.manager?.toString() || ''}
              onChange={(value) => setForm({ ...form, manager: value })}
              placeholder='Chọn người quản lý'
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Ghi chú</Label>
          <Input id="notes" placeholder="Ghi chú thêm về chi nhánh" value={form.note || ''} onChange={(e) => setForm({ ...form, note: e.target.value })} />
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
                <Input id="apiKey" placeholder="Nhập API Key từ Sapo.vn" value={form.api_key} onChange={(e) => setForm({ ...form, api_key: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiSecret">API Secret</Label>
                <Input id="apiSecret" type="password" placeholder="Nhập API Secret từ Sapo.vn" value={form.api_secret} onChange={(e) => setForm({ ...form, api_secret: e.target.value })} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={handleCreateBranch}
            disabled={requestState?.type === 'createBranch' && requestState?.status === 'loading'}>Tạo chi nhánh</Button>
          <Link href="/branches">
            <Button variant="outline">Hủy</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}