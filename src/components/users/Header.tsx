import router from "next/dist/client/router";
import { Button } from "../ui/button";

export default function UsersHeader() {
  const handleAddUser = () => {
    router.push('/users/add');
  }
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý người dùng</h1>
        <p className="text-gray-600">Quản lý tài khoản người dùng của các chi nhánh</p>
      </div>
      <div className='flex flex-row gap-2 items-end'>
        <Button variant="default" onClick={handleAddUser}>Thêm người dùng</Button>
      </div>
    </div>
  );
}