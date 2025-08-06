import { Button } from "@/components/ui/button";
import router from "next/dist/client/router";

export default function BranchAddHeader() {
  const handleBack = () => {
    router.push('/branches');
  }
  
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm chi nhánh mới</h1>
        <p className="text-gray-600">Nhập thông tin chi nhánh mới</p>
      </div>
      <div className='flex flex-row gap-2'>
        <Button variant="outline" onClick={handleBack}>Quay lại</Button>
      </div>
    </div>
  );
}