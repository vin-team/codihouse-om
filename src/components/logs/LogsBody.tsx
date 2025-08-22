"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { getTwoImportLogs } from "@/slices/importMetaSlice";
import { ImportLog } from "@/model/ImportLog.model";
import { compareMeta, getImportLogStatusColor } from "@/utils/data.util";
import { useToastContext } from "@/contexts/ToastContext";
import { LoaderCircle } from "lucide-react";
import DataNotFound from "../DataNotFound";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import Pagination from "../orders/Pagination";

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
                <TableRow>
                  <TableHead className="w-fit text-nowrap">Mã</TableHead>
                  <TableHead className="w-fit text-nowrap">Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(compareResult.length < 15
                  ? compareResult
                  : compareResult.slice((currentPage - 1) * 20, currentPage * 20)
                ).map((result: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result?.code ?? "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getImportLogStatusColor(result.status)}
                      >
                        {result.status}
                      </Badge>
                    </TableCell>
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