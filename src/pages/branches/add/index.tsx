'use client';

import BranchAddForm from "@/components/branches/add/Form";
import BranchAddHeader from "@/components/branches/add/Header";
import { roleService } from "@/services/role.service";
import router from "next/dist/client/router";
import { useEffect } from "react";

export default function BranchAdd() {
  const isAdmin = roleService.isAdmin();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin])

  return (
    <div className="min-h-full flex flex-col gap-4">
      <BranchAddHeader />
      <BranchAddForm />
    </div>
  )
}