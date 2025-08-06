'use client';

import BranchesFilter from "@/components/branches/Filter";
import BranchesHeader from "@/components/branches/Header";
import BranchesList from "@/components/branches/List";
import router from "next/dist/client/router";
import { roleService } from "@/services/role.service";
import { useEffect } from "react";

export default function Branches() {
  const isAdmin = roleService.isAdmin();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin])

  return (
    <div className="min-h-full flex flex-col gap-4">
      <BranchesHeader />
      <BranchesFilter />
      <BranchesList />
    </div>
  )
}