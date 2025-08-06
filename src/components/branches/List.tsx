import Link from "next/link";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { getStatusColor, getTypeColor } from "@/utils/branches.util";

export default function BranchesList() {
  const branches = [
    {
      id: "CN001",
      name: "Chi nhánh Quận 1",
      type: "Offline",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "0281234567",
      manager: "Nguyễn Văn A",
      dailyOrders: 45,
      dailyRevenue: "12,500,000",
      status: "Hoạt động"
    },
    {
      id: "CN002",
      name: "Chi nhánh Online",
      type: "Online",
      address: "Kho trung tâm, Quận Bình Thạnh, TP.HCM",
      phone: "0281234568",
      manager: "Trần Thị B",
      dailyOrders: 78,
      dailyRevenue: "18,900,000",
      status: "Hoạt động"
    },
    {
      id: "CN003",
      name: "Chi nhánh Quận 7",
      type: "Offline",
      address: "456 Nguyễn Thị Thập, Quận 7, TP.HCM",
      phone: "0281234569",
      manager: "Lê Văn C",
      dailyOrders: 32,
      dailyRevenue: "8,200,000",
      status: "Hoạt động"
    },
    {
      id: "CN004",
      name: "Chi nhánh Thủ Đức",
      type: "Offline",
      address: "789 Võ Văn Ngân, Thủ Đức, TP.HCM",
      phone: "0281234570",
      manager: "Phạm Thị D",
      dailyOrders: 28,
      dailyRevenue: "6,800,000",
      status: "Tạm dừng"
    }
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Kết quả ({branches.length} chi nhánh)</h2>
      </div>

      <div className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã chi nhánh</TableHead>
              <TableHead>Tên chi nhánh</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Điện thoại</TableHead>
              <TableHead>Quản lý</TableHead>
              <TableHead>Đơn hôm nay</TableHead>
              <TableHead>Doanh thu hôm nay</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branches.map((branch: any) => (
              <TableRow key={branch.id}>
                <TableCell className="font-medium">{branch.id}</TableCell>
                <TableCell>{branch.name}</TableCell>
                <TableCell>
                  <Badge variant={getTypeColor(branch.type)}>
                    {branch.type}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {branch.address}
                </TableCell>
                <TableCell>{branch.phone}</TableCell>
                <TableCell>{branch.manager}</TableCell>
                <TableCell>{branch.dailyOrders}</TableCell>
                <TableCell>{branch.dailyRevenue}₫</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(branch.status)}>
                    {branch.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/branches/edit/${branch.id}`}>
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