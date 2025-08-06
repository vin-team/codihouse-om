import Link from "next/link";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { getStatusColor, getTypeColor } from "@/utils/branches.util";

export default function UsersList() {
  const users = [
    {
      id: "ND001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@company.com",
      role: "Chi nhánh",
      branch: "Quận 1",
      phone: "0901234567",
      status: "Hoạt động",
      lastLogin: "2024-01-15"
    },
    {
      id: "ND002",
      name: "Trần Thị B",
      email: "tranthib@company.com",
      role: "Chi nhánh",
      branch: "Online",
      phone: "0902345678",
      status: "Hoạt động",
      lastLogin: "2024-01-15"
    },
    {
      id: "ND003",
      name: "Lê Văn C",
      email: "levanc@company.com",
      role: "Chi nhánh",
      branch: "Quận 7",
      phone: "0903456789",
      status: "Tạm khóa",
      lastLogin: "2024-01-10"
    },
    {
      id: "ND004",
      name: "Phạm Thị D",
      email: "phamthid@company.com",
      role: "Chi nhánh",
      branch: "Thủ Đức",
      phone: "0904567890",
      status: "Hoạt động",
      lastLogin: "2024-01-14"
    }
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Kết quả ({users.length} người dùng)</h2>
      </div>

      <div className="p-6">
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
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.branch}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/users/edit/${user.id}`}>
                      <Button variant="outline" size="sm">Sửa</Button>
                    </Link>
                    <Button variant="outline" size="sm">Xóa</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}