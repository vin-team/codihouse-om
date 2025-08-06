import { Button } from "@/components/ui/button";
import { useParams } from "next/dist/client/components/navigation";
import router from "next/dist/client/router";

export default function UsersEditHeader() {
  const params = useParams();
  const id = params?.id;

  const handleBack = () => {
    router.push('/users');
  }

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chỉnh sửa người dùng</h1>
        <p className="text-gray-600">Cập nhật thông tin người dùng {id}</p>
      </div>
      <div className='flex flex-row gap-2'>
        <Button variant="outline" onClick={handleBack}>Quay lại</Button>
      </div>
    </div>
  );
}