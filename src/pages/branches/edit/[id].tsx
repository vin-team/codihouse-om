'use client';

import BranchEditForm from "@/components/branches/edit/Form";
import BranchEditHeader from "@/components/branches/edit/Header";
import BranchEditStatistics from "@/components/branches/edit/Statistics";

export default function BranchEdit() {
  return (
    <div className="min-h-full flex flex-col gap-4">
      <BranchEditHeader />
      <BranchEditForm />
      <BranchEditStatistics />
    </div>
  )
}