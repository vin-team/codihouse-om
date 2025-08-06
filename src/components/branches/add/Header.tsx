import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";

export default function BranchAddHeader() {
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm chi nhánh mới</h1>
        <p className="text-gray-600">Nhập thông tin chi nhánh mới</p>
      </div>
      <div className='flex flex-row gap-2'>
        <Link href="/branches">
          <Button variant="outline">Quay lại</Button>
        </Link>
      </div>
    </div>
  );
}