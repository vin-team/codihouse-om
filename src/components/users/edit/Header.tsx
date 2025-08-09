import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { UserModel } from "@/model/User.model";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/dist/client/components/navigation";
import Link from "next/dist/client/link";

export default function UsersEditHeader() {

  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col space-y-2'>
        <BackButton fallbackHref="/users" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chỉnh sửa người dùng</h1>
        <p className="text-gray-600">Cập nhật thông tin người dùng</p>
      </div>
    </div>
  );
}