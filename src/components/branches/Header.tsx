
import { Button } from "../ui/button";
import Link from "next/dist/client/link";

export default function BranchesHeader() {

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý chi nhánh</h1>
        <p className="text-gray-600">Quản lý tất cả chi nhánh trong hệ thống</p>
      </div>
      <div className='flex flex-row gap-2 items-end'>
        <Link href="/branches/add">
          <Button variant="default">Thêm chi nhánh</Button>
        </Link>
      </div>
    </div>
  );
}