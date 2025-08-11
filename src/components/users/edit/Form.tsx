import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToastContext } from "@/contexts/ToastContext";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { UserModel } from "@/model/User.model";
import { getBranches } from "@/slices/branchSlice";
import { clearActionState, updateUser } from "@/slices/userSlice";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersEditForm({ user }: { user: UserModel }) {
  const dispatch = useAppDispatch();
  const { success, error } = useToastContext();

  const branches = useAppSelector(state => state.branch.branches);
  const requestState = useAppSelector(state => state.user.actionState);

  const [form, setForm] = useState({
    first_name: user.first_name ?? '',
    last_name: user.last_name ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
    branch: user.branch?.id ?? '',
    status: user.status ?? '',
  });

  const handleUpdateUser = () => {
    if (form.first_name === '' || form.last_name === '' || form.email === '' || form.phone === '' || form.branch === '') {
      error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    dispatch(updateUser({
      id: user.id,
      data: form
    }));
  }

  useEffect(() => {
    dispatch(getBranches());
  }, [])

  useEffect(() => {
    if (requestState?.type === 'updateUser') {
      switch (requestState?.status) {
        case 'loading':
          break;
        case 'completed':
          success('Cập nhật người dùng thành công');
          dispatch(clearActionState())
          break;
        case 'failed':
          const message = requestState?.error || "Có lỗi xảy ra. Vui lòng thử lại.";
          error("Cập nhật người dùng thất bại", message);
          dispatch(clearActionState())
          break;
      }
    }
  }, [requestState])

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
            <Label htmlFor="first_name">Họ <span className="text-red-500">*</span></Label>
            <Input id="first_name" defaultValue="Nguyễn" value={form.first_name ?? ""} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Tên <span className="text-red-500">*</span></Label>
            <Input id="last_name" defaultValue="Văn A" value={form.last_name ?? ""} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input id="email" type="email" defaultValue="nguyenvana@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></Label>
            <Input type="number" id="phone" defaultValue="0901234567" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="branch">Chi nhánh <span className="text-red-500">*</span></Label>
            <Combobox
              className="w-full flex-1"
              options={branches.length > 0 ? branches.map(branch => ({
                value: branch.id.toString(),
                label: branch.title
              })) : []}
              value={form.branch.toString()}
              onChange={(value) => setForm({ ...form, branch: value })}
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
                value={form.status}
                onChange={(value) => setForm({ ...form, status: value })}
                placeholder="Chọn trạng thái"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button onClick={handleUpdateUser}>Cập nhật người dùng</Button>
          <Link href="/users">
            <Button variant="outline">Hủy</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}