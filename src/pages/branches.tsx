'use client';

import BranchesFilter from "@/components/branches/Filter";
import BranchesHeader from "@/components/branches/Header";
import BranchesList from "@/components/branches/List";

export default function Branches() {
  return (
    <div className="min-h-full flex flex-col gap-4">
      <BranchesHeader />
      <BranchesFilter />
      <BranchesList />
    </div>
  )
}