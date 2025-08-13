import Link from "next/link";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { getStatusColor } from "@/utils/branches.util";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { getBranches, getBranchesCount, setPage } from "@/slices/branchSlice";
import Pagination from "../orders/Pagination";
import { formatCurrency } from "@/utils/data.util";
import DataNotFound from "../DataNotFound";
import { getStatisticsByBranchedAndDate } from "@/slices/orderSlice";

export default function BranchesList() {
  const dispatch = useAppDispatch();
  const branches = useAppSelector(state => state.branch.branches);
  const pagination = useAppSelector(state => state.branch.pagination);
  const statisticsByBranches = useAppSelector(state => state.order.statisticsByBranches);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    dispatch(getBranchesCount());
  }, []);

  useEffect(() => {
    dispatch(getBranches({ page: pagination.page, limit: pagination.limit }));
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    if (branches.length > 0) {
      dispatch(getStatisticsByBranchedAndDate({ branch_ids: branches.map(branch => branch.id), year: 2025, month: 7, day: 21 }));
    }
  }, [branches])

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Kết quả ({branches.length} chi nhánh)</h2>
      </div>

      <div className="p-5">
        {branches.length === 0 ? <DataNotFound /> :
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
                  <TableCell>{branch.title}</TableCell>
                  <TableCell> {branch.type || '-'}</TableCell>
                  <TableCell className="max-w-[200px] truncate"> {branch.address || '-'}</TableCell>
                  <TableCell>{branch.phone || '-'}</TableCell>
                  <TableCell>{[branch?.manager?.first_name, branch?.manager?.last_name].join(' ')}</TableCell>
                  <TableCell>{statisticsByBranches.find(item => item.branch_id === branch.id)?.totalOrders || '0'}</TableCell>
                  <TableCell>{statisticsByBranches.find(item => item.branch_id === branch.id)?.totalRevenue ? formatCurrency(statisticsByBranches.find(item => item.branch_id === branch.id)?.totalRevenue.toString() || "0") : '0'} đ</TableCell>
                  <TableCell>{branch.state ? <Badge variant={getStatusColor(branch.state)}> {branch.state}</Badge> : '-'}</TableCell>
                  <TableCell>
                    <Link href={`/branches/edit/${branch.id}`}>
                      <Button variant="outline" size="sm">Sửa</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>}
      </div>

      {pagination.totalPages !== 1 && <div className="pb-6 flex justify-center">
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages || 1}
          onPageChange={handlePageChange}
        />
      </div>}
    </div>
  );
}