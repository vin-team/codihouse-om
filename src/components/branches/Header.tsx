import router from "next/dist/client/router";
import { Button } from "../ui/button";

export default function BranchesHeader() {
  const handleAddBranch = () => {
    router.push('/branches/add');
  }
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý chi nhánh</h1>
        <p className="text-gray-600">Quản lý tất cả chi nhánh trong hệ thống</p>
      </div>
      <div className='flex flex-row gap-2 items-end'>
        <Button variant="default" onClick={handleAddBranch}>Thêm chi nhánh</Button>
      </div>
    </div>
  );
}