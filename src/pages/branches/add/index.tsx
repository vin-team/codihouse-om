'use client';

import BranchAddForm from "@/components/branches/add/Form";
import BranchAddHeader from "@/components/branches/add/Header";
import { useAppDispatch } from "@/hooks/redux";
import { getUsers } from "@/slices/userSlice";
import { useEffect } from "react";

export default function BranchAdd() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="min-h-full flex flex-col gap-4">
      <BranchAddHeader />
      <BranchAddForm />
    </div>
  )
}