"use client"

import Link from "next/link";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Pagination from "../orders/Pagination";
import { getImportLogStatusColor } from "@/utils/data.util";
import DataNotFound from "../DataNotFound";
import { LoaderCircle, ChevronDown, ChevronUp } from "lucide-react";
import { ImportLog } from "@/model/ImportLog.model";
import { getImportLogs, setPage } from "@/slices/importMetaSlice";
import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

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

  const columns: ColumnDef<ImportLog, any>[] = useMemo(() => [
    {
      id: 'id',
      accessorKey: 'id',
      header: () => <div className="w-fit text-nowrap">Mã</div>,
      cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
      sortingFn: 'auto',
    },
    {
      id: 'title',
      header: () => <div className="w-fit text-nowrap">Tên file</div>,
      accessorFn: (row) => row.excel_file?.title || '',
      cell: ({ getValue }) => <span>{getValue<string>() || '-'}</span>,
      sortingFn: 'auto',
    },
    {
      id: 'note',
      header: () => <div className="w-fit text-nowrap">Ghi chú</div>,
      accessorFn: (row) => row.note || '',
      cell: ({ getValue }) => <span>{getValue<string>() || '-'}</span>,
      sortingFn: 'auto',
    },
    {
      id: 'date_created',
      header: () => <div className="w-[108px] text-nowrap">Ngày tạo</div>,
      accessorFn: (row) => (row.date_created ? new Date(row.date_created).getTime() : 0),
      cell: ({ row }) => <span>{row.original.date_created ? new Date(row.original.date_created).toLocaleDateString('vi-VN') : '-'}</span>,
      sortingFn: 'auto',
    },
    {
      id: 'state',
      header: () => <div className="w-fit text-nowrap">Trạng thái</div>,
      accessorFn: (row) => row.state || '',
      cell: ({ row }) => (
        row.original.state ? (
          <Badge variant='outline' className={getImportLogStatusColor(row.original.state)}> {row.original.state}</Badge>
        ) : '-'
      ),
      enableSorting: false,
    },
    {
      id: 'actions',
      header: () => <div className="w-fit text-nowrap">Thao tác</div>,
      cell: ({ row }) => (
        <Link href={`/logs/${row.original.id}`}>
          <Button variant="outline" size="sm">Xem</Button>
        </Link>
      ),
      enableSorting: false,
    },
  ], []);

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: (importLogs || []) as ImportLog[],
    columns,
    state: { sorting },
    onSortingChange: (updater: any) => {
      setSorting((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        if (!Array.isArray(next) || next.length === 0) return next;

        const previousById = new Map(prev.map(s => [s.id, s] as const));
        let changedId: string | null = null;

        for (const item of next) {
          const prevItem = previousById.get(item.id);
          if (!prevItem || prevItem.desc !== item.desc) {
            changedId = item.id;
            break;
          }
        }

        if (!changedId) {
          changedId = next[next.length - 1]?.id ?? null;
        }

        if (changedId) {
          const primary = next.find(s => s.id === changedId)!;
          const rest = next.filter(s => s.id !== changedId);
          return [primary, ...rest];
        }

        return next;
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
    enableMultiSort: true,
    isMultiSortEvent: () => true,
  });

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
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      const isSorted = header.column.getIsSorted();
                      return (
                        <TableHead
                          key={header.id}
                          className={`w-fit text-nowrap ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
                          onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                        >
                          <span className='inline-flex items-center'>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {isSorted === 'asc' && <ChevronUp className='w-3 h-3 ml-1' />}
                            {isSorted === 'desc' && <ChevronDown className='w-3 h-3 ml-1' />}
                          </span>
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map(row => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
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