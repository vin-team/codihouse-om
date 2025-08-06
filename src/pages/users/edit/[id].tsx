import UsersEditForm from "@/components/users/edit/Form";
import UsersEditChangePassword from "@/components/users/edit/ChangePassword";
import UsersEditHeader from "@/components/users/edit/Header";
import { roleService } from "@/services/role.service";
import router from "next/dist/client/router";
import { useEffect } from "react";

export default function UsersEdit() {
  const isAdmin = roleService.isAdmin();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin])
  
  return (
    <div className="min-h-full flex flex-col gap-4">
      <UsersEditHeader />
      <UsersEditForm />
      <UsersEditChangePassword />
    </div>
  )
}