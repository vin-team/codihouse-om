import { EyeOffIcon, EyeIcon, Folder } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Combobox } from "../ui/combobox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef, useState } from "react";
import { useToastContext } from "@/contexts/ToastContext";

export default function ImportForm() {
  const { success, error } = useToastContext();
  const [type, setType] = useState<'customer' | 'order'>('customer');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDownloadTemplate = () => {
    console.log('Download template');
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (!selectedFile) {
      setFile(null);
      return;
    }

    const fileName = selectedFile.name.toLowerCase();
    const isAllowed = fileName.endsWith('.csv') || fileName.endsWith('.xlsx');

    if (!isAllowed) {
      error('Chỉ cho phép định dạng CSV hoặc XLSX');
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
    
    console.log('Import');
  }

  const handleCancel = () => {
    setFile(null);
    setType('customer');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <span className='text-xl font-medium'>Nhập dữ liệu</span>
            <Button variant="outline" className="h-10" onClick={handleDownloadTemplate}>Download template</Button>
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
              options={[{ value: 'customer', label: 'Khách hàng' }, { value: 'order', label: 'Đơn hàng' }]}
              value={type}
              onChange={(value) => {
                setType(value as 'customer' | 'order');
              }}
              placeholder='Chọn loại dữ liệu'
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="file">Chọn file <span className="text-red-500">*</span></Label>
          <div className="flex flex-row gap-4 items-center">
            <Folder className="w-6 h-6" />
            <Input ref={fileInputRef} type="file" id="file" className="text-center file:pt-1" accept=".csv,.xlsx" onChange={handleChangeFile} />
          </div>
        </div>

        <div className="flex space-x-4">
          <Button onClick={handleImport}>Nhập dữ liệu</Button>
          <Button onClick={handleCancel} variant="outline">Hủy</Button>
        </div>
      </CardContent>
    </Card>
  );
}