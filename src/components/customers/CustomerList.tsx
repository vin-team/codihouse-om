import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';

interface CustomerListProps { }

const CustomerList: React.FC<CustomerListProps> = ({ }) => {
  const customers = [
    {
      id: "KH001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0901234567",
      totalOrders: 12,
      totalSpent: "2,450,000",
      lastOrder: "2024-01-15",
      branch: "Quận 1",
      status: "VIP"
    },
    {
      id: "KH002",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0902345678",
      totalOrders: 8,
      totalSpent: "1,800,000",
      lastOrder: "2024-01-14",
      branch: "Online",
      status: "Thường"
    },
    {
      id: "KH003",
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0903456789",
      totalOrders: 25,
      totalSpent: "5,200,000",
      lastOrder: "2024-01-15",
      branch: "Quận 7",
      status: "VIP"
    },
    {
      id: "KH004",
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0904567890",
      totalOrders: 3,
      totalSpent: "650,000",
      lastOrder: "2024-01-13",
      branch: "Online",
      status: "Mới"
    }
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Kết quả ({customers.length} khách hàng)</h2>
      </div>

      <div className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã KH</TableHead>
              <TableHead>Tên khách hàng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Điện thoại</TableHead>
              <TableHead>Tổng đơn</TableHead>
              <TableHead>Tổng chi tiêu</TableHead>
              <TableHead>Đơn cuối</TableHead>
              <TableHead>Chi nhánh</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.totalOrders}</TableCell>
                <TableCell>{customer.totalSpent}₫</TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
                <TableCell>{customer.branch}</TableCell>
                <TableCell>
                  <Badge variant={
                    customer.status === "VIP" ? "default" :
                      customer.status === "Mới" ? "secondary" : "outline"
                  }>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/customers/${customer.id}`}>
                    <Button variant="outline" size="sm">Xem chi tiết</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerList;