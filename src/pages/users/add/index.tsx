'use client';

import UsersAddForm from "@/components/users/add/Form";
import UsersAddHeader from "@/components/users/add/Header";
import { roleService } from "@/services/role.service";
import router from "next/dist/client/router";
import { useEffect } from "react";

export default function UsersAdd() {
  const isAdmin = roleService.isAdmin();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin])
  return (
    <div className="min-h-full flex flex-col gap-4">
      <UsersAddHeader />
      <UsersAddForm />
    </div>
  )
} 