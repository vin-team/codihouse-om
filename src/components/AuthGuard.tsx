"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import { authService } from "@/services/auth.service";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || '';

  const isLogined = useAppSelector(state => state.app.isLogined);
  const isAdmin = authService.isAdmin();

  const pathAuth = ['/login', '/reset-password'];
  const pathUser = ['/orders', '/customers', '/branches', '/users', '/branches/add', '/branches/edit', '/users/add', '/users/edit'];

  useEffect(() => {
    if (!isLogined) {
      router.replace("/login");
      return;
    }

    if (pathAuth.includes(pathname)) {
      if (isLogined) {
        router.replace("/dashboard");
        return
      }
      return;
    }

    const isExactListPage = pathUser.some(path => pathname === path);

    if (!isAdmin && isExactListPage) {
      router.replace("/dashboard");
      return;
    }
  }, [isLogined, router, pathname]);

  return <>{children}</>;
}