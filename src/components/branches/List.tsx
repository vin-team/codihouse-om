import Link from "next/link";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { getStatusColor, getTypeColor } from "@/utils/branches.util";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Branch } from "@/model/Branch.model";
import { useEffect, useState } from "react";
import { getBranches, getBranchesCount, setPage } from "@/slices/branchSlice";
import Pagination from "../orders/Pagination";
import { formatCurrency } from "@/utils/data.util";

export default function BranchesList() {
  const dispatch = useAppDispatch();
  const branches = useAppSelector(state => state.branch.branches);
  const filter = useAppSelector(state => state.branch.filter);
  const pagination = useAppSelector(state => state.branch.pagination);
  const [filterBranches, setFilterBranches] = useState<Branch[]>([]);

  const branchMatchesFilter = (branch: Branch): boolean => {
    if (filter.search && filter.search.trim() !== '') {
      const searchTerm = filter.search.toLowerCase();
      const matchesSearch = branch.title.toLowerCase().includes(searchTerm);
      if (!matchesSearch) return false;
    }

    return true;
  };

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
    const filtered = branches.filter(branchMatchesFilter);
    setFilterBranches(filtered);
  }, [filter, branches]);

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
            {filterBranches.map((branch: any) => (
              <TableRow key={branch.id}>
                <TableCell className="font-medium">{branch.id}</TableCell>
                <TableCell>{branch.title}</TableCell>
                <TableCell> {branch.type || '-'}</TableCell>
                <TableCell className="max-w-[200px] truncate"> {branch.address || '-'}</TableCell>
                <TableCell>{branch.phone || '-'}</TableCell>
                <TableCell>{branch.manager || '-'}</TableCell>
                <TableCell>{branch.today_order_count || '-'}</TableCell>
                <TableCell>{branch.today_revenue ? formatCurrency(branch.today_revenue) : '-'}</TableCell>
                <TableCell><Badge variant={getStatusColor(branch.status)}> {branch.status}</Badge></TableCell>
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