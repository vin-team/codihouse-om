import Link from "next/link";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { getStatusColor } from "@/utils/branches.util";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { getUsers } from "@/slices/userSlice";
import DataNotFound from "../DataNotFound";

export default function UsersList() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.user.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Kết quả ({users.length} người dùng)</h2>
      </div>

      <div className="p-5">
        {users.length === 0 ? <DataNotFound /> :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã ND</TableHead>
                <TableHead>Tên người dùng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Chi nhánh</TableHead>
                <TableHead>Điện thoại</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đăng nhập cuối</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.code ?? '-'}</TableCell>
                  <TableCell>{[user.first_name, user.last_name].join(' ')}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>Users</TableCell>
                  <TableCell>{user.branch?.title ?? '-'}</TableCell>
                  <TableCell>{user.phone ?? '-'}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.last_access ? new Date(user.last_access).toLocaleString() : '-'}</TableCell>
                  <TableCell>
                    <Link href={`/users/edit/${user.id}`}>
                      <Button variant="outline" size="sm">Sửa</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>}
      </div>
    </div>
  );
}