import { roleService } from "@/services/role.service";
import router from "next/dist/client/router";
import { useEffect } from "react";

export default function OrdersEdit() {
  const isAdmin = roleService.isAdmin();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin])

  return (
    <div>
      <h1>OrdersEdit</h1>
    </div>
  );
}