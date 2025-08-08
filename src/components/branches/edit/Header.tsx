import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { useParams } from "next/dist/client/components/navigation";
import Link from "next/dist/client/link";

export default function BranchEditHeader() {
  const params = useParams();
  const id = params?.id;

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chỉnh sửa chi nhánh        </h1>
        <p className="text-gray-600">Cập nhật thông tin chi nhánh {id}</p>
      </div>
      <div className='flex flex-row gap-2'>
        <BackButton fallbackHref="/branches" />
      </div>
    </div>
  );
}