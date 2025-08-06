'use client';

import BranchEditForm from "@/components/branches/edit/Form";
import BranchEditHeader from "@/components/branches/edit/Header";
import BranchEditStatistics from "@/components/branches/edit/Statistics";
import { roleService } from "@/services/role.service";
import router from "next/dist/client/router";
import { useEffect } from "react";

export default function BranchEdit() {
  const isAdmin = roleService.isAdmin();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin])
  return (
    <div className="min-h-full flex flex-col gap-4">
      <BranchEditHeader />
      <BranchEditForm />
      <BranchEditStatistics />
    </div>
  )
}