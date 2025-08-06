import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UsersEditChangePassword() {
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
            <Input id="new-password" type="password" placeholder="Nhập mật khẩu mới" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-new-password">Xác nhận mật khẩu mới</Label>
            <Input id="confirm-new-password" type="password" placeholder="Xác nhận mật khẩu mới" />
          </div>
        </div>

        <div className="flex space-x-4">
          <Button variant="outline">Đổi mật khẩu</Button>
        </div>
      </CardContent>
    </Card>
  );
}