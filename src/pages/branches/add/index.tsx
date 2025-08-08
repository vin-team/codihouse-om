'use client';

import BranchAddForm from "@/components/branches/add/Form";
import BranchAddHeader from "@/components/branches/add/Header";

export default function BranchAdd() {
  return (
    <div className="min-h-full flex flex-col gap-4">
      <BranchAddHeader />
      <BranchAddForm />
    </div>
  )
}