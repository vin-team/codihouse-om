"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useMemo, useState } from "react";
import { getTwoImportLogs } from "@/slices/importMetaSlice";
import { ImportLog } from "@/model/ImportLog.model";
import { compareMeta, getImportLogStatusColor } from "@/utils/data.util";
import { useToastContext } from "@/contexts/ToastContext";
import { ChevronDown, ChevronUp, LoaderCircle } from "lucide-react";
import DataNotFound from "../DataNotFound";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import Pagination from "../orders/Pagination";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function LogsBody({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const { error } = useToastContext();
  const [isLoading, setIsLoading] = useState(true);

  const type = useAppSelector(state => state.importData.filter.type);
  const importDataLogs = useAppSelector(state => state.importData.filter.importLogs);
  const importLogs = useAppSelector(state => state.importMeta.twoImportLogs);
  const importLogsState = useAppSelector(state => state.importMeta.requestState);
  const [importLog, setImportLog] = useState<ImportLog | null>(null);
  const [previousImportLog, setPreviousImportLog] = useState<ImportLog | null>(null);
  const [compareResult, setCompareResult] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setIsLoading(true);
    const currentId = Number(id);
    const previousId = importDataLogs.reduce((best: number, x: any) => {
      if (x.state === 'success' && x.id < currentId && x.id > best) return x.id;
      return best;
    }, -Infinity);
    const chosenPreviousId = previousId === -Infinity ? currentId : previousId;

    dispatch(getTwoImportLogs([chosenPreviousId, currentId]));
  }, [id]);

  useEffect(() => {
    if (importLogsState?.type === 'getTwoImportLogs') {
      switch (importLogsState.status) {
        case 'completed':
          const currentId = Number(id);
          const findImportLog = importLogs.find(x => x.id === currentId);
          const findPreviousImportLog =
            importLogs.filter(x => x.id < currentId).sort((a, b) => b.id - a.id)[0] ?? findImportLog;

          setImportLog(findImportLog ?? null);
          setPreviousImportLog(findPreviousImportLog ?? findImportLog ?? null);
          break;
      }
    }
  }, [importLogsState]);

  useEffect(() => {
    if (importLog && previousImportLog) {
      try {
        const compareResult = compareMeta(importLog.meta, previousImportLog.meta, type);
        console.log('compareResult: ', compareResult);
        setIsLoading(false);
        setCompareResult(compareResult);
        setTotalPages(Math.ceil(compareResult.length / 20));
      } catch (err) {
        setIsLoading(false);
        const message = err instanceof Error ? err.message : 'Có lỗi xảy ra trong quá trình xử lý.';
        error("Lỗi", message);
      }
    }
  }, [importLog, previousImportLog]);

  const columns: ColumnDef<any, any>[] = useMemo(() => [
    {
      id: "code",
      accessorKey: "code",
      header: () => <div className="w-fit text-nowrap">Mã</div>,
      cell: ({ row }) => <span className="font-medium">{row.original?.code ?? "-"}</span>,
      sortingFn: "auto",
    },
    {
      id: "status",
      accessorKey: "status",
      header: () => <div className="w-fit text-nowrap">Trạng thái</div>,
      cell: ({ getValue }) => (
        <Badge
          variant="outline"
          className={getImportLogStatusColor(getValue<string>())}
        >
          {getValue<string>()}
        </Badge>
      ),
      sortingFn: "auto",
    },
  ], []);

  const table = useReactTable({
    data: compareResult,
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
      {isLoading ?
        <div className="p-5">
          <div className="flex justify-center items-center">
            <LoaderCircle className='w-12 h-12 text-blue-400 animate-spin' />
          </div>
        </div> :
        <div className="p-5">
          {compareResult.length === 0 ? (
            <DataNotFound />
          ) : (
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
                {(compareResult.length < 15
                  ? table.getRowModel().rows
                  : table.getRowModel().rows.slice((currentPage - 1) * 20, currentPage * 20)
                ).map(row => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {compareResult.length !== 0 && <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>}
        </div>}
    </div>
  );
}