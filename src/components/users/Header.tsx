import router from "next/dist/client/router";
import { Button } from "../ui/button";
import Link from "next/dist/client/link";

export default function UsersHeader() {
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý người dùng</h1>
        <p className="text-gray-600">Quản lý tài khoản người dùng của các chi nhánh</p>
      </div>
      <div className='flex flex-row gap-2 items-end'>
        <Link href="/users/add">
          <Button variant="default">Thêm người dùng</Button>
        </Link>
      </div>
    </div>
  );
}