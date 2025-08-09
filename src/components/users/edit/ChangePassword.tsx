import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToastContext } from "@/contexts/ToastContext";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { UserModel } from "@/model/User.model";
import { updateUser } from "@/slices/userSlice";
import { useEffect, useState } from "react";
import { EyeIcon } from "lucide-react";
import { EyeOffIcon } from "lucide-react";

export default function UsersEditChangePassword({ user }: { user: UserModel }) {
  const dispatch = useAppDispatch();
  const { success, error } = useToastContext();
  const actionState = useAppSelector(state => state.user.actionState);

  const [visiblePassword, setVisiblePassword] = useState({
    new_password: false,
    confirm_new_password: false
  });
  const [password, setNewPassword] = useState({
    new_password: '',
    confirm_new_password: ''
  });

  const handleChangePassword = () => {
    if (password.new_password === '') {
      error('Mật khẩu mới không được để trống');
      return;
    }

    if (password.new_password !== password.confirm_new_password) {
      error('Mật khẩu mới và xác nhận mật khẩu mới không khớp');
      return;
    }

    dispatch(updateUser({
      id: user.id,
      data: {
        password: password.new_password
      }
    }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className='text-xl font-medium'>Đổi mật khẩu</span>
        </CardTitle>
        <CardDescription>Cập nhật mật khẩu cho người dùng</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="new-password">Mật khẩu mới</Label>
            <div className="relative">
              <Input id="new-password" type={visiblePassword.new_password ? "text" : "password"} placeholder="Nhập mật khẩu mới" value={password.new_password} onChange={(e) => setNewPassword({ ...password, new_password: e.target.value })} />
              <button className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setVisiblePassword({ ...visiblePassword, new_password: !visiblePassword.new_password })}>
                {visiblePassword.new_password ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-new-password">Xác nhận mật khẩu mới</Label>
            <div className="relative">
              <Input id="confirm-new-password" type={visiblePassword.confirm_new_password ? "text" : "password"} placeholder="Xác nhận mật khẩu mới" value={password.confirm_new_password} onChange={(e) => setNewPassword({ ...password, confirm_new_password: e.target.value })} />
              <button className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setVisiblePassword({ ...visiblePassword, confirm_new_password: !visiblePassword.confirm_new_password })}>
                {visiblePassword.confirm_new_password ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={handleChangePassword}>Đổi mật khẩu</Button>
        </div>
      </CardContent>
    </Card>
  );
}