import UsersFilter from "@/components/users/Filter";
import UsersHeader from "@/components/users/Header";
import UsersList from "@/components/users/List";
import router from "next/dist/client/router";
import { roleService } from "@/services/role.service";
import { useEffect } from "react";

export default function Users() {
  const isAdmin = roleService.isAdmin();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin])
  
  return (
    <div className="min-h-full flex flex-col gap-4">
      <UsersHeader />
      <UsersFilter />
      <UsersList />
    </div>
  )
}