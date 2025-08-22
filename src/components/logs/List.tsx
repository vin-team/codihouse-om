"use client"

import Link from "next/link";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Pagination from "../orders/Pagination";
import { getImportLogStatusColor } from "@/utils/data.util";
import DataNotFound from "../DataNotFound";
import { LoaderCircle } from "lucide-react";
import { ImportLog } from "@/model/ImportLog.model";
import { getImportLogs, setPage } from "@/slices/importMetaSlice";
import { useEffect } from "react";

export default function BranchesList() {
  const dispatch = useAppDispatch();

  const importLogs = useAppSelector(state => state.importMeta.importLogs);
  const importDataLogs = useAppSelector(state => state.importData.filter.importLogs);
  const pagination = useAppSelector(state => state.importMeta.pagination);
  const importMetaState = useAppSelector(state => state.importMeta.requestState);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    const importsLogs = importDataLogs.length < pagination.limit ? importDataLogs : importDataLogs?.slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit);
    const importLogsIds = importsLogs.map((log: any) => log.id);
    if (importLogsIds.length > 0) {
      dispatch(getImportLogs(importLogsIds));
    }
  }, [pagination.page, pagination.limit, importDataLogs]);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold text-gray-900">Kết quả ({pagination.totalRecords} lần import)</h2>
      </div>
      {importMetaState?.type === 'getImportLogs' && importMetaState?.status === 'loading' ?
        <div className="p-5">
          <div className="flex justify-center items-center">
            <LoaderCircle className='w-12 h-12 text-blue-400 animate-spin' />
          </div>
        </div> :
        <div className="p-5">
          {importLogs.length === 0 ? <DataNotFound /> :
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-fit text-nowrap">Mã</TableHead>
                  <TableHead className="w-fit text-nowrap">Tên file</TableHead>
                  <TableHead className="w-fit text-nowrap">Ghi chú</TableHead>
                  <TableHead className="w-[108px] text-nowrap">Ngày tạo</TableHead>
                  <TableHead className="w-fit text-nowrap">Trạng thái</TableHead>
                  <TableHead className="w-fit text-nowrap">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {importLogs.map((log: ImportLog) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.id}</TableCell>
                    <TableCell>{log.excel_file.title || '-'}</TableCell>
                    <TableCell>{log.note || '-'}</TableCell>
                    <TableCell>{log.date_created ? new Date(log.date_created).toLocaleDateString('vi-VN') : '-'}</TableCell>
                    <TableCell>{log.state ? <Badge variant='outline' className={getImportLogStatusColor(log.state)}> {log.state}</Badge> : '-'}</TableCell>
                    <TableCell>
                      <Link href={`/logs/${log.id}`}>
                        <Button variant="outline" size="sm">Xem</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>}
        </div>}

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