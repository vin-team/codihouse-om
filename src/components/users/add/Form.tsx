'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToastContext } from "@/contexts/ToastContext";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getBranches } from "@/slices/branchSlice";
import { addUser } from "@/slices/userSlice";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import router from "next/dist/client/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isValidVietnamPhone, isValidEmail } from "@/utils/data.util";

export default function UsersAddForm() {
  const branches = useAppSelector(state => state.branch.branches);
  const dispatch = useAppDispatch();
  const { success, error } = useToastContext();
  const [visiblePassword, setVisiblePassword] = useState<any>({
    password: false,
    confirm_password: false,
  });
  const [password, setPassword] = useState<any>({
    password: "",
    confirm_password: "",
  })
  const requestState = useAppSelector(state => state.user.actionState);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: process.env.NEXT_PUBLIC_storageUserRoleId!,
    branch: "",
    status: "active",
  });

  const handleAddUser = () => {
    if (form.first_name === "" || form.last_name === "" || form.email === "" || form.phone === "" || form.branch === "" || password.password === "" || password.confirm_password === "") {
      error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (!isValidEmail(form.email)) {
      error('Vui lòng nhập email hợp lệ.');
      return;
    }

    if (!isValidVietnamPhone(form.phone)) {
      error('Vui lòng nhập số điện thoại hợp lệ.');
      return;
    }

    if (password.password !== password.confirm_password) {
      error('Mật khẩu không khớp');
      return;
    }

    dispatch(addUser({ ...form, password: password.password }));
  }

  useEffect(() => {
    dispatch(getBranches());
  }, [])

  useEffect(() => {
    if (requestState.type === 'addUser') {
      switch (requestState.status) {
        case 'loading':
          break;
        case 'completed':
          success('Tạo người dùng thành công');
          router.push('/users');
          break;
        case 'failed':
          const message = requestState?.error || "Có lỗi xảy ra. Vui lòng thử lại.";
          error('Tạo người dùng thất bại', message);
          break;
      }
    }
  }, [requestState])


  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin người dùng</CardTitle>
        <CardDescription>Điền đầy đủ thông tin tài khoản</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="first_name">Họ <span className="text-red-500">*</span></Label>
            <Input id="first_name" placeholder="Nhập họ" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Tên <span className="text-red-500">*</span></Label>
            <Input id="last_name" placeholder="Nhập tên" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input id="email" type="email" placeholder="Nhập email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></Label>
            <Input id="phone" type="tel" inputMode="tel" placeholder="VD: 0912345678 hoặc +84912345678" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch">Chi nhánh <span className="text-red-500">*</span></Label>
          <Combobox
            className='w-full flex-1'
            options={branches.length > 0 ? branches.map(branch => ({
              value: branch.id.toString(),
              label: branch.title
            })) : []}
            value={form.branch}
            onChange={(value) => setForm({ ...form, branch: value })}
            placeholder='Chọn chi nhánh'
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu <span className="text-red-500">*</span></Label>
            <div className="relative">
              <Input id="password" type={visiblePassword.password ? "text" : "password"} placeholder="Nhập mật khẩu" value={password.password} onChange={(e) => setPassword({ ...password, password: e.target.value })} />
              <button className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setVisiblePassword({ ...visiblePassword, password: !visiblePassword.password })}>
                {visiblePassword.password ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
            </div>

          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Xác nhận mật khẩu <span className="text-red-500">*</span></Label>
            <div className="relative">
              <Input id="confirm-password" type={visiblePassword.confirm_password ? "text" : "password"} placeholder="Xác nhận mật khẩu" value={password.confirm_password} onChange={(e) => setPassword({ ...password, confirm_password: e.target.value })} />
              <button className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setVisiblePassword({ ...visiblePassword, confirm_password: !visiblePassword.confirm_password })}>
                {visiblePassword.confirm_password ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>


        <div className="flex space-x-4">
          <Button onClick={handleAddUser}>Tạo người dùng</Button>
          <Link href="/users">
            <Button variant="outline">Hủy</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}