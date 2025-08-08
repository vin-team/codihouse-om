'use client';

import UsersAddForm from "@/components/users/add/Form";
import UsersAddHeader from "@/components/users/add/Header";

export default function UsersAdd() {
  return (
    <div className="min-h-full flex flex-col gap-4">
      <UsersAddHeader />
      <UsersAddForm />
    </div>
  )
} 