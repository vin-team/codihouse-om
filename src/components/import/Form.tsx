import { Folder, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Combobox } from "../ui/combobox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
import { useToastContext } from "@/contexts/ToastContext";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { uploadFile } from "@/slices/fileSlice";
import { clearImportDataState, getImportsData, updateImportData } from "@/slices/importDataSlice";
import { translateCollection } from "@/model/ImportData.model";
import { clearImportMeta, getImportMeta } from "@/slices/importMetaSlice";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function ImportForm() {
  const dispatch = useAppDispatch();
  const { success, error } = useToastContext();
  const importDataList = useAppSelector((state) => state.importData.importDataList);
  const importDataState = useAppSelector((state) => state.importData.requestState);
  const fileRequestState = useAppSelector((state) => state.file.requestState);
  const importMeta = useAppSelector((state) => state.importMeta.importMeta);

  const [type, setType] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDownloadTemplate = async () => {
    try {
      const templateFile = importDataList.find((item) => item.collection === type)?.template_file;
      if (!templateFile) {
        error('Không tìm thấy file template');
        return;
      }

      const url = `${process.env.NEXT_PUBLIC_baseApiURL}/assets/${templateFile}?download`;
      const link = document.createElement('a');
      link.href = url;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      success('Tải file template thành công');
    } catch (e) {
      error('Có lỗi xảy ra trong quá trình tải file template');
    }
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (!selectedFile) {
      setFile(null);
      return;
    }

    const fileName = selectedFile.name.toLowerCase();
    const isAllowed = fileName.endsWith('.xlsx');

    if (!isAllowed) {
      error('Chỉ cho phép định dạng XLSX');
      e.target.value = '';
      setFile(null);
    } else {
      setFile(selectedFile);
    }
  }

  const handleImport = () => {
    if (!file) {
      error('Vui lòng chọn file');
      return;
    }
    setIsLoading(true);
    dispatch(clearImportMeta());
    dispatch(uploadFile(file));
  }

  const handleCancel = () => {
    setFile(null);
    setType('customer');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    dispatch(clearImportDataState());
    dispatch(clearImportMeta());
  }

  useEffect(() => {
    if (fileRequestState?.type === 'uploadFile') {
      switch (fileRequestState?.status) {
        case 'loading':
          break;
        case 'completed':
          const data = fileRequestState?.data;
          const importData = importDataList.find((item) => item.collection === type);
          if (importData) {
            const payload = {
              id: importData.id,
              data: {
                excel_file: data.id,
                state: 'pending',
              }
            }
            dispatch(updateImportData(payload));
          }
          break;
        case 'failed':
          error('Tải file thất bại. Vui lòng thử lại.');
          break;
      }
    }
  }, [fileRequestState])

  useEffect(() => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    dispatch(clearImportMeta());
    dispatch(getImportsData());
  }, []);

  useEffect(() => {
    if (importDataState?.type === 'getImportsData') {
      switch (importDataState?.status) {
        case 'completed':
          if (importDataList.length > 0) {
            const importData = importDataList[0];
            setType(importData.collection);
          }
          break;
      }
      return;
    }

    if (importDataState?.type === 'updateImportData') {
      switch (importDataState?.status) {
        case 'completed':
          const excelFileId = importDataState.data.excel_file;
          if (excelFileId) {
            setTimeout(() => {
              dispatch(getImportMeta(excelFileId));
              setIsLoading(false);
            }, 5000);
          }
          dispatch(clearImportDataState());
          break;
        case 'failed':
          const message = importDataState.error || 'Nhập dữ liệu thất bại. Vui lòng thử lại.';
          error('Nhập dữ liệu thất bại', message);
          dispatch(clearImportDataState());
          break;
      }
    }
  }, [importDataState])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <span className='text-xl font-medium'>Nhập dữ liệu</span>
            <Button variant="outline" className="h-10" onClick={async () => { await handleDownloadTemplate() }}>Download template</Button>
          </div>
        </CardTitle>
        <CardDescription hidden>Nhập dữ liệu vào hệ thống từ file csv, xlsx</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Tên file <span className="text-red-500">*</span></Label>
            <Input readOnly id="name" placeholder="Tên file sẽ hiển thị sau khi chọn" value={file?.name ?? ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Loại dữ liệu <span className="text-red-500">*</span></Label>
            <Combobox
              className='w-full flex-1'
              options={importDataList.map((item) => ({ value: item.collection, label: translateCollection(item.collection) }))}
              value={type}
              onChange={setType}
              placeholder='Chọn loại dữ liệu'
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="file">Chọn file <span className="text-red-500">*</span></Label>
          <div className="flex flex-row gap-4 items-center">
            <Folder className="w-6 h-6" />
            <Input ref={fileInputRef} type="file" id="file" className="text-center file:pt-1" accept=".xlsx" onChange={handleChangeFile} />
          </div>
        </div>

        {isLoading ? <div className="flex justify-center items-center">
          <LoaderCircle className='w-12 h-12 text-blue-400 animate-spin' />
        </div> :
          importMeta && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="file">Trạng thái:</Label>
              <span className={`text-sm font-bold ${importMeta?.state === 'success' ? 'text-green-500' : 'text-red-500'}`}>{importMeta?.state.toUpperCase()}</span>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="file">Ghi chú:</Label>
              <span className="text-sm">{importMeta?.note}</span>
            </div>
          </div>
        }

        {importMeta && <div className="flex flex-col gap-4">
          <Label htmlFor="file">Logs </Label>
          <div className="h-80 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-fit text-nowrap'>Trạng thái</TableHead>
                  <TableHead className='w-fit text-nowrap'>Ghi chú</TableHead>
                  <TableHead className='w-fit text-nowrap'>Excel File</TableHead>
                  <TableHead className='w-fit text-nowrap'>Meta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {importMeta?.meta.map((item: any) => (
                  <TableRow key={importMeta.id}>
                    <TableCell className="w-fit text-nowrap">{importMeta?.state || '-'}</TableCell>
                    <TableCell className="w-fit text-nowrap">{importMeta?.note || '-'}</TableCell>
                    <TableCell className="w-fit text-nowrap">{importMeta?.excel_file?.title || '-'}</TableCell>
                    <TableCell>{JSON.stringify(item) || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>}

        <div className="flex space-x-4">
          <Button disabled={isLoading} onClick={handleImport}>Nhập dữ liệu</Button>
          <Button disabled={isLoading} onClick={handleCancel} variant="outline">Hủy</Button>
        </div>
      </CardContent>
    </Card>
  );
}